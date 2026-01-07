
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onNavigate, 
  onLogout, 
  isCollapsed, 
  onToggleCollapse 
}) => {
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
    <aside 
      className={`bg-white border-r border-studio-border flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Top Header & Toggle */}
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden animate-in fade-in duration-300">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10 shrink-0">
              <img src="assets/logo.png" alt="Genix Studio Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-base font-black tracking-tight text-studio-dark whitespace-nowrap">Genix Studio</h1>
          </div>
        )}
        {isCollapsed && (
          <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-primary/10 shrink-0">
            <img src="assets/logo.png" alt="Genix Studio Logo" className="w-full h-full object-contain" />
          </div>
        )}
        <button 
          onClick={onToggleCollapse}
          className={`absolute -right-3 top-10 w-6 h-6 bg-white border border-studio-border rounded-full flex items-center justify-center text-studio-sub hover:text-primary shadow-sm hover:shadow transition-all z-50 group ${isCollapsed ? 'rotate-180' : ''}`}
          title={isCollapsed ? "展开菜单" : "折叠菜单"}
        >
          <span className="material-symbols-outlined text-[16px] font-bold">menu_open</span>
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto overflow-x-hidden pt-4">
        <div className={`px-3 py-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 p-0' : 'opacity-100'}`}>
          创作者工具
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`w-full flex items-center transition-all ${
              isActive(item.id)
                ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                : 'text-studio-sub hover:bg-gray-50 hover:text-studio-dark'
            } ${isCollapsed ? 'justify-center px-0 py-2.5 rounded-xl' : 'justify-between px-3 py-1.5 rounded-lg'}`}
            title={isCollapsed ? item.label : undefined}
          >
            <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-2.5'}`}>
              <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="text-xs whitespace-nowrap overflow-hidden">{item.label}</span>}
            </div>
            {!isCollapsed && item.hasBadge && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-white"></span>
            )}
            {isCollapsed && item.hasBadge && (
              <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-primary"></span>
            )}
          </button>
        ))}

        <div className={`pt-4 px-3 py-1.5 text-[10px] font-black text-red-300 uppercase tracking-widest transition-opacity duration-200 ${isCollapsed ? 'opacity-0 h-0 p-0' : 'opacity-100'}`}>
          超级管理
        </div>
        {adminItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ViewState)}
            className={`w-full flex items-center transition-all ${
              currentView === item.id
                ? 'bg-slate-900 text-white font-bold shadow-md' 
                : 'text-studio-sub hover:bg-gray-50 hover:text-studio-dark'
            } ${isCollapsed ? 'justify-center px-0 py-2.5 rounded-xl' : 'gap-2.5 px-3 py-1.5 rounded-lg'}`}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-xs whitespace-nowrap overflow-hidden">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-3 border-t border-studio-border shrink-0">
        <div 
          className={`flex items-center p-1.5 rounded-lg hover:bg-gray-50 group cursor-pointer ${isCollapsed ? 'justify-center' : 'justify-between'}`}
          onClick={() => onNavigate('SETTINGS')}
          title={isCollapsed ? "超级管理员" : undefined}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 bg-cover bg-center border border-studio-border shrink-0" style={{backgroundImage: 'url("https://picsum.photos/seed/admin/100/100")'}}></div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden animate-in fade-in duration-300">
                <span className="text-[11px] font-bold whitespace-nowrap">超级管理员</span>
                <span className="text-[9px] text-red-500 font-black uppercase tracking-tighter whitespace-nowrap">Infrastructure</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={(e) => { e.stopPropagation(); onLogout(); }}
              className="p-1 text-studio-sub hover:text-red-500 hover:bg-red-50 rounded-md transition-all shrink-0"
              title="退出登录"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          )}
        </div>
        {isCollapsed && (
          <button 
            onClick={onLogout}
            className="w-full flex justify-center py-2 mt-2 text-studio-sub hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="退出登录"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
