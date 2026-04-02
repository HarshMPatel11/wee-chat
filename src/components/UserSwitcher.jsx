import { useChatStore } from '../hooks/useChatStore';

export default function UserSwitcher() {
  const { state, currentUser, setCurrentUser } = useChatStore();

  return (
    <div className="user-switcher">
      <label>Current user:</label>
      <select value={currentUser?.id || state.currentUserId} onChange={(e) => setCurrentUser(e.target.value)}>
        {state.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}
