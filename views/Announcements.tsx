
import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { ApiService } from '../api';

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const data = await ApiService.fetchAnnouncements();
    setAnnouncements(data);
  };

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'maintenance': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'update': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'feature': return '新功能';
      case 'maintenance': return '系统维护';
      case 'update': return '版本更新';
      default: return '公告消息';
    }
  };

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-studio-dark">公告中心</h1>
        <p className="text-studio-sub mt-2">获取 Creator Studio 的最新动态、功能发布及系统通知。</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            onClick={() => setSelectedAnnouncement(item)}
            className="group bg-white p-8 rounded-[40px] border border-studio-border hover:border-primary/20 hover:shadow-xl transition-all cursor-pointer relative"
          >
            {item.isNew && (
              <span className="absolute top-8 right-8 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getTypeStyle(item.type)}`}>
                {getTypeLabel(item.type)}
              </span>
              <span className="text-xs font-bold text-studio-sub uppercase tracking-widest">{item.date}</span>
            </div>
            <h3 className="text-xl font-black text-studio-dark group-hover:text-primary transition-colors mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-sm text-studio-sub leading-relaxed line-clamp-2">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedAnnouncement(null)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[56px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 p-12">
            <button 
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-10 right-10 p-2 hover:bg-studio-bg rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-studio-sub">close</span>
            </button>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getTypeStyle(selectedAnnouncement.type)}`}>
                  {getTypeLabel(selectedAnnouncement.type)}
                </span>
                <span className="text-xs font-bold text-studio-sub uppercase tracking-widest">{selectedAnnouncement.date}</span>
              </div>
              <h2 className="text-3xl font-black text-studio-dark leading-tight">{selectedAnnouncement.title}</h2>
              <div className="prose prose-blue max-w-none text-studio-sub leading-loose font-medium">
                <p>{selectedAnnouncement.excerpt}</p>
                <p>详细说明及后续操作指南将会在对应的功能文档中同步更新。如果您对本次更新有任何疑问，请联系我们的客服团队。</p>
                <div className="bg-studio-bg p-6 rounded-3xl mt-8">
                  <p className="text-xs italic">
                    Creator Studio 团队致力于为您提供最专业的内容生产工具。感谢您一路以来的支持与信任。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
