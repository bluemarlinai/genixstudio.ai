
import React from 'react';

const HelpPage: React.FC = () => {
  const categories = [
    { title: '快速入门', icon: 'rocket_launch', desc: '在 5 分钟内发布第一篇文章。', count: 12 },
    { title: '内容编辑', icon: 'edit_square', desc: '掌握排版组件及底纹样式。', count: 24 },
    { title: 'AI 辅助', icon: 'auto_awesome', desc: '高效使用 AI 润色及生成。', count: 18 },
    { title: '多端发布', icon: 'share', desc: '配置全平台同步发布策略。', count: 9 },
    { title: '数据看板', icon: 'analytics', desc: '解读数据，优化影响力。', count: 15 },
    { title: '账户计费', icon: 'payments', desc: '订阅方案与 API 额度说明。', count: 7 },
  ];

  return (
    <div className="p-5 max-w-[90rem] mx-auto space-y-10 pb-10 animate-in fade-in duration-500">
      <section className="bg-slate-900 rounded-3xl p-10 text-center text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 space-y-5 max-w-xl mx-auto">
          <h1 className="text-2xl font-black tracking-tight">我们能帮您解决什么？</h1>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input className="w-full bg-white/10 border-white/20 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium placeholder-gray-400 focus:bg-white focus:text-slate-900 focus:ring-0 transition-all outline-none" placeholder="搜索文档、教程或常见问题..." />
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            热门：<span className="text-white hover:underline cursor-pointer ml-1.5">配置微信</span> · <span className="text-white hover:underline cursor-pointer ml-1.5">Pro 权益</span>
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[10px] font-black text-studio-dark uppercase tracking-widest border-b border-studio-border pb-1.5">文档分类</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-studio-border hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span className="text-[9px] font-black text-studio-sub uppercase tracking-tighter">{cat.count} 篇</span>
              </div>
              <h3 className="text-sm font-black text-studio-dark group-hover:text-primary transition-colors mb-1">{cat.title}</h3>
              <p className="text-[10px] text-studio-sub leading-relaxed font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-[10px] font-black text-studio-dark uppercase tracking-widest">常见问题</h2>
          <div className="space-y-3">
            {[
              { q: '如何开启 AI 实时润色？', a: '在编辑器右侧边栏点击“AI 摘要”按钮。' },
              { q: '支持导出 PDF 吗？', a: 'Pro 用户支持在“发布”页面导出。' }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-studio-border overflow-hidden">
                <div className="px-5 py-3 font-bold text-xs text-studio-dark flex justify-between items-center bg-gray-50/30">{faq.q}<span className="material-symbols-outlined text-gray-300 text-[18px]">expand_more</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-7xl">support_agent</span></div>
          <h3 className="text-lg font-black mb-2">需要人工帮助？</h3>
          <p className="text-[11px] text-white/80 leading-relaxed mb-6">我们的专家随时准备为您解答复杂的创作难题。</p>
          <button className="w-full py-3 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-studio-bg transition-all">联系专属顾问</button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
