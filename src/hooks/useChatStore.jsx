import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useOnlineStatus } from './useOnlineStatus';
import { useMockSocket } from './useMockSocket';
import { initialState } from '../utils/mockData';
import { STORAGE_KEY, MESSAGE_STATUS } from '../utils/constants';
import { getLastMessage, getOtherParticipant, randomId, sortChatsByLastMessage } from '../utils/helpers';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [state, setState] = useLocalStorage(STORAGE_KEY, initialState);
  const isOnline = useOnlineStatus();

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === state.currentUserId),
    [state.users, state.currentUserId]
  );

  const activeChat = useMemo(
    () => state.chats.find((c) => c.id === state.activeChatId) || null,
    [state.chats, state.activeChatId]
  );

  const sortedChats = useMemo(
    () => sortChatsByLastMessage(state.chats, state.messages),
    [state.chats, state.messages]
  );

  const activeMessages = state.messages[state.activeChatId] || [];

  const setCurrentUser = (userId) => {
    setState((prev) => ({ ...prev, currentUserId: userId }));
  };

  const setActiveChat = (chatId) => {
    setState((prev) => ({
      ...prev,
      activeChatId: chatId,
      chats: prev.chats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
      ),
      messages: {
        ...prev.messages,
        [chatId]: (prev.messages[chatId] || []).map((msg) =>
          msg.senderId !== prev.currentUserId ? { ...msg, status: MESSAGE_STATUS.SEEN } : msg
        )
      }
    }));
  };

  const setSearchTerm = (term) => {
    setState((prev) => ({ ...prev, searchTerm: term }));
  };

  const receiveMessage = useCallback((message) => {
    setState((prev) => {
      const existing = prev.messages[message.chatId] || [];
      const updatedMessages = {
        ...prev.messages,
        [message.chatId]: [...existing, message]
      };

      const updatedChats = prev.chats.map((chat) => {
        if (chat.id !== message.chatId) return chat;
        return {
          ...chat,
          unreadCount: message.chatId === prev.activeChatId ? 0 : (chat.unreadCount || 0) + 1
        };
      });

      return {
        ...prev,
        messages: updatedMessages,
        chats: updatedChats
      };
    });
  }, [setState]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const optimisticMessage = {
      id: randomId('msg'),
      chatId: state.activeChatId,
      senderId: state.currentUserId,
      text: trimmed,
      timestamp: Date.now(),
      status: isOnline ? MESSAGE_STATUS.SENDING : MESSAGE_STATUS.FAILED,
      optimistic: true
    };

    setState((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [prev.activeChatId]: [...(prev.messages[prev.activeChatId] || []), optimisticMessage]
      }
    }));

    if (!isOnline) return;

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [optimisticMessage.chatId]: (prev.messages[optimisticMessage.chatId] || []).map((msg) =>
            msg.id === optimisticMessage.id
              ? { ...msg, status: MESSAGE_STATUS.SENT, optimistic: false }
              : msg
          )
        }
      }));
    }, 500);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [optimisticMessage.chatId]: (prev.messages[optimisticMessage.chatId] || []).map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: MESSAGE_STATUS.DELIVERED } : msg
          )
        }
      }));
    }, 1200);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [optimisticMessage.chatId]: (prev.messages[optimisticMessage.chatId] || []).map((msg) =>
            msg.id === optimisticMessage.id ? { ...msg, status: MESSAGE_STATUS.SEEN } : msg
          )
        }
      }));
    }, 2500);
  };

  const retryFailedMessage = (messageId) => {
    if (!isOnline) return;

    setState((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [prev.activeChatId]: (prev.messages[prev.activeChatId] || []).map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                status: MESSAGE_STATUS.SENDING,
                timestamp: Date.now()
              }
            : msg
        )
      }
    }));

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [prev.activeChatId]: (prev.messages[prev.activeChatId] || []).map((msg) =>
            msg.id === messageId ? { ...msg, status: MESSAGE_STATUS.DELIVERED } : msg
          )
        }
      }));
    }, 1000);

    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        messages: {
          ...prev.messages,
          [prev.activeChatId]: (prev.messages[prev.activeChatId] || []).map((msg) =>
            msg.id === messageId ? { ...msg, status: MESSAGE_STATUS.SEEN } : msg
          )
        }
      }));
    }, 2000);
  };

  const resetAllData = () => {
    setState(initialState);
  };

  useEffect(() => {
    if (!isOnline) return;

    setState((prev) => {
      const updated = { ...prev.messages };
      Object.keys(updated).forEach((chatId) => {
        updated[chatId] = updated[chatId].map((msg) =>
          msg.status === MESSAGE_STATUS.FAILED
            ? { ...msg, status: MESSAGE_STATUS.SENDING }
            : msg
        );
      });
      return { ...prev, messages: updated };
    });

    const t1 = setTimeout(() => {
      setState((prev) => {
        const updated = { ...prev.messages };
        Object.keys(updated).forEach((chatId) => {
          updated[chatId] = updated[chatId].map((msg) =>
            msg.status === MESSAGE_STATUS.SENDING
              ? { ...msg, status: MESSAGE_STATUS.DELIVERED }
              : msg
          );
        });
        return { ...prev, messages: updated };
      });
    }, 1200);

    const t2 = setTimeout(() => {
      setState((prev) => {
        const updated = { ...prev.messages };
        Object.keys(updated).forEach((chatId) => {
          updated[chatId] = updated[chatId].map((msg) =>
            msg.status === MESSAGE_STATUS.DELIVERED
              ? { ...msg, status: MESSAGE_STATUS.SEEN }
              : msg
          );
        });
        return { ...prev, messages: updated };
      });
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOnline, setState]);

  useMockSocket({
    chats: state.chats,
    currentUserId: state.currentUserId,
    activeChatId: state.activeChatId,
    isOnline,
    receiveMessage
  });

  const value = {
    state,
    isOnline,
    currentUser,
    activeChat,
    activeMessages,
    sortedChats,
    setCurrentUser,
    setActiveChat,
    setSearchTerm,
    sendMessage,
    retryFailedMessage,
    resetAllData,
    getChatUser(chat) {
      const otherId = getOtherParticipant(chat, state.currentUserId);
      return state.users.find((u) => u.id === otherId);
    },
    getLastMessageForChat(chatId) {
      return getLastMessage(state.messages, chatId);
    }
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatStore() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatStore must be used inside ChatProvider');
  return context;
}
