/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChatProvider } from './hooks/useChat';
import { AppLayout } from './components/layout/AppLayout';

export default function App() {
  return (
    <ChatProvider>
      <AppLayout />
    </ChatProvider>
  );
}
