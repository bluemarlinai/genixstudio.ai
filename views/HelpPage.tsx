import React from 'react';

const HelpPage: React.FC = () => {
  const categories = [
    { title: '快速入门', icon: 'rocket_launch', desc: '了解核心工作流，在 5 分钟内发布您的第一篇文章。', count: 12 },
    { title: '内容编辑', icon: 'edit_square', desc: '掌握高级富文本编辑、排版组件及底纹样式。', count: 24 },
    { title: 'AI 辅助创作', icon: 'auto_awesome', desc: '如何高效使用 AI 润色及视频生成。', count: 18 },
    { title: '多平台发布', icon: 'share', desc: '配置微信、知乎及 Medium 等平台的同步发布策略。', count: 9 },
    { title: '数据与增长', icon: 'analytics', desc: '深度解读阅读数据，优化个人品牌影响力。', count: 15 },
    { title: '账户与计费', icon: 'payments', desc: '关于订阅方案、发票管理及 API 额度的常见问题。', count: 7 },
  ];

  const faqs = [
    { q: '如何开启 AI 实时润色功能？', a: '在编辑器右侧边栏点击“AI 摘要”按钮，或在选中文字后使用浮动工具栏中的 AI 助手。' },
    { q: '支持导出 PDF 吗？', a: 'Pro 用户支持在“发布”页面选择导出为高清 PDF 或干净的 HTML 代码。' },
    { q: '发布后可以在 Genix Studio 修改吗？', a: '出于安全考虑，已发布的内容需要前往对应平台后台进行最终修改，Genix Studio 暂不支持双向同步修改。' },
  ];

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
      {/* Hero Search Section */}
      <section className="bg-slate-900 rounded-[56px] p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight">我们能帮您解决什么问题？</h1>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="w-full bg-white/10 border-white/20 rounded-[28px] py-6 pl-16 pr-8 text-lg font-medium placeholder-gray-400 focus:bg-white focus:text-slate-900 focus:ring-0 focus:border-white transition-all outline-none" 
              placeholder="搜索文档、教程或常见问题..."
            />
          </div>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
            热门搜索：<span className="text-white hover:underline cursor-pointer ml-2">配置微信</span> · <span className="text-white hover:underline cursor-pointer ml-2">视频配额</span> · <span className="text-white hover:underline cursor-pointer ml-2">Pro 权益</span>
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-black text-studio-dark uppercase tracking-widest">文档分类</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-studio-border hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">{cat.icon}</span>
                </div>
                <span className="text-[10px] font-black text-studio-sub uppercase tracking-tighter">
                  {cat.count} 篇文章
                </span>
              </div>
              <h3 className="text-lg font-black text-studio-dark group-hover:text-primary transition-colors mb-2">{cat.title}</h3>
              <p className="text-xs text-studio-sub leading-relaxed font-medium">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-studio-dark uppercase tracking-widest">常见问题 FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-studio-border overflow-hidden">
                <div className="p-6 font-bold text-sm text-studio-dark flex justify-between items-center bg-gray-50/30">
                  {faq.q}
                  <span className="material-symbols-outlined text-gray-300">expand_more</span>
                </div>
                <div className="p-6 text-sm text-studio-sub leading-relaxed border-t border-studio-border">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-primary p-10 rounded-[48px] text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
               <span className="material-symbols-outlined text-8xl">support_agent</span>
            </div>
            <h3 className="text-xl font-black mb-4">需要人工帮助？</h3>
            <p className="text-sm text-white/80 leading-relaxed mb-8">
              我们的技术专家随时准备为您解答复杂的创作难题。
            </p>
            <button className="w-full py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-studio-bg transition-all">
              联系专属顾问
            </button>
          </div>

          <div className="p-8 border border-studio-border rounded-[40px] bg-white space-y-4">
            <h4 className="text-[10px] font-black text-studio-sub uppercase tracking-widest">其他渠道</h4>
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                   <span className="material-symbols-outlined text-[20px]">chat</span>
                 </div>
                 <span className="text-xs font-bold text-studio-dark">微信开发者社区</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                   <span className="material-symbols-outlined text-[20px]">mail</span>
                 </div>
                 <span className="text-xs font-bold text-studio-dark">support@genixstudio.ai</span>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;