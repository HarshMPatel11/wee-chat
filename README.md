# Real-Time Chat App (Frontend)

A React + Vite chat UI that simulates real-time messaging behavior on the client side.

This project is frontend-only and is great for demonstrating chat UX patterns like optimistic updates, message status transitions, offline behavior, and persistent local state.

## Demo Features

- Real-time simulation using a mock socket hook
- Optimistic message sending flow
- Message status lifecycle: sending -> sent -> delivered -> seen
- Offline/online detection with recovery flow
- Failed message retry behavior
- Chat list with unread counts and active chat state
- Search/filter messages in the active chat
- Switch between mock users
- State persistence with localStorage
- Reset app data to initial seeded state

## Tech Stack

- React 18
- Vite 5
- react-window (virtualized list rendering)
- Plain CSS

## Project Structure

```text
src/
  components/
    ChatList.jsx
    ChatListItem.jsx
    ChatWindow.jsx
    Header.jsx
    MessageBubble.jsx
    MessageInput.jsx
    MessageList.jsx
    OnlineStatusBar.jsx
    SearchBar.jsx
    Sidebar.jsx
    UserSwitcher.jsx
  hooks/
    useAutoScroll.js
    useChatStore.jsx
    useLocalStorage.js
    useMockSocket.js
    useOnlineStatus.js
  styles/
    chat.css
  utils/
    constants.js
    helpers.js
    mockData.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` -> Starts local development server
- `npm run build` -> Creates optimized production build in `dist/`
- `npm run preview` -> Serves production build locally

## Notes

- This app uses mock data and simulated real-time events. No backend is connected.
- All chat state is stored in browser localStorage.
- Best suited for frontend architecture practice and UI behavior demos.

## Suggested Improvements

- Connect to a real backend (Node.js + Express + Socket.IO)
- Add authentication and protected chats
- Add message timestamps formatting and read receipts per user
- Add unit tests (store logic + component behavior)
- Deploy with Vercel/Netlify and include a live demo link

## License

This project is for learning/demo purposes.
