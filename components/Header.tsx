import React from 'react';
import { Shield, ShieldCheck, LogOut } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAdmin, onAdminClick, onLogout }) => {
  return (
    <header className="flex justify-between items-center py-6 mb-8 border-b border-slate-200">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">微语墙</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">社区留言板</p>
        </div>
      </div>

      <button
        onClick={isAdmin ? onLogout : onAdminClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isAdmin
            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
        }`}
      >
        {isAdmin ? (
          <>
            <ShieldCheck className="w-4 h-4" />
            <span>管理员已登录</span>
            <LogOut className="w-3 h-3 ml-1 opacity-50" />
          </>
        ) : (
          <>
            <Shield className="w-4 h-4" />
            <span>管理员</span>
          </>
        )}
      </button>
    </header>
  );
};