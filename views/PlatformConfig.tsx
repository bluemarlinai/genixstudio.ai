
import React, { useState } from 'react';

interface PlatformConfigProps {
  platformId: string;
  onBack: () => void;
}

const PlatformConfig: React.FC<PlatformConfigProps> = ({ platformId, onBack }) => {
  const [isTesting, setIsTesting] = useState(false);
  
  // Mock data based on ID
  const platformData = {
    wechat: { name: '微信公众号', icon: 'chat', color: 'text-green-600' },
    medium: { name: 'Medium', icon: 'article', color: 'text-black' },
    zhihu: { name: '知乎', icon: 'school', color: 'text-blue-600' },
  }[platformId as 'wechat' | 'medium' | 'zhihu'] || { name: '未知平台', icon: 'help', color: 'text-gray-400' };

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 1500);
  };

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-10 pb-20 font-sans animate-in fade-in duration-500">
      <header className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-studio-border shadow-sm bg-white">
          <span className="material-symbols-outlined text-studio-sub">arrow_back</span>
        </button>
        <div>
          <h1 className="text-2xl font-black text-studio-dark tracking-tight">配置 {platformData.name}</h1>
          <p className="text-sm text-studio-sub">管理 API 权限与自动化发布设置</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-[32px] border border-studio-border shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-studio-border pb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-studio-bg ${platformData.color}`}>
                <span className="material-symbols-outlined text-[32px]">{platformData.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-black">{platformData.name} 连接状态</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-green-600 uppercase tracking-widest">已正常运行</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Access Token / API Key</label>
                <div className="relative">
                  <input 
                    type="password" 
                    readOnly 
                    value="••••••••••••••••••••••••••••" 
                    className="w-full bg-studio-bg border-none rounded-2xl px-5 py-4 text-sm font-mono focus:ring-2 ring-primary/20"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-bold text-xs hover:underline">
                    更换密钥
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">App ID / 用户 ID</label>
                  <input 
                    type="text" 
                    defaultValue="creator_studio_pro_88" 
                    className="w-full bg-studio-bg border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">默认分类</label>
                  <select className="w-full bg-studio-bg border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 ring-primary/20 appearance-none">
                    <option>科技资讯</option>
                    <option>创意生活</option>
                    <option>技术分享</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 flex gap-3">
              <button 
                onClick={handleTestConnection}
                className="flex-1 py-4 bg-studio-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
              >
                {isTesting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                )}
                测试连接
              </button>
              <button className="px-6 py-4 bg-white border border-studio-border text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all">
                断开连接
              </button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[32px] border border-studio-border shadow-sm space-y-6">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">同步选项</h3>
            <div className="space-y-4">
              {[
                { label: '自动添加平台后缀', desc: '在文章末尾添加来自 Creator Studio 的标识', active: true },
                { label: '同步读者评论', desc: '将平台评论实时同步至管理后台', active: false },
                { label: '高清图片转存', desc: '发布时自动将文章图片转存至平台私有图床', active: true },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-black text-studio-dark">{opt.label}</p>
                    <p className="text-xs text-studio-sub">{opt.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${opt.active ? 'bg-primary' : 'bg-gray-200'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${opt.active ? 'left-[23px]' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-[32px] border border-studio-border shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">发布历史</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-studio-border mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold text-studio-dark line-clamp-1">AI 在创意写作中的未来</p>
                    <p className="text-[10px] text-studio-sub">2024年3月{20-i}日 · 成功</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/5 rounded-xl transition-all">
              查看完整日志
            </button>
          </section>

          <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/10">
            <span className="material-symbols-outlined text-primary mb-3">verified</span>
            <p className="text-xs font-bold text-primary leading-relaxed">
              您的账号已通过企业开发者验证，享有更高的单日 API 调用限额。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformConfig;
