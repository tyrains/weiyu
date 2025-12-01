import { Message } from '../types';
import { STORAGE_KEY } from '../constants';

export const getStoredMessages = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load messages:', error);
    return [];
  }
};

export const saveMessage = (message: Message): Message[] => {
  const currentMessages = getStoredMessages();
  const updatedMessages = [message, ...currentMessages];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
  return updatedMessages;
};

export const deleteStoredMessage = (id: string): Message[] => {
  const currentMessages = getStoredMessages();
  const updatedMessages = currentMessages.filter(msg => msg.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
  return updatedMessages;
};
