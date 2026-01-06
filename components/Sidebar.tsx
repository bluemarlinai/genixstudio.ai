
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: '我的主页', icon: 'home' },
    { id: 'ANNOUNCEMENTS', label: '公告中心', icon: 'campaign', hasBadge: true },
    { id: 'CALENDAR', label: '发布日历', icon: 'calendar_month' },
    { id: 'CONTENT_LIST', label: '内容管理', icon: 'description' },
    { id: 'MEDIA_LIBRARY', label: '媒体素材', icon: 'photo_library' },
    { id: 'TEMPLATES', label: '灵感模板', icon: 'space_dashboard' },
    { id: 'SETTINGS', label: '个人设置', icon: 'settings' },
  ];

  const adminItems = [
    { id: 'ADMIN_DASHBOARD', label: '系统监控', icon: 'analytics' },
    { id: 'ADMIN_ASSETS', label: '物料管理', icon: 'inventory_2' },
    { id: 'ADMIN_ANNOUNCEMENTS', label: '公告管理', icon: 'campaign' },
    { id: 'ADMIN_BLOG', label: '博客管理', icon: 'auto_stories' },
    { id: 'ADMIN_PLANS', label: '方案管理', icon: 'layers' },
    { id: 'ADMIN_SUBSCRIBERS', label: '用户管理', icon: 'group' },
    { id: 'ADMIN_BILLING', label: '财务结算', icon: 'payments' },
  ];

  const isActive = (id: string) => currentView === id || (id === 'CONTENT_LIST' && currentView === 'EDITOR');

  return (
    <aside className="w-64 bg-white border-r border-studio-border flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10">
            <img src="assets/logo.png" alt="Genix Studio Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-studio-dark">Genix Studio</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs font-black text-gray-300 uppercase tracking-widest">创作者工具</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
              isActive(item.id)
                ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                : 'text-studio-sub hover:bg-gray-50 hover:text-studio-dark'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </div>
            {item.hasBadge && (
              <span className="w-2 h-2 rounded-full bg-primary ring-4 ring-white"></span>
            )}
          </button>
        ))}

        <div className="pt-6 px-3 py-2 text-xs font-black text-red-300 uppercase tracking-widest">超级管理</div>
        {adminItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              currentView === item.id
                ? 'bg-slate-900 text-white font-bold shadow-lg' 
                : 'text-studio-sub hover:bg-gray-50 hover:text-studio-dark'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-studio-border">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 group">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('SETTINGS')}>
            <div className="w-9 h-9 rounded-full bg-gray-200 bg-cover bg-center border border-studio-border" style={{backgroundImage: 'url("https://picsum.photos/seed/admin/100/100")'}}></div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">超级管理员</span>
              <span className="text-[10px] text-red-500 font-black uppercase tracking-tighter">Infrastructure</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-1.5 text-studio-sub hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            title="退出登录"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
