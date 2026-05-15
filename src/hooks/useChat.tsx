import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { conversations, groups, dummyMessages } from '../data/dummyData';

type AppState = {
  activeConversation: string | null;
  conversations: any[];
  groups: any[];
  messages: Record<string, any[]>;
  isTyping: boolean;
  rightPanelOpen: boolean;
  activeModal: 'newChat' | 'groupChat' | null;
  activePage: 'chat' | 'futureSelf';
};

type Action =
  | { type: 'SET_ACTIVE_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: any } }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'TOGGLE_RIGHT_PANEL' }
  | { type: 'SET_MODAL'; payload: 'newChat' | 'groupChat' | null }
  | { type: 'SET_PAGE'; payload: 'chat' | 'futureSelf' };

const initialState: AppState = {
  activeConversation: '1',
  conversations: conversations,
  groups: groups,
  messages: dummyMessages,
  isTyping: false, // will trigger manually
  rightPanelOpen: true,
  activeModal: null,
  activePage: 'chat'
};

const chatReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_ACTIVE_CONVERSATION':
      return { ...state, activeConversation: action.payload, activePage: 'chat' };
    case 'ADD_MESSAGE': {
      const { conversationId, message } = action.payload;
      const existing = state.messages[conversationId] || [];
      return {
        ...state,
        messages: {
          ...state.messages,
          [conversationId]: [...existing, message]
        }
      };
    }
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelOpen: !state.rightPanelOpen };
    case 'SET_MODAL':
      return { ...state, activeModal: action.payload };
    case 'SET_PAGE':
      return { ...state, activePage: action.payload };
    default:
      return state;
  }
};

const ChatContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Auto-show typing indicator for 2 seconds on load for active conversation
  useEffect(() => {
    if (state.activeConversation === '1') {
      dispatch({ type: 'SET_TYPING', payload: true });
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_TYPING', payload: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
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
