import { useChatStore } from '../hooks/useChatStore';
import { formatTime } from '../utils/helpers';

export default function ChatListItem({ chat }) {
  const { state, getChatUser, getLastMessageForChat, setActiveChat } = useChatStore();
  const user = getChatUser(chat);
  const lastMessage = getLastMessageForChat(chat.id);
  const isActive = state.activeChatId === chat.id;

  return (
    <button className={`chat-list-item ${isActive ? 'active' : ''}`} onClick={() => setActiveChat(chat.id)}>
      <div className="avatar">{user?.avatar || '?'}</div>
      <div className="chat-meta">
        <div className="chat-top-row">
          <h4>{user?.name || 'Unknown'}</h4>
          <span>{lastMessage ? formatTime(lastMessage.timestamp) : ''}</span>
        </div>
        <div className="chat-bottom-row">
          <p>{lastMessage?.text || 'No messages yet'}</p>
          {!!chat.unreadCount && <span className="unread-badge">{chat.unreadCount}</span>}
        </div>
      </div>
    </button>
  );
}
