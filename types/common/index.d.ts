interface IConfig {
  telegram: ITelegramConfig;
  settings: ISettingsConfig;
}

interface ITelegramConfig {
  token: string;
  userIds: string[] | number[];
  groupIds: string[] | number[];
  channelIds: string[] | number[];
  notifyGroup: string[];
}

interface ISettingsConfig {
  checkInterval: number;
  method: string;
  website: string;
  highLatency: number;
}

