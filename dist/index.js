"use strict";
/// <reference path="../types/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./botCore/");
let tg = new _1.default();
tg.bot.onText(/\/ping/, (msg, match) => {
    const chatId = msg.chat.id;
    tg.bot.sendMessage(chatId, 'pong');
});
tg.bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
});
//# sourceMappingURL=index.js.map