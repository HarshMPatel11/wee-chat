import { useEffect } from 'react';
import { randomId } from '../utils/helpers';
import { MESSAGE_STATUS, SIMULATED_REPLIES } from '../utils/constants';

export function useMockSocket({ chats, currentUserId, activeChatId, isOnline, receiveMessage }) {
  useEffect(() => {
    if (!isOnline) return;

    const interval = setInterval(() => {
      if (!chats.length) return;

      const possibleChats = chats.filter((chat) => chat.participants.includes(currentUserId));
      const randomChat = possibleChats[Math.floor(Math.random() * possibleChats.length)];
      if (!randomChat) return;

      const senderId = randomChat.participants.find((id) => id !== currentUserId);
      const text = SIMULATED_REPLIES[Math.floor(Math.random() * SIMULATED_REPLIES.length)];

      receiveMessage({
        id: randomId('msg'),
        chatId: randomChat.id,
        senderId,
        text,
        timestamp: Date.now(),
        status: randomChat.id === activeChatId ? MESSAGE_STATUS.SEEN : MESSAGE_STATUS.DELIVERED,
        optimistic: false
      });
    }, 9000);

    return () => clearInterval(interval);
  }, [chats, currentUserId, activeChatId, isOnline, receiveMessage]);
}
