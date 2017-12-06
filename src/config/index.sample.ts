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
    website: ''
  }
};

export default config;