
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
    <div className="p-8 max-w-[90rem] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">内容管理</h1>
          <p className="text-studio-sub mt-2">管理您所有的文章、草稿及已发布的内容。</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[20px]">search</span>
            <input 
              className="pl-10 pr-4 py-2 bg-white border border-studio-border rounded-xl text-sm w-64 focus:ring-primary focus:border-primary transition-all" 
              placeholder="搜索文章标题..."
            />
          </div>
          <button 
            onClick={onCreate}
            className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-black shadow-lg shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            新建文章
          </button>
        </div>
      </div>

      <div className="flex gap-3 border-b border-studio-border pb-4 overflow-x-auto">
        {['全部文章', '已发布', '草稿箱', '定时发布', '回收站'].map((tab, i) => (
          <button 
            key={i} 
            className={`px-4 py-2 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
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
            <div key={i} className="bg-white rounded-3xl border border-studio-border p-5 h-40 animate-pulse flex gap-6">
              <div className="w-48 h-full bg-gray-100 rounded-2xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-studio-border">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">folder_open</span>
          <p className="text-studio-sub font-bold">暂无内容，开始创作第一篇作品吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group bg-white rounded-3xl border border-studio-border p-5 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:border-primary/10 transition-all duration-300"
            >
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0 border border-studio-border">
                <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              
              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    article.status === 'published' ? 'bg-green-50 text-green-600' :
                    article.status === 'draft' ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {article.status === 'published' ? '已发布' : article.status === 'draft' ? '草稿' : '定时'}
                  </span>
                  <span className="text-xs text-studio-sub font-medium">最后编辑: {article.lastEdited}</span>
                </div>
                <h3 className="text-xl font-black text-studio-dark group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-sm text-studio-sub line-clamp-2 leading-relaxed h-10">{article.description}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-studio-sub">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    {article.views} 阅读
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 shrink-0">
                <button 
                  onClick={() => onEdit(article.id)}
                  className="p-2.5 bg-studio-bg hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
                  title="编辑内容"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button 
                  onClick={() => handleDelete(article.id)}
                  className="p-2.5 bg-studio-bg hover:bg-red-50 hover:text-red-500 rounded-xl transition-all" 
                  title="删除"
                >
                  <span className="material-symbols-outlined">delete</span>
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
