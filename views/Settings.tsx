
import React from 'react';

interface SettingsProps {
  onConfigPlatform: (platformId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onConfigPlatform }) => {
  return (
    <div className="p-5 max-w-[90rem] mx-auto space-y-8 pb-10">
      <header>
        <h1 className="text-xl font-black tracking-tight text-studio-dark">系统设置</h1>
        <p className="text-[11px] text-studio-sub mt-0.5">管理账户偏好、团队成员及 AI 接口配置。</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-1.5">个人资料</h3>
            <div className="flex items-center gap-6 bg-white p-5 rounded-2xl border border-studio-border">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-200 bg-cover bg-center border-2 border-white shadow-md" style={{backgroundImage: 'url("https://picsum.photos/seed/user/200/200")'}}></div>
                <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-[18px]">photo_camera</span>
                </button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-studio-sub uppercase">显示名称</label>
                  <input className="w-full bg-studio-bg border-none rounded-xl px-3 py-2 text-xs font-medium focus:ring-1 ring-primary/20 transition-all" defaultValue="Alex Chen" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-studio-sub uppercase">个人简介</label>
                  <input className="w-full bg-studio-bg border-none rounded-xl px-3 py-2 text-xs font-medium focus:ring-1 ring-primary/20 transition-all" defaultValue="Digital Creator" />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-1.5">AI 模型配置 (Gemini)</h3>
            <div className="bg-white rounded-2xl border border-studio-border p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">auto_awesome</span></div>
                  <div>
                    <p className="text-sm font-bold">API 密钥</p>
                    <p className="text-[10px] text-studio-sub">多模态生成引擎</p>
                  </div>
                </div>
                <button onClick={async () => window.aistudio?.openSelectKey?.()} className="px-3 py-1.5 bg-primary text-white text-[10px] font-black rounded-lg shadow-md transition-all">选择密钥</button>
              </div>
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50 flex items-start gap-2">
                <span className="material-symbols-outlined text-indigo-500 text-[16px]">info</span>
                <p className="text-[10px] leading-relaxed text-indigo-800">高质量图像与视频生成要求使用付费项目的 API 密钥。访问 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="font-bold underline">账单文档</a>。</p>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-studio-border pb-1.5">关联平台</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'wechat', name: '微信公众号', icon: 'chat', status: '已连接', color: 'text-green-600' },
              { id: 'zhihu', name: '知乎', icon: 'school', status: '未连接', color: 'text-gray-400' },
              { id: 'medium', name: 'Medium', icon: 'article', status: '已连接', color: 'text-black' }
            ].map((platform, i) => (
              <div key={i} onClick={() => platform.status !== '未连接' && onConfigPlatform(platform.id)} className={`flex items-center justify-between p-3 bg-white rounded-xl border border-studio-border hover:shadow-md transition-all group ${platform.status !== '未连接' ? 'cursor-pointer' : 'opacity-70 grayscale cursor-not-allowed'}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`material-symbols-outlined text-[20px] ${platform.color}`}>{platform.icon}</span>
                  <span className="text-xs font-bold">{platform.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase ${platform.status === '未连接' ? 'text-gray-300' : 'text-primary'}`}>{platform.status}</span>
                  {platform.status !== '未连接' && <span className="material-symbols-outlined text-gray-300 text-[16px] group-hover:text-primary transition-colors">settings</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
