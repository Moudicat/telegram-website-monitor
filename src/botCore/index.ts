import * as TelegramBot from 'node-telegram-bot-api';
import config from '../config/';

export default class Telegram implements ITelegram {
  public bot: TelegramBot;

  constructor() {
    if (this.bot) {
      return this.bot;
    }

    this.bot = new TelegramBot(config.telegram.token, {polling: true});

    this.init();
  }

  private init() {

    this.notify('[Telegram机器人] 服务已启动');
  }

  private getNotifyIds(idsLable: string): string[]|number[] {
    return config.telegram[idsLable];
  }

  public notify(msg: string) {
    const notifyGroupId = [];

    for (let value of config.telegram.notifyGroup) {
      switch(value) {
        case 'channel':
          notifyGroupId.push(...this.getNotifyIds('channelIds'));
          break;
        case 'group':
          notifyGroupId.push(...this.getNotifyIds('groupIds'));
          break;
        case 'user':
          notifyGroupId.push(...this.getNotifyIds('userIds'));
          break;
        default:
          break;
      }
    }
    
    this.notify = (msg: string) => {
      for (let id of notifyGroupId) {
        this.bot.sendMessage(id, msg);
      }
    }
    this.notify(msg);

    if (notifyGroupId.length) {
      this.notify(`已开启通知ID：${notifyGroupId}`);
    } else {
      this.notify('尚未设置通知群组');
    }
  }

}