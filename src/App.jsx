import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import OnlineStatusBar from './components/OnlineStatusBar';
import { ChatProvider } from './hooks/useChatStore';

export default function App() {
  return (
    <ChatProvider>
      <div className="app-shell">
        <Header />
        <OnlineStatusBar />
        <div className="app-body">
          <Sidebar />
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
}
