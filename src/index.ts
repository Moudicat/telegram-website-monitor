/// <reference path="../types/index.d.ts" />

import TelegramBot from './botCore/';

let tg = new TelegramBot();

tg.bot.onText(/\/ping/, (msg, match: string[]) => {
  const chatId = msg.chat.id;
  tg.bot.sendMessage(chatId, 'pong');
});

tg.bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
});

