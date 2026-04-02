import UserSwitcher from './UserSwitcher';
import { useChatStore } from '../hooks/useChatStore';

export default function Header() {
  const { resetAllData } = useChatStore();

  return (
    <header className="topbar">
      <div>
        <h1>Real-Time Chat App</h1>
        <p>Frontend only • mock real-time • localStorage</p>
      </div>
      <div className="topbar-actions">
        <UserSwitcher />
        <button className="reset-btn" onClick={resetAllData}>Reset Data</button>
      </div>
    </header>
  );
}
