import { useChatStore } from '../hooks/useChatStore';
import { formatTime } from '../utils/helpers';

function StatusIcon({ status }) {
  if (status === 'sending') return <span className="status sending">⏳</span>;
  if (status === 'sent') return <span className="status sent">✓</span>;
  if (status === 'delivered') return <span className="status delivered">✓✓</span>;
  if (status === 'seen') return <span className="status seen">✓✓</span>;
  if (status === 'failed') return <span className="status failed">⚠</span>;
  return null;
}

export default function MessageBubble({ message }) {
  const { state, retryFailedMessage } = useChatStore();
  const isMine = message.senderId === state.currentUserId;

  return (
    <div className={`message-row ${isMine ? 'mine' : 'theirs'}`}>
      <div className={`message-bubble ${isMine ? 'mine' : 'theirs'}`}>
        <p>{message.text}</p>
        <div className="message-footer">
          <span>{formatTime(message.timestamp)}</span>
          {isMine && <StatusIcon status={message.status} />}
          {message.status === 'failed' && (
            <button className="retry-btn" onClick={() => retryFailedMessage(message.id)}>
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
