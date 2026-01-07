
import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ApiService } from '../api';

interface ContentListProps {
  onEdit: (id: string) => void;
  onCreate: () => void;
}

const ContentList: React.FC<ContentListProps> = ({ onEdit, onCreate }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const data = await ApiService.fetchArticles();
      setArticles(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确认删除这篇文章吗？')) {
      await ApiService.deleteArticle(id);
      loadArticles();
    }
  };

  return (
    <div className="p-8 md:px-12 lg:px-16 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-studio-dark">内容管理</h1>
          <p className="text-[11px] text-studio-sub mt-1">管理您所有的文章、草稿及已发布的内容。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[20px]">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-studio-border rounded-xl text-xs w-64 focus:ring-primary focus:border-primary transition-all shadow-sm" 
              placeholder="搜索文章标题..."
            />
          </div>
          <button 
            onClick={onCreate}
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black shadow-lg shadow-primary/10 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            新建文章
          </button>
        </div>
      </div>

      <div className="flex gap-6 border-b border-studio-border pb-1 overflow-x-auto scrollbar-hide">
        {['全部文章', '已发布', '草稿箱', '定时发布', '回收站'].map((tab, i) => (
          <button 
            key={i} 
            className={`px-1 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
              i === 0 ? 'border-primary text-primary' : 'border-transparent text-studio-sub hover:text-studio-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-[32px] border border-studio-border p-6 h-32 animate-pulse flex gap-6">
              <div className="w-40 h-full bg-gray-100 rounded-2xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-100 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-studio-border">
          <div className="w-20 h-20 bg-studio-bg rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-gray-300 text-4xl">folder_open</span>
          </div>
          <p className="text-sm text-studio-sub font-bold">暂无内容，开始创作第一篇作品吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-[32px] border border-studio-border p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-full md:w-44 h-28 rounded-2xl overflow-hidden shrink-0 border border-studio-border">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                    article.status === 'published' ? 'bg-green-50 text-green-600' :
                    article.status === 'draft' ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {article.status === 'published' ? '已发布' : article.status === 'draft' ? '草稿' : '定时'}
                  </span>
                  <span className="text-[10px] text-studio-sub font-bold">最后编辑: {article.lastEdited}</span>
                </div>
                <h3 className="text-lg font-black text-studio-dark group-hover:text-primary transition-colors line-clamp-1">{article.title}</h3>
                <p className="text-xs text-studio-sub line-clamp-1 leading-relaxed font-medium">{article.description}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-studio-sub">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {article.views} 阅读
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-studio-sub">
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    {article.platforms.length} 个平台
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => onEdit(article.id)}
                  className="p-3 bg-studio-bg hover:bg-primary/10 hover:text-primary rounded-2xl transition-all group/btn"
                  title="编辑内容"
                >
                  <span className="material-symbols-outlined text-[20px] group-active/btn:scale-90">edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="p-3 bg-studio-bg hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all" 
                  title="删除"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentList;
