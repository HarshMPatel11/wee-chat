import { useState } from 'react';
import { useChatStore } from '../hooks/useChatStore';

export default function MessageInput() {
  const [text, setText] = useState('');
  const { sendMessage } = useChatStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
  };

  return (
    <form className="message-input-wrap" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
