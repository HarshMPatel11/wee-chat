import { useChatStore } from '../hooks/useChatStore';

export default function OnlineStatusBar() {
  const { isOnline } = useChatStore();

  return (
    <div className={`network-bar ${isOnline ? 'online' : 'offline'}`}>
      {isOnline ? 'Online' : 'Offline — messages will fail and sync again when back online'}
    </div>
  );
}
