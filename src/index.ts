/// <reference path="../types/index.d.ts" />

import TelegramBot from './botCore/';
import Monitor from './monitor/';

// let tg = new TelegramBot();

// tg.bot.onText(/\/ping/, (msg: ITGIncomingMessage, match: string[]) => {
//   const chatId = msg.chat.id;
//   tg.bot.sendMessage(chatId, 'pong');
// });

let monitor = new Monitor({
  website: 'http://jp.server.0u0b.com',
  interval: .1
});

monitor.on('error', (res) => {
  console.log(res);
});

monitor.on('ok', l => {
  console.log(l)
});

monitor.on('down', res => {
  console.log(res);
})

// tg.bot.on('message', (msg) => {
//   console.log(msg);
// });

