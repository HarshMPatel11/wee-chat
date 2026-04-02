import { MESSAGE_STATUS } from './constants';

const now = Date.now();

export const initialUsers = [
  { id: 'u1', name: 'Harsh', avatar: 'H', status: 'online' },
  { id: 'u2', name: 'Aarav', avatar: 'A', status: 'online' },
  { id: 'u3', name: 'Priya', avatar: 'P', status: 'offline' },
  { id: 'u4', name: 'Neha', avatar: 'N', status: 'online' }
];

export const initialChats = [
  { id: 'c1', participants: ['u1', 'u2'], unreadCount: 0 },
  { id: 'c2', participants: ['u1', 'u3'], unreadCount: 1 },
  { id: 'c3', participants: ['u1', 'u4'], unreadCount: 0 }
];

export const initialMessages = {
  c1: [
    {
      id: 'm1',
      chatId: 'c1',
      senderId: 'u2',
      text: 'Hey Harsh, are you working on the chat UI project?',
      timestamp: now - 1000 * 60 * 90,
      status: MESSAGE_STATUS.SEEN,
      optimistic: false
    },
    {
      id: 'm2',
      chatId: 'c1',
      senderId: 'u1',
      text: 'Yes, I am building it in React.',
      timestamp: now - 1000 * 60 * 88,
      status: MESSAGE_STATUS.SEEN,
      optimistic: false
    },
    {
      id: 'm3',
      chatId: 'c1',
      senderId: 'u2',
      text: 'Nice. Add search, localStorage, and message status too.',
      timestamp: now - 1000 * 60 * 87,
      status: MESSAGE_STATUS.SEEN,
      optimistic: false
    }
  ],
  c2: [
    {
      id: 'm4',
      chatId: 'c2',
      senderId: 'u3',
      text: 'Can you share the design once done?',
      timestamp: now - 1000 * 60 * 40,
      status: MESSAGE_STATUS.DELIVERED,
      optimistic: false
    }
  ],
  c3: [
    {
      id: 'm5',
      chatId: 'c3',
      senderId: 'u4',
      text: 'Let us review the UI later today.',
      timestamp: now - 1000 * 60 * 10,
      status: MESSAGE_STATUS.SEEN,
      optimistic: false
    }
  ]
};

export const initialState = {
  currentUserId: 'u1',
  activeChatId: 'c1',
  users: initialUsers,
  chats: initialChats,
  messages: initialMessages,
  searchTerm: ''
};
