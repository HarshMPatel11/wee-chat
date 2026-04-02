export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatDateLabel(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  if (sameDay(date, today)) return 'Today';
  if (sameDay(date, yesterday)) return 'Yesterday';

  return date.toLocaleDateString([], {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function randomId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getOtherParticipant(chat, currentUserId) {
  return chat.participants.find((id) => id !== currentUserId);
}

export function getLastMessage(messagesByChat, chatId) {
  const arr = messagesByChat[chatId] || [];
  return arr[arr.length - 1] || null;
}

export function sortChatsByLastMessage(chats, messagesByChat) {
  return [...chats].sort((a, b) => {
    const aLast = getLastMessage(messagesByChat, a.id)?.timestamp || 0;
    const bLast = getLastMessage(messagesByChat, b.id)?.timestamp || 0;
    return bLast - aLast;
  });
}

export function groupMessagesWithSeparators(messages) {
  const rows = [];
  let lastLabel = null;

  for (const message of messages) {
    const label = formatDateLabel(message.timestamp);
    if (label !== lastLabel) {
      rows.push({ type: 'date', id: `date_${label}_${message.timestamp}`, label });
      lastLabel = label;
    }
    rows.push({ type: 'message', id: message.id, message });
  }

  return rows;
}
