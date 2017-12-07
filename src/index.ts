/// <reference path="../types/index.d.ts" />

import TelegramBot from './botCore/';
import Monitor from './monitor/';
import { isURL, isHTTPVerbs } from './services/util';

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
    let commandArr: string[] = command.split(' ');
    try {
      switch(commandArr[0]) {
        case 'add':
          let [cmd, website, method, interval] = commandArr;
          if (!website && !isURL(website)) {
            throw new Error('不是有效的网址!');
          }
          method = method.toUpperCase();
          if (!isHTTPVerbs(method)) {
            throw new Error('HTTP动词无效!');
          }

          let monitorParams = {
            website,
            method,
            interval: parseFloat(interval) ? parseFloat(interval) : undefined
          };

          let monitor = new Monitor(monitorParams);

          monitor.on('error', err => {
            tg.bot.notify(`网站:${website}, ERROR:${err.message}`);
            console.log(err.message);
            monitor.stop();
          });
          
          monitor.on('ok', (info: IMonitorOk) => {
            tg.bot.notify(`网站${info.website}, 连接正常，延迟${info.latency}ms`);
          });
          
          monitor.on('down', (info: IMonitorDown) => {
            tg.bot.notify(`网站${info.website}, 连接异常，状态码${info.code}, ${info.message}`);
          });

          botList.push(monitor);
          break; 
      }
    } catch (err) {
      tg.bot.sendMessage(rplId, err);
    }
  } else {
    // no command
    tg.bot.sendMessage(rplId, '/monitor add [website] [method] [time] \n /monitor rm [id] \n /monitor list');
  }
});


// tg.bot.on('message', (msg) => {
//   console.log(msg);
// });

