import { useMemo } from 'react';
import { useChatStore } from '../hooks/useChatStore';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow() {
  const { activeChat, getChatUser, activeMessages, state } = useChatStore();

  const activeUser = activeChat ? getChatUser(activeChat) : null;

  const filteredMessages = useMemo(() => {
    const term = state.searchTerm.trim().toLowerCase();
    if (!term) return activeMessages;
    return activeMessages.filter((msg) => msg.text.toLowerCase().includes(term));
  }, [activeMessages, state.searchTerm]);

  if (!activeChat) {
    return <section className="chat-window empty-chat">Select a chat</section>;
  }

  return (
    <section className="chat-window">
      <div className="chat-header">
        <div className="avatar large">{activeUser?.avatar || '?'}</div>
        <div>
          <h2>{activeUser?.name}</h2>
          <p>{activeUser?.status}</p>
        </div>
      </div>

      <MessageList messages={filteredMessages} />
      <MessageInput />
    </section>
  );
}
