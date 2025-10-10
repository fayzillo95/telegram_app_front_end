// src/features/messages/index.ts

// === API functions ===
export {
  sendMessage,
  getMessages,
  getMessage,
  removeMessage,
} from './api';

// === Hooks ===
export {
useSendUserMessage,useAllMessages
} from './hooks/useMessages';
