
import React from 'react';
import { BackgroundPreset, DecorationPreset, BrandPreset, SidebarTab } from './EditorTypes';

interface LeftSidebarProps {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  bgPresets: BackgroundPreset[];
  activeBg: BackgroundPreset;
  setActiveBg: (bg: BackgroundPreset) => void;
  decorationPresets: DecorationPreset[];
  onInsertDecoration: (preset: DecorationPreset) => void;
  brandPresets: BrandPreset[];
  activeBrand: BrandPreset;
  setActiveBrand: (brand: BrandPreset) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  activeTab,
  setActiveTab,
  bgPresets,
  activeBg,
  setActiveBg,
  decorationPresets,
  onInsertDecoration,
  brandPresets,
  activeBrand,
  setActiveBrand,
}) => {
  return (
    <aside className="w-[240px] bg-white border-r border-studio-border flex flex-col z-30 shrink-0">
      <nav className="flex border-b border-studio-border shrink-0">
        {(['BACKGROUND', 'DECORATION', 'BRAND'] as SidebarTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'text-primary bg-primary/5 border-b-2 border-primary' 
                : 'text-studio-sub hover:bg-studio-bg'
            }`}
          >
            {tab === 'BACKGROUND' ? '底纹' : tab === 'DECORATION' ? '装饰' : '品牌'}
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {activeTab === 'BACKGROUND' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">画布样式 ({bgPresets.length})</h4>
            <div className="grid grid-cols-2 gap-2">
              {bgPresets.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg)}
                  className={`group flex flex-col items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    activeBg.id === bg.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-studio-border hover:bg-studio-bg'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden shrink-0 shadow-sm border border-studio-border/50">
                    {bg.thumbnail}
                  </div>
                  <span className="text-[9px] font-black text-studio-dark truncate w-full text-center tracking-tighter px-1">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'DECORATION' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">组件库 ({decorationPresets.length})</h4>
            <div className="grid grid-cols-1 gap-2">
              {decorationPresets.map((dec) => (
                <button
                  key={dec.id}
                  onClick={() => onInsertDecoration(dec)}
                  className="group relative flex items-center justify-between p-2.5 rounded-xl border border-studio-border hover:border-primary hover:bg-primary/5 transition-all text-left bg-white overflow-hidden"
                >
                  <div className="flex-1 truncate">
                    {dec.thumbnail}
                  </div>
                  {dec.isVip && (
                    <span className="ml-2 text-orange-500 text-[7px] font-black border border-orange-200 px-1 rounded bg-orange-50 shrink-0">PRO</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'BRAND' && (
          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-gray-400 uppercase tracking-widest px-1">品牌预设 ({brandPresets.length})</h4>
            <div className="grid grid-cols-2 gap-2">
              {brandPresets.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand)}
                  className={`w-full flex flex-col items-center gap-2 p-2 rounded-xl border transition-all ${
                    activeBrand.id === brand.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-studio-border hover:bg-studio-bg'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden shrink-0 shadow-sm flex items-center justify-center bg-gray-50 border border-studio-border/50">
                    {brand.thumbnail}
                  </div>
                  <span className="text-[9px] font-black text-studio-dark truncate w-full text-center tracking-tighter px-1">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-studio-border bg-gray-50/50">
         <div className="p-2.5 bg-white rounded-xl border border-studio-border shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[9px] font-black uppercase text-studio-sub tracking-widest">Connected</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-gray-300">cloud_done</span>
         </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
