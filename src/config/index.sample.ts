const config: IConfig = {
  telegram: {
    token: '',
    userIds: [],
    groupIds: [],
    channelIds: [],
    notifyGroup: ['channel'] // channel user group
  },
  settings: {
    checkInterval: 20,
    method: 'GET',
    website: '',
    highLatency: 1800
  }
};

export default config;