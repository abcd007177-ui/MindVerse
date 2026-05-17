import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { conversations as initialConversations, groups as initialGroups, dummyMessages } from '../data/dummyData';

const STORAGE_KEYS = {
  CHATS: 'mindverse_chats',
  ACTIVE: 'mindverse_active',
  MESSAGES: 'mindverse_messages',
  PROFILES: 'mindverse_profiles',
};

type AppState = {
  activeConversation: string | null;
  conversations: any[];
  groups: any[];
  messages: Record<string, any[]>;
  isTyping: boolean;
  typingName?: string;
  rightPanelOpen: boolean;
  activeModal: 'newChat' | 'groupChat' | null;
  activePage: 'chat' | 'futureSelf';
  error: string | null;
};

type Action =
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: any } }
  | { type: 'ADD_CONVERSATION'; payload: any }
  | { type: 'UPDATE_CONVERSATION_UNREAD'; payload: { id: string; increment?: number; reset?: boolean } }
  | { type: 'SET_TYPING'; payload: { isTyping: boolean; name?: string } }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'SET_MODAL'; payload: 'newChat' | 'groupChat' | null }
  | { type: 'SET_PAGE'; payload: 'chat' | 'futureSelf' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_MESSAGES'; payload: { conversationId: string; messages: any[] } };

function loadStateFromStorage() {
  try {
    const chats = localStorage.getItem(STORAGE_KEYS.CHATS);
    const active = localStorage.getItem(STORAGE_KEYS.ACTIVE);
    const msgs = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const profiles = localStorage.getItem(STORAGE_KEYS.PROFILES);

    let conversations = chats ? JSON.parse(chats) : initialConversations;
    if (profiles) {
      // Merge profiles if needed - for now we'll just keep them in conversations
      const parsedProfiles = JSON.parse(profiles);
      // Ensure any loaded profile is in conversations
      parsedProfiles.forEach((p: any) => {
        if (!conversations.find((c: any) => c.id === p.id)) {
          conversations.push(p);
        }
      });
    }

    return {
      activeConversation: active ? JSON.parse(active) : '1',
      conversations,
      groups: initialGroups, // Dummy
      messages: msgs ? JSON.parse(msgs) : dummyMessages,
      isTyping: false,
      rightPanelOpen: true,
      activeModal: null,
      activePage: 'chat' as const,
      error: null,
    };
  } catch (e) {
    return null;
  }
}

const loadedState = loadStateFromStorage();

const initialState: AppState = loadedState || {
  activeConversation: '1',
  conversations: initialConversations,
  groups: initialGroups,
  messages: dummyMessages,
  isTyping: false,
  rightPanelOpen: true,
  activeModal: null,
  activePage: 'chat',
  error: null,
};

const chatReducer = (state: AppState, action: Action): AppState => {
  let newState = state;
  switch (action.type) {
    case 'SET_ACTIVE_CONVERSATION':
      newState = { ...state, activeConversation: action.payload, activePage: 'chat' };
      if (action.payload) {
        newState.conversations = newState.conversations.map(c => 
          c.id === action.payload ? { ...c, unread: 0 } : c
        );
      }
      break;
    case 'ADD_MESSAGE': {
      const { conversationId, message } = action.payload;
      const existing = state.messages[conversationId] || [];
      newState = {
        ...state,
        messages: {
          ...state.messages,
          [conversationId]: [...existing, message]
        }
      };
      
      // Update last message in conversation
      newState.conversations = newState.conversations.map(c => {
        if (c.id === conversationId) {
          return { ...c, lastMessage: message.content, timestamp: message.timestamp };
        }
        return c;
      });
      break;
    }
    case 'ADD_MESSAGES': {
       const { conversationId, messages } = action.payload;
       newState = {
          ...state,
          messages: {
             ...state.messages,
             [conversationId]: messages
          }
       };
       break;
    }
    case 'ADD_CONVERSATION':
      if (!state.conversations.find(c => c.id === action.payload.id)) {
        newState = { ...state, conversations: [action.payload, ...state.conversations] };
      }
      break;
    case 'UPDATE_CONVERSATION_UNREAD': {
        newState = {
            ...state,
            conversations: state.conversations.map(c => {
                if (c.id === action.payload.id) {
                    return { ...c, unread: action.payload.reset ? 0 : (c.unread || 0) + (action.payload.increment || 1) };
                }
                return c;
            })
        }
        break;
    }
    case 'SET_TYPING':
      newState = { ...state, isTyping: action.payload.isTyping, typingName: action.payload.name };
      break;
    case 'TOGGLE_RIGHT_PANEL':
      newState = { ...state, rightPanelOpen: !state.rightPanelOpen };
      break;
    case 'SET_MODAL':
      newState = { ...state, activeModal: action.payload };
      break;
    case 'SET_PAGE':
      newState = { ...state, activePage: action.payload };
      break;
    case 'SET_ERROR':
      newState = { ...state, error: action.payload };
      break;
    default:
      return state;
  }

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(newState.conversations));
    localStorage.setItem(STORAGE_KEYS.ACTIVE, JSON.stringify(newState.activeConversation));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(newState.messages));
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(newState.conversations));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  return newState;
};

export const ChatContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Auto-show typing indicator for 2 seconds on load for active conversation if no loading chat
  useEffect(() => {
    if (state.activeConversation === '1' && state.activePage === 'chat') {
      dispatch({ type: 'SET_TYPING', payload: { isTyping: true } });
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_TYPING', payload: { isTyping: false } });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Realism: Randomly toggle online status
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle online status logic is omitted here to keep state simple, but you 
      // could dispatch an action to update a random conversation's online status here.
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
      {state.error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-red-900/80 border border-red-500 rounded-lg text-red-100 text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-sm animate-pulse">
          {state.error}
        </div>
      )}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
