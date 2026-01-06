
import React from 'react';

interface TopNavProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onNotificationClick?: () => void;
  onHelpClick?: () => void;
  hasUnread?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ title, subtitle, actions, onNotificationClick, onHelpClick, hasUnread = true }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-studio-border px-8 py-3 flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-studio-dark">{title}</h2>
        {subtitle && <p className="text-xs text-studio-sub">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {actions}
        <div className="flex items-center gap-2">
           <button 
            onClick={onNotificationClick}
            className="p-2 text-studio-sub hover:bg-primary/5 hover:text-primary rounded-full transition-all relative group"
           >
              <span className="material-symbols-outlined transition-transform group-active:scale-90">notifications</span>
              {hasUnread && (
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white ring-1 ring-primary/20 animate-pulse"></span>
              )}
           </button>
           <button 
            onClick={onHelpClick}
            className="p-2 text-studio-sub hover:bg-gray-50 rounded-full transition-colors group"
           >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">help</span>
           </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
