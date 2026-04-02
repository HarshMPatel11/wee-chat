import SearchBar from './SearchBar';
import ChatList from './ChatList';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <SearchBar />
      <ChatList />
    </aside>
  );
}
