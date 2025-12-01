export interface Message {
  id: string;
  name: string;
  content: string;
  timestamp: number;
}

export type MessageFormData = Omit<Message, 'id' | 'timestamp'>;
