
interface ITelegram {
  bot: ITelegramBot;
  notify(msg: string);
}

interface ITelegramBot {
  onText(regexp: RegExp, cb: (msg: ITGIncomingMessage, match: string[]) => void );
  sendMessage(id: number, msg: string);
}

interface ITGIncomingMessage {
  message_id: number;
  from: ITGFrom;
  chat: ITGGroupChat|ITGPrivateChat;
  date: number;
  text: string;
  entities?: [ { offset: number, length: number, type: string } ]
}

interface ITGFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  language_code: string;
}

interface ITGGroupChat {
  id: number;
  title: string;
  type: string;
  all_members_are_administrators?: boolean;
}

interface ITGPrivateChat {
  id: number;
  first_name: string;
  type: string;
}