import React from 'react';
import { Template } from '../types';

export const templates: Template[] = [
  { id: '1', title: '极简产品发布', category: '产品更新', thumbnail: 'https://picsum.photos/seed/t1/600/400', usageCount: '1.2k', description: '干净利落的文字排版，配合大尺寸的产品图，最适合数码与软件产品的发布通告。', author: 'Genix Elite' },
  { id: '2', title: '深度技术周报', category: '技术博客', thumbnail: 'https://picsum.photos/seed/t2/600/400', usageCount: '850', description: '专业的代码高亮提示与多级标题设计，让复杂的架构演进与技术方案一目了然。', author: 'Code Master' },
  { id: '3', title: '视觉系旅游指南', category: '生活方式', thumbnail: 'https://picsum.photos/seed/t3/600/400', usageCount: '2.4k', description: '沉浸式的图片流布局，适合分享城市漫游、探店体验以及精美图集。', author: 'Voyager' },
  { id: '4', title: '现代商业分析', category: '行业研报', thumbnail: 'https://picsum.photos/seed/t4/600/400', usageCount: '540', description: '数据图表与重点结论的完美结合，适合深度的商业洞察与年度总结报告。', author: 'Insight Lab' },
  { id: '5', title: 'AI 趋势简报', category: 'AI资讯', thumbnail: 'https://picsum.photos/seed/t5/600/400', usageCount: '3.1k', description: '快节奏的新闻式排版，强调时效性与核心观点，是AI领域咨询的首选。', author: 'Genix Studio' },
  { id: '6', title: '个人复盘总结', category: '效率', thumbnail: 'https://picsum.photos/seed/t6/600/400', usageCount: '920', description: '网格化的复盘结构，帮助创作者有条理地梳理每周的成长与感悟。', author: 'Alex Chen' },
];

interface TemplateLibraryProps {
  onPreview: (template: Template) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onPreview }) => {
  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">模板库</h1>
          <p className="text-studio-sub mt-2">从精心设计的模板开始，跳过空白页的烦恼。</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[20px]">search</span>
              <input 
                className="pl-10 pr-4 py-2 bg-white border border-studio-border rounded-xl text-sm w-64 focus:ring-primary focus:border-primary transition-all shadow-sm" 
                placeholder="搜索模板..."
              />
           </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {['全部', '热门', '资讯', '博客', '教程', '产品', '设计', '职场'].map((cat, i) => (
          <button 
            key={i} 
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white border border-studio-border text-studio-sub hover:bg-studio-bg'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((tpl) => (
          <div key={tpl.id} className="group bg-white rounded-3xl overflow-hidden border border-studio-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[3/2] overflow-hidden relative">
              <img src={tpl.thumbnail} alt={tpl.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onPreview(tpl)}
                  className="px-6 py-2.5 bg-white text-studio-dark font-black rounded-full text-sm shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                >
                  预览并使用
                </button>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{tpl.category}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tpl.title}</h3>
                <div className="flex items-center gap-1 text-studio-sub">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span className="text-xs font-bold">{tpl.usageCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 bg-cover" style={{backgroundImage: `url('https://picsum.photos/seed/${i+100}/50/50')`}}></div>
                  ))}
                </div>
                <span className="text-[10px] text-studio-sub font-bold">已有创作者选用</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;