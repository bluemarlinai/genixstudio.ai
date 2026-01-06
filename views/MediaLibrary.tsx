
import React, { useState, useEffect } from 'react';

interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  type: 'IMAGE' | 'VIDEO';
}

const MediaLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'IMAGE' | 'VIDEO' | 'FAV' | 'UPLOADS'>('ALL');
  const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);

  // Simulated upload progress logic
  useEffect(() => {
    const interval = setInterval(() => {
      setUploadQueue(prev => 
        prev.map(item => {
          if (item.status === 'uploading' && item.progress < 100) {
            const nextProgress = item.progress + Math.floor(Math.random() * 15);
            return {
              ...item,
              progress: nextProgress >= 100 ? 100 : nextProgress,
              status: nextProgress >= 100 ? 'success' : 'uploading'
            };
          }
          return item;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateUpload = () => {
    const newFiles: UploadItem[] = [
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Nature_Cinematic_${Math.floor(Math.random() * 100)}.mp4`,
        size: '42.5 MB',
        progress: 0,
        status: 'uploading',
        type: 'VIDEO'
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        name: `Studio_Shoot_0${Math.floor(Math.random() * 9)}.jpg`,
        size: '4.2 MB',
        progress: 0,
        status: 'uploading',
        type: 'IMAGE'
      }
    ];
    setUploadQueue(prev => [...newFiles, ...prev]);
    setActiveTab('UPLOADS');
  };

  const removeUpload = (id: string) => {
    setUploadQueue(prev => prev.filter(item => item.id !== id));
  };

  const assets = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    type: i % 4 === 0 ? 'VIDEO' : 'IMAGE',
    url: `https://picsum.photos/seed/media${i}/600/400`,
    name: `Asset_2024_03_${i+1}.jpg`,
    size: '1.2 MB'
  }));

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-studio-dark">媒体素材库</h1>
          <p className="text-studio-sub mt-2">统一管理您的图片、视频及 AI 生成的视觉资产。</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSimulateUpload}
            className="px-6 py-3 bg-studio-dark text-white rounded-2xl text-sm font-black shadow-xl hover:bg-black transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
            上传媒体
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2 shrink-0">
          {[
            { id: 'ALL', label: '全部素材', icon: 'grid_view' },
            { id: 'IMAGE', label: '图片素材', icon: 'image' },
            { id: 'VIDEO', label: '视频文件', icon: 'movie' },
            { id: 'FAV', label: '我的收藏', icon: 'star' },
            { id: 'UPLOADS', label: '上传管理', icon: 'sync', badge: uploadQueue.filter(i => i.status === 'uploading').length },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-studio-sub hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${activeTab === item.id ? '' : 'text-gray-400'}`}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge ? (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeTab === item.id ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </aside>

        <div className="flex-1 space-y-6">
          {activeTab === 'UPLOADS' ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              {/* Drop Zone */}
              <div 
                className="group border-2 border-dashed border-studio-border rounded-[40px] p-12 text-center bg-white hover:border-primary/40 hover:bg-primary/[0.01] transition-all cursor-pointer"
                onClick={handleSimulateUpload}
              >
                <div className="w-20 h-20 bg-studio-bg rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                  <span className="material-symbols-outlined text-4xl text-studio-sub group-hover:text-primary">upload_file</span>
                </div>
                <h3 className="text-xl font-black text-studio-dark mb-2">拖拽文件到这里</h3>
                <p className="text-studio-sub text-sm max-w-xs mx-auto">
                  支持 JPG, PNG, MP4 格式。单个文件最大支持 2GB。
                </p>
                <div className="mt-8">
                  <span className="px-6 py-2.5 bg-white border border-studio-border rounded-xl text-xs font-black uppercase tracking-widest text-studio-sub group-hover:text-primary group-hover:border-primary transition-all">
                    浏览本地文件
                  </span>
                </div>
              </div>

              {/* Upload Queue List */}
              <div className="bg-white rounded-[32px] border border-studio-border overflow-hidden shadow-sm">
                <div className="px-8 py-5 border-b border-studio-border flex justify-between items-center bg-gray-50/50">
                  <h4 className="text-xs font-black text-studio-sub uppercase tracking-[0.2em]">当前传输任务 ({uploadQueue.length})</h4>
                  {uploadQueue.some(i => i.status === 'success') && (
                    <button 
                      onClick={() => setUploadQueue(prev => prev.filter(i => i.status !== 'success'))}
                      className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                    >
                      清空已完成
                    </button>
                  )}
                </div>

                <div className="divide-y divide-studio-border max-h-[500px] overflow-y-auto">
                  {uploadQueue.length === 0 ? (
                    <div className="py-20 text-center">
                      <span className="material-symbols-outlined text-gray-200 text-5xl mb-3">cloud_off</span>
                      <p className="text-studio-sub text-sm font-bold">暂无活动传输任务</p>
                    </div>
                  ) : (
                    uploadQueue.map(item => (
                      <div key={item.id} className="p-6 flex items-center gap-6 group hover:bg-gray-50 transition-colors">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          item.type === 'VIDEO' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                        }`}>
                          <span className="material-symbols-outlined">{item.type === 'VIDEO' ? 'movie' : 'image'}</span>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-black text-studio-dark line-clamp-1">{item.name}</p>
                              <p className="text-[10px] text-studio-sub font-bold">{item.size}</p>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                              item.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary animate-pulse'
                            }`}>
                              {item.status === 'success' ? '已完成' : `${item.progress}% 上传中`}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-primary'}`}
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <button 
                          onClick={() => removeUpload(item.id)}
                          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {item.status === 'success' ? 'delete' : 'cancel'}
                          </span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-4 p-1.5 bg-gray-100 rounded-2xl w-fit">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-studio-sub text-[18px]">search</span>
                    <input className="pl-9 pr-4 py-2 bg-transparent border-none text-xs w-64 focus:ring-0 font-medium" placeholder="搜索文件名..." />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700">
                {assets
                  .filter(a => activeTab === 'ALL' || a.type === activeTab)
                  .map((asset) => (
                  <div key={asset.id} className="group bg-white rounded-3xl overflow-hidden border border-studio-border hover:shadow-2xl transition-all relative">
                    <div className="aspect-[4/3] relative overflow-hidden bg-studio-bg">
                      <img src={asset.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Asset" />
                      {asset.type === 'VIDEO' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                           <span className="material-symbols-outlined text-white text-4xl drop-shadow-md">play_circle</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="p-2 bg-white rounded-xl text-studio-dark hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">download</span>
                        </button>
                        <button className="p-2 bg-white rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-black text-studio-dark truncate">{asset.name}</p>
                      <p className="text-[10px] text-studio-sub font-bold uppercase mt-1">{asset.size} · {asset.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
