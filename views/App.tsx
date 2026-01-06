
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import Dashboard from './views/Dashboard';
import Editor from './views/Editor';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import TemplateLibrary from './views/TemplateLibrary';
import TemplatePreview from './views/TemplatePreview';
import Settings from './views/Settings';
import Publish from './views/Publish';
import ContentList from './views/ContentList';
import PlatformConfig from './views/PlatformConfig';
import TermsPage from './views/TermsPage';
import PrivacyPage from './views/PrivacyPage';
import UpgradePage from './views/UpgradePage';
import PaymentPage from './views/PaymentPage';
import Announcements from './views/Announcements';

// Admin Views
import AdminDashboard from './views/admin/AdminDashboard';
import AssetManager from './views/admin/AssetManager';
import SubscriberManager from './views/admin/SubscriberManager';
import BillingManager from './views/admin/BillingManager';

import { ViewState, Template } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const getPageTitle = () => {
    switch (currentView) {
      case 'DASHBOARD': return '数据概览';
      case 'ANNOUNCEMENTS': return '公告中心';
      case 'CONTENT_LIST': return '内容管理';
      case 'EDITOR': return '内容编辑';
      case 'TEMPLATES': return '模板库';
      case 'TEMPLATE_PREVIEW': return '模板预览';
      case 'SETTINGS': return '系统设置';
      case 'PUBLISH': return '发布准备';
      case 'PLATFORM_CONFIG': return '平台配置';
      case 'UPGRADE': return '会员方案';
      case 'PAYMENT': return '安全支付';
      case 'ADMIN_DASHBOARD': return '系统指挥中心';
      case 'ADMIN_ASSETS': return '基础设施：物料库';
      case 'ADMIN_SUBSCRIBERS': return '用户与订阅管理';
      case 'ADMIN_BILLING': return '财务与结算中心';
      default: return 'GenixStudio';
    }
  };

  const handleLogin = () => {
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentView('LANDING');
  };

  const handleConfigPlatform = (platformId: string) => {
    setActivePlatform(platformId);
    setCurrentView('PLATFORM_CONFIG');
  };

  const handleTemplatePreview = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('TEMPLATE_PREVIEW');
  };

  const handleApplyTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCurrentView('EDITOR');
  };

  const getActions = () => {
    if (currentView.startsWith('ADMIN_')) {
      return (
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all">
              导出 CSV 报告
           </button>
           <button className="px-4 py-2 bg-slate-900 text-white hover:bg-black rounded-lg text-xs font-bold transition-all shadow-lg">
              管理方案配置
           </button>
        </div>
      );
    }
    if (['EDITOR', 'PUBLISH', 'TEMPLATE_PREVIEW', 'UPGRADE', 'PAYMENT'].includes(currentView)) {
      return null;
    }
    return (
      <button 
        onClick={() => setCurrentView('EDITOR')}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-bold shadow-sm transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        新建文章
      </button>
    );
  };

  // Focused Full-screen Views
  if (currentView === 'LANDING') return <LandingPage onStart={setCurrentView} />;
  if (currentView === 'LOGIN') return <LoginPage onLogin={handleLogin} />;
  if (currentView === 'TERMS') return <TermsPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'PRIVACY') return <PrivacyPage onBack={() => setCurrentView('LANDING')} />;
  if (currentView === 'UPGRADE') return <UpgradePage onBack={() => setCurrentView('DASHBOARD')} onUpgrade={() => setCurrentView('PAYMENT')} />;
  if (currentView === 'PAYMENT') return <PaymentPage onBack={() => setCurrentView('UPGRADE')} onSuccess={() => setCurrentView('DASHBOARD')} />;
  if (currentView === 'EDITOR') return <Editor onBack={() => setCurrentView('CONTENT_LIST')} onPublish={() => setCurrentView('PUBLISH')} onNavigateUpgrade={() => setCurrentView('UPGRADE')} />;
  if (currentView === 'TEMPLATE_PREVIEW' && selectedTemplate) return <TemplatePreview template={selectedTemplate} onBack={() => setCurrentView('TEMPLATES')} onUse={handleApplyTemplate} />;
  if (currentView === 'PUBLISH') return <Publish onBack={() => setCurrentView('EDITOR')} onSuccess={() => setCurrentView('DASHBOARD')} />;

  return (
    <div className="min-h-screen flex bg-studio-bg">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onLogout={handleLogout} />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopNav 
          title={getPageTitle()} 
          subtitle={
            currentView === 'ADMIN_DASHBOARD' ? '实时监控全局业务指标与系统负载。' :
            currentView === 'ADMIN_ASSETS' ? '定制化编辑器中的核心视觉资产。' :
            currentView === 'ADMIN_SUBSCRIBERS' ? 'CRM 中心：深度管理用户生命周期。' :
            currentView === 'ADMIN_BILLING' ? '营收监控：管理账单与订阅方案。' : undefined
          }
          actions={getActions()} 
        />
        
        <div className="flex-1 overflow-y-auto bg-studio-bg/50">
          {(currentView === 'DASHBOARD') && <Dashboard onUpgrade={() => setCurrentView('UPGRADE')} onNavigateAnnouncements={() => setCurrentView('ANNOUNCEMENTS')} />}
          {currentView === 'ANNOUNCEMENTS' && <Announcements />}
          {currentView === 'CONTENT_LIST' && <ContentList onEdit={() => setCurrentView('EDITOR')} onCreate={() => setCurrentView('EDITOR')} />}
          {currentView === 'TEMPLATES' && <TemplateLibrary onPreview={handleTemplatePreview} />}
          {currentView === 'SETTINGS' && <Settings onConfigPlatform={handleConfigPlatform} />}
          {currentView === 'PLATFORM_CONFIG' && activePlatform && <PlatformConfig platformId={activePlatform} onBack={() => setCurrentView('SETTINGS')} />}
          
          {/* Admin Modules */}
          {currentView === 'ADMIN_DASHBOARD' && <AdminDashboard />}
          {currentView === 'ADMIN_ASSETS' && <AssetManager />}
          {currentView === 'ADMIN_SUBSCRIBERS' && <SubscriberManager />}
          {currentView === 'ADMIN_BILLING' && <BillingManager />}
        </div>
      </main>
    </div>
  );
};

export default App;
