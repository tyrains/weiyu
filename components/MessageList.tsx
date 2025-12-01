import React from 'react';
import { Trash2, Clock, UserCircle2 } from 'lucide-react';
import { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

export const MessageList: React.FC<MessageListProps> = ({ messages, isAdmin, onDelete }) => {
  if (messages.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCircle2 className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-slate-800 font-medium text-lg">暂无留言</h3>
        <p className="text-slate-500 mt-1">成为第一个留言的人！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-200"
        >
          <div className="flex flex-col sm:flex-row-reverse gap-4 sm:gap-6">
            
            {/* Meta Information (Right on Desktop, Top on Mobile) */}
            <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start shrink-0 sm:w-48 sm:pl-6 sm:border-l sm:border-slate-100 border-b sm:border-b-0 border-slate-50 pb-3 sm:pb-0">
              <div className="flex items-center gap-3 sm:gap-2 sm:flex-row-reverse">
                <div className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg sm:text-sm shadow-inner shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-slate-800 leading-tight text-base sm:text-sm max-w-[150px] truncate sm:text-right" title={msg.name}>
                  {msg.name}
                </h3>
              </div>
              
              <div className="flex flex-col items-end sm:mt-2 space-y-1">
                 <div className="flex items-center text-xs text-slate-400">
                    <span className="sm:hidden mr-1"><Clock className="w-3 h-3" /></span>
                    <span>{formatDate(msg.timestamp)}</span>
                    <span className="hidden sm:inline ml-1"><Clock className="w-3 h-3" /></span>
                 </div>
                 
                 {isAdmin && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete(msg.id);
                    }}
                    className="text-rose-400 hover:text-rose-600 text-xs flex items-center gap-1 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                    title="删除留言"
                  >
                    <Trash2 className="w-3 h-3 sm:w-3 sm:h-3" />
                    <span className="sm:hidden">删除</span>
                    <span className="hidden sm:inline">删除留言</span>
                  </button>
                )}
              </div>
            </div>

            {/* Message Content (Left on Desktop, Bottom on Mobile) */}
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};