"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = require("node-telegram-bot-api");
const _1 = require("../config/");
class Telegram {
    constructor() {
        if (this.bot) {
            return this.bot;
        }
        this.bot = new TelegramBot(_1.default.telegram.token, { polling: true });
        this.init();
    }
    init() {
        this.notify('[Telegram机器人] 服务已启动');
    }
    getNotifyIds(idsLable) {
        return _1.default.telegram[idsLable];
    }
    notify(msg) {
        const notifyGroupId = [];
        for (let value of _1.default.telegram.notifyGroup) {
            switch (value) {
                case 'channal':
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
        this.notify = (msg) => {
            for (let id of notifyGroupId) {
                this.bot.sendMessage(id, msg);
            }
        };
    }
}
exports.default = Telegram;
//# sourceMappingURL=index.js.map