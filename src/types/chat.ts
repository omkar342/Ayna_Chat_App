export interface Message {
  _id: string;
  message: string;
  messageSender: string;
  senderType: string;
}

export interface Chat {
  _id: string;
  chatCreator: string;
  messages: Message[];
  chatName: string;
}
