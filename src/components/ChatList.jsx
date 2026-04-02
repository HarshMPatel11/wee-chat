import { useChatStore } from '../hooks/useChatStore';
import ChatListItem from './ChatListItem';

export default function ChatList() {
  const { sortedChats } = useChatStore();

  return (
    <div className="chat-list">
      {sortedChats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
