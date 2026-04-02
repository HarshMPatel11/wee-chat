import { useChatStore } from '../hooks/useChatStore';

export default function SearchBar() {
  const { state, setSearchTerm } = useChatStore();

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search messages in active chat..."
        value={state.searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
