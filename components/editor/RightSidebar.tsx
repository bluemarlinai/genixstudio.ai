
import React from 'react';

interface RightSidebarProps {
  coverImage: string;
  isGeneratingCover: boolean;
  onGenerateCover: () => void;
  summary: string;
  setSummary: (val: string) => void;
  isGeneratingSummary: boolean;
  onGenerateSummary: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  coverImage,
  isGeneratingCover,
  onGenerateCover,
  summary,
  setSummary,
  isGeneratingSummary,
  onGenerateSummary,
}) => {
  return (
    <aside className="w-[300px] bg-white border-l border-studio-border flex flex-col z-30 shrink-0">
      <div className="p-4 border-b border-studio-border flex items-center justify-between shrink-0">
        <h3 className="text-[11px] font-black text-studio-dark uppercase tracking-widest">封面 & 智能辅助</h3>
        <span className="material-symbols-outlined text-gray-300 text-[18px]">smart_toy</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {/* COVER SETTINGS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">封面设置</label>
            <div className="flex gap-1">
              <button 
                onClick={onGenerateCover} 
                disabled={isGeneratingCover} 
                className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                title="AI 智能封面"
              >
                {isGeneratingCover 
                  ? <div className="w-3 h-3 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> 
                  : <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                }
              </button>
              <button className="p-1.5 bg-studio-bg text-studio-sub rounded-lg hover:bg-gray-200 transition-colors" title="本地上传">
                <span className="material-symbols-outlined text-[16px]">upload</span>
              </button>
            </div>
          </div>
          
          <div className="relative group rounded-2xl overflow-hidden border border-studio-border bg-studio-bg aspect-[16/9] shadow-inner transition-all hover:shadow-lg">
            <img src={coverImage} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="Cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[9px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">预览封面</span>
            </div>
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">AI 摘要</label>
            <button 
              onClick={onGenerateSummary} 
              disabled={isGeneratingSummary} 
              className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white text-[9px] font-black rounded-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isGeneratingSummary 
                ? <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                : <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              } 润色
            </button>
          </div>
          <textarea 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            placeholder="在此输入摘要..."
            className="w-full rounded-2xl border-studio-border bg-studio-bg text-[12px] p-4 h-32 focus:ring-2 ring-primary/5 transition-all resize-none font-medium leading-relaxed" 
          />
        </div>

        {/* STATUS BOX */}
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
          <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">内容合规性</h4>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500 text-[18px]">verified</span>
            <span className="text-[11px] font-black text-emerald-800">通过发布安全校验</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
