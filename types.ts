export enum Sender {
  USER = 'user',
  BOT = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  image?: string; // base64 string
  isErrorAnalysis?: boolean;
}

export interface SolvedError {
  id: string;
  title: string;
  timestamp: Date;
  tags: string[];
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  history: SolvedError[];
}