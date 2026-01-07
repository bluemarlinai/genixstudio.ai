
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
    <div className="p-5 max-w-[90rem] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-black tracking-tight">内容管理</h1>
          <p className="text-[11px] text-studio-sub mt-0.5">管理您所有的文章、草稿及已发布的内容。</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-studio-sub text-[18px]">search</span>
            <input 
              className="pl-9 pr-3 py-1.5 bg-white border border-studio-border rounded-lg text-xs w-56 focus:ring-primary focus:border-primary transition-all" 
              placeholder="搜索文章标题..."
            />
          </div>
          <button 
            onClick={onCreate}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-black shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            新建文章
          </button>
        </div>
      </div>

      <div className="flex gap-3 border-b border-studio-border pb-2 overflow-x-auto scrollbar-hide">
        {['全部文章', '已发布', '草稿箱', '定时发布', '回收站'].map((tab, i) => (
          <button 
            key={i} 
            className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
              i === 0 ? 'border-primary text-primary' : 'border-transparent text-studio-sub hover:text-studio-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl border border-studio-border p-4 h-28 animate-pulse flex gap-4">
              <div className="w-32 h-full bg-gray-100 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-1/4"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-studio-border">
          <span className="material-symbols-outlined text-gray-300 text-5xl mb-3">folder_open</span>
          <p className="text-xs text-studio-sub font-bold">暂无内容，开始创作第一篇作品吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-2xl border border-studio-border p-3.5 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg hover:border-primary/10 transition-all duration-300"
            >
              <div className="w-full md:w-36 h-24 rounded-xl overflow-hidden shrink-0 border border-studio-border">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    article.status === 'published' ? 'bg-green-50 text-green-600' :
                    article.status === 'draft' ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {article.status === 'published' ? '已发布' : article.status === 'draft' ? '草稿' : '定时'}
                  </span>
                  <span className="text-[10px] text-studio-sub font-medium">最后编辑: {article.lastEdited}</span>
                </div>
                <h3 className="text-base font-black text-studio-dark group-hover:text-primary transition-colors line-clamp-1">{article.title}</h3>
                <p className="text-[11px] text-studio-sub line-clamp-1 leading-relaxed">{article.description}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-studio-sub">
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    {article.views} 阅读
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-1.5 shrink-0">
                <button 
                  onClick={() => onEdit(article.id)}
                  className="p-2 bg-studio-bg hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
                  title="编辑内容"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="p-2 bg-studio-bg hover:bg-red-50 hover:text-red-500 rounded-lg transition-all" 
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
