
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
    <aside className="w-[380px] bg-white border-l border-studio-border flex flex-col z-30 shrink-0">
      <div className="p-8 border-b border-studio-border flex items-center justify-between shrink-0">
        <h3 className="text-sm font-black text-studio-dark uppercase tracking-widest">封面 & 智能辅助</h3>
        <span className="material-symbols-outlined text-gray-300">smart_toy</span>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-12">
        {/* COVER SETTINGS */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">封面设置</label>
            <div className="flex gap-1.5">
              <button 
                onClick={onGenerateCover} 
                disabled={isGeneratingCover} 
                className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                title="AI 智能封面"
              >
                {isGeneratingCover 
                  ? <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div> 
                  : <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                }
              </button>
              <button className="p-1.5 bg-studio-bg text-studio-sub rounded-lg hover:bg-gray-200 transition-colors" title="本地上传">
                <span className="material-symbols-outlined text-[18px]">upload</span>
              </button>
            </div>
          </div>
          
          <div className="relative group rounded-[32px] overflow-hidden border border-studio-border bg-studio-bg aspect-[16/9] shadow-inner transition-all hover:shadow-2xl">
            <img src={coverImage} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="Cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">预览封面</span>
            </div>
          </div>
          <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest">1200 x 675 PX (16:9)</p>
        </div>

        {/* AI SUMMARY */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">AI 摘要</label>
            <button 
              onClick={onGenerateSummary} 
              disabled={isGeneratingSummary} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isGeneratingSummary 
                ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> 
                : <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              } 智能润色
            </button>
          </div>
          <textarea 
            value={summary} 
            onChange={(e) => setSummary(e.target.value)} 
            placeholder="在此输入或生成文章摘要..."
            className="w-full rounded-[32px] border-studio-border bg-studio-bg text-sm p-6 h-48 focus:ring-4 ring-primary/5 transition-all resize-none font-medium leading-relaxed" 
          />
        </div>

        {/* STATUS BOX */}
        <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 space-y-4">
          <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">内容合规性检查</h4>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-emerald-500">verified</span>
            <span className="text-xs font-black text-emerald-800">通过全平台发布安全校验</span>
          </div>
          <p className="text-[10px] text-emerald-700/60 leading-relaxed font-medium italic">
            排版组件已针对不同终端引擎完成极致优化，预览效果与实际发布高度一致。
          </p>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
