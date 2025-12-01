import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { MessageForm } from './components/MessageForm';
import { MessageList } from './components/MessageList';
import { LoginModal } from './components/LoginModal';
import { Message, MessageFormData } from './types';
import { getStoredMessages, saveMessage, deleteStoredMessage } from './services/storage';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load messages on mount
  useEffect(() => {
    setMessages(getStoredMessages());
  }, []);

  const handleAddMessage = (data: MessageFormData) => {
    const newMessage: Message = {
      id: uuidv4(),
      ...data,
      timestamp: Date.now(),
    };
    const updated = saveMessage(newMessage);
    setMessages(updated);
  };

  const handleDeleteMessage = (id: string) => {
    if (!isAdmin) return;
    
    // Using window.confirm directly
    if (window.confirm('确定要删除这条留言吗？')) {
      // 1. Update storage
      deleteStoredMessage(id);
      
      // 2. Update local state directly to ensure immediate UI feedback
      // This prevents issues where reading from storage might return stale data
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Header 
          isAdmin={isAdmin} 
          onAdminClick={() => setIsLoginModalOpen(true)} 
          onLogout={handleAdminLogout} 
        />

        <main>
          <div className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 mb-4">
                畅所欲言
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">
                欢迎来到我们的社区空间。留下您的建议、想法，或者仅仅打个招呼！
              </p>
            </div>
            
            <MessageForm onSubmit={handleAddMessage} />
          </div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">最新留言</span>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            
            <MessageList 
              messages={messages} 
              isAdmin={isAdmin} 
              onDelete={handleDeleteMessage} 
            />
          </div>
        </main>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={() => setIsAdmin(true)} 
      />
    </div>
  );
};

export default App;