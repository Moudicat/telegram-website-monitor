/// <reference path="../types/index.d.ts" />

import TelegramBot from './botCore/';
import Monitor from './monitor/';
import { isURL, isHTTPVerbs } from './services/util';
import config from './config/';

let tg: ITelegram = new TelegramBot();
let botList: IMonitor[] = [];

tg.bot.onText(/\/ping/, (msg: ITGIncomingMessage, match: string[]) => {
  const chatId = msg.chat.id;
  tg.bot.sendMessage(chatId, 'pong');
});

tg.bot.onText(/\/monitor (.+)/, (msg: ITGIncomingMessage, match: string[]) => {
  const rplId = msg.chat.id;

  let command: string = match[1];
  if (command) {
    command = command.trim();
    let commandArr: string[] = command.split(' ');
    try {
      switch(commandArr[0]) {
        case 'add':
          let [addCmd, website, method, interval] = commandArr;
          if (!website || !isURL(website)) {
            throw new Error('不是有效的网址!');
          }
          if (method) {
            method = method.toUpperCase();
            if (!isHTTPVerbs(method)) {
              throw new Error('HTTP动词无效!');
            }
          }

          let monitorParams = {
            website,
            method,
            interval: parseFloat(interval) ? parseFloat(interval) : undefined
          };

          let monitor = new Monitor(monitorParams);

          monitor.on('ok', (info: IMonitorOk) => {
            if (info.latency > config.settings.highLatency) {
              tg.notify(`[连接缓慢] 网站${info.website}, 延迟${info.latency}ms`);
            }
          });

          monitor.on('down', (info: IMonitorDown) => {
            tg.notify(`[连接异常] 网站${info.website}, 状态码${info.code}, ${info.message}`);
          });

          monitor.on('error', err => {
            tg.notify(`[ERROR] 网站:${website}, ${err.message}`);
            console.log(err.message);
            monitor.stop();
          });
          
          botList.push(monitor);
          tg.bot.sendMessage(rplId, '已创建任务');
          break;
        
        case 'remove':
        case 'rm':
          let [rmCmd, rmId] = commandArr;
          let rmIdNum = Number(rmId);
          if (isNaN(rmIdNum) || rmIdNum >= botList.length || rmIdNum < 0) {
            throw new Error('请输入正确任务ID');
          }
          botList[rmIdNum].stop();
          delete botList[rmIdNum];
          tg.bot.sendMessage(rplId, '任务已删除');
          break;

        case 'list':
        case 'ls':
          let getTemplate = (id: number, website: string, method: string, interval: number) => {
            return `ID: ${id} | ${website} | ${method} | ${interval}min/check\n`;
          }

          let realLength = 0;
          botList.forEach(() => realLength++);

          if (realLength) {
            let rplMsg = '[当前运行任务]\n';
            botList.forEach((bot, index) => {
              rplMsg += getTemplate(index, bot.website, bot.method, bot.interval / (1000 * 60));
            });
            tg.bot.sendMessage(rplId, rplMsg);
          } else {
            tg.bot.sendMessage(rplId, '当前任务列表为空, 请通过 /monitor add [your website] 来添加');
          }
          break;
          
        default:
          throw new Error('Monitor指令错误');
      }
    } catch (err) {
      tg.bot.sendMessage(rplId, err.message);
    }
  } else {
    tg.bot.sendMessage(rplId, '/monitor add [website] [method] [time] \n /monitor rm [id] \n /monitor list');
  }
});
