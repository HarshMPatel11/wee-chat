import { useEffect, useMemo, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import MessageBubble from './MessageBubble';
import { groupMessagesWithSeparators } from '../utils/helpers';

const ROW_HEIGHT = 74;

export default function MessageList({ messages }) {
  const listRef = useRef(null);
  const previousCountRef = useRef(messages.length);

  const rows = useMemo(() => groupMessagesWithSeparators(messages), [messages]);

  useEffect(() => {
    if (!listRef.current) return;

    if (messages.length >= previousCountRef.current) {
      listRef.current.scrollToItem(rows.length - 1, 'end');
    }

    previousCountRef.current = messages.length;
  }, [messages.length, rows.length]);

  const Row = ({ index, style }) => {
    const item = rows[index];

    if (item.type === 'date') {
      return (
        <div style={style} className="row-wrap date-row-wrap">
          <div className="date-separator">{item.label}</div>
        </div>
      );
    }

    return (
      <div style={style} className="row-wrap">
        <MessageBubble message={item.message} />
      </div>
    );
  };

  return (
    <div className="message-list-area">
      <List
        ref={listRef}
        height={470}
        width="100%"
        itemCount={rows.length}
        itemSize={ROW_HEIGHT}
      >
        {Row}
      </List>
    </div>
  );
}
