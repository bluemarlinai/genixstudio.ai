
import React from 'react';

interface SettingsProps {
  onConfigPlatform: (platformId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onConfigPlatform }) => {
  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-12 pb-20">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-studio-dark">系统设置</h1>
        <p className="text-studio-sub mt-2">管理您的账户偏好、团队成员及 AI 接口配置。</p>
      </header>

      <section className="space-y-6">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2">个人资料</h3>
        <div className="flex items-center gap-8 bg-white p-6 rounded-3xl border border-studio-border">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gray-200 bg-cover bg-center border-4 border-white shadow-lg" style={{backgroundImage: 'url("https://picsum.photos/seed/user/200/200")'}}></div>
            <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-studio-sub uppercase">显示名称</label>
              <input className="w-full bg-studio-bg border-none rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 ring-primary/20 transition-all" defaultValue="Alex Chen" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-studio-sub uppercase">个人简介</label>
              <input className="w-full bg-studio-bg border-none rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 ring-primary/20 transition-all" defaultValue="Digital Content Strategist & Creator" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2">AI 模型配置 (Gemini & Veo)</h3>
        <div className="bg-white rounded-3xl border border-studio-border overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <p className="font-bold">API 密钥管理</p>
                  <p className="text-xs text-studio-sub">用于多模态生成与内容补全</p>
                </div>
              </div>
              <button 
                onClick={async () => {
                  if (window.aistudio && window.aistudio.openSelectKey) {
                    await window.aistudio.openSelectKey();
                  }
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                选择 API 密钥
              </button>
            </div>
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-indigo-500 text-[20px]">info</span>
                <p className="text-xs leading-relaxed text-indigo-800">
                  视频生成功能 (Veo) 及高质量图像编辑要求使用付费项目的 API 密钥。
                  请访问 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="font-bold underline">账单文档</a> 了解更多详情。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-2">关联平台</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'wechat', name: '微信公众号', icon: 'chat', status: '已连接', color: 'text-green-600' },
            { id: 'zhihu', name: '知乎', icon: 'school', status: '未连接', color: 'text-gray-400' },
            { id: 'medium', name: 'Medium', icon: 'article', status: '已连接', color: 'text-black' },
            { id: 'xiaohongshu', name: '小红书', icon: 'photo_camera', status: '实验性', color: 'text-red-500' }
          ].map((platform, i) => (
            <div 
              key={i} 
              onClick={() => platform.status !== '未连接' && onConfigPlatform(platform.id)}
              className={`flex items-center justify-between p-4 bg-white rounded-2xl border border-studio-border hover:shadow-md transition-all group ${platform.status !== '未连接' ? 'cursor-pointer hover:border-primary/20' : 'opacity-70 grayscale cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${platform.color}`}>{platform.icon}</span>
                <span className="text-sm font-bold">{platform.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-tighter ${platform.status === '未连接' ? 'text-gray-300' : 'text-primary'}`}>
                  {platform.status}
                </span>
                {platform.status !== '未连接' && (
                  <span className="material-symbols-outlined text-gray-300 text-[18px] group-hover:text-primary transition-colors">settings</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;
