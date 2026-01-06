
import React from 'react';

interface UpgradePageProps {
  onBack: () => void;
  onUpgrade: () => void;
}

const UpgradePage: React.FC<UpgradePageProps> = ({ onBack, onUpgrade }) => {
  const features = [
    { title: '全能 AI 创作辅助', desc: '取消 Gemini 3 Pro 调用限制，支持超长文本润色。', icon: 'auto_awesome' },
    { title: 'VIP 排版素材库', desc: '解锁所有高级底纹、动态标题及品牌水印组件。', icon: 'palette' },
    { title: '多模态 Veo 引擎', desc: '每月 50 次高清视频生成，一键为文章配上灵动画面。', icon: 'movie_filter' },
    { title: '全平台极速同步', desc: '优先队列分发，支持导出无水印高清 PDF 与 HTML。', icon: 'rocket_launch' },
    { title: '专业品牌定制', desc: '支持自定义字体、配色方案及个人专属 Logo 库。', icon: 'verified_user' },
    { title: '24/7 优先技术支持', desc: '随时联系专家解决创作中遇到的任何技术难题。', icon: 'support_agent' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4">
          <span className="material-symbols-outlined text-[16px] text-primary fill-icon">stars</span>
          <span className="text-[10px] font-black text-primary tracking-widest uppercase">Creator Studio Professional</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-studio-dark">开启您的专业创作之路</h1>
        <p className="text-studio-sub max-w-2xl mx-auto">
          不再受限于免费额度。Pro 方案旨在为高产出博主提供极致的内容生产力。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-studio-border hover:border-primary/20 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]">{f.icon}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-xs text-studio-sub leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[56px] p-12 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
         <div className="space-y-6 relative z-10 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">年度特惠中</p>
              <h2 className="text-3xl font-black">只需 ¥99 / 月</h2>
              <p className="text-slate-400 text-sm font-medium">按年订阅仅需 ¥988，立省 16%</p>
            </div>
            <ul className="space-y-3">
              {['无限文章库', '全功能 AI 解锁', '跨设备实时云同步'].map((item, i) => (
                <li key={i} className="flex items-center justify-center md:justify-start gap-3 text-sm font-bold">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
         </div>

         <div className="flex flex-col gap-4 w-full max-w-sm relative z-10">
            <button 
              onClick={onUpgrade}
              className="w-full py-5 bg-primary text-white text-lg font-black rounded-3xl shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
            >
              立即订阅专业版
            </button>
            <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest">支持 微信 / 支付宝 / 银联支付</p>
         </div>
      </div>

      <div className="text-center pt-8">
        <button onClick={onBack} className="text-sm font-black text-studio-sub hover:text-studio-dark uppercase tracking-widest">
          暂不升级，继续试用
        </button>
      </div>
    </div>
  );
};

export default UpgradePage;
