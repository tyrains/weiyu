import React, { useState } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';
import { MessageFormData } from '../types';

interface MessageFormProps {
  onSubmit: (data: MessageFormData) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsSubmitting(true);
    // Simulate a tiny network delay for better UX feel
    setTimeout(() => {
      onSubmit({ name: name.trim(), content: content.trim() });
      setName('');
      setContent('');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 mb-10 border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
      
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-50 text-indigo-600">
          <MessageSquare className="w-3.5 h-3.5" />
        </span>
        写下您的留言
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
            您的称呼
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="怎么称呼您？"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
            留言内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="block w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 resize-none"
            placeholder="分享您的想法..."
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !content.trim()}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/30
              transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0
              ${isSubmitting || !name.trim() || !content.trim()
                ? 'bg-slate-300 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                发布中...
              </span>
            ) : (
              <>
                <span>发布留言</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};