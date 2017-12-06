interface IConfig {
  telegram: ITelegramConfig,
  default: IDefaultConfig
}

interface ITelegramConfig {
  token: string,
  userIds: string[] | number[],
  groupIds: string[] | number[],
  channelIds: string[] | number[],
  notifyGroup: string[]
}

interface IDefaultConfig {
  checkInterval: number
}

interface ITelegram {
  bot: any;
  notify(msg: string);
}