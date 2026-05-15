import React from 'react';
import { useChatContext } from '../../hooks/useChat';
import { LeftSidebar } from './LeftSidebar';
import { ChatArea } from './ChatArea';
import { RightPanel } from './RightPanel';
import { FutureSelfPage } from '../pages/FutureSelfPage';
import { NewChatModal } from '../modals/NewChatModal';
import { GroupChatModal } from '../modals/GroupChatModal';
import { AnimatePresence, motion } from 'motion/react';

export const AppLayout = () => {
  const { state } = useChatContext();

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <LeftSidebar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden backdrop-blur-xl">
        {state.activePage === 'chat' ? (
          <ChatArea />
        ) : (
          <FutureSelfPage />
        )}
      </main>

      <AnimatePresence>
        {state.rightPanelOpen && state.activePage === 'chat' && (
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="flex-shrink-0 z-10 hidden xl:block"
          >
            <RightPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.activeModal === 'newChat' && <NewChatModal />}
        {state.activeModal === 'groupChat' && <GroupChatModal />}
      </AnimatePresence>
    </div>
  );
};
