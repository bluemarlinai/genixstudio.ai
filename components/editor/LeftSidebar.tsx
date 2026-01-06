
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
    <aside className="w-[340px] bg-white border-r border-studio-border flex flex-col z-30 shrink-0">
      <div className="flex border-b border-studio-border shrink-0">
        {(['BACKGROUND', 'DECORATION', 'BRAND'] as SidebarTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab 
                ? 'text-primary bg-primary/5 border-b-2 border-primary' 
                : 'text-studio-sub hover:bg-studio-bg'
            }`}
          >
            {tab === 'BACKGROUND' ? '底纹' : tab === 'DECORATION' ? '装饰库' : '品牌'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {activeTab === 'DECORATION' && (
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">排版组件库</h4>
            <div className="grid grid-cols-1 gap-4">
              {decorationPresets.map((dec) => (
                <button
                  key={dec.id}
                  onClick={() => onInsertDecoration(dec)}
                  className="group relative flex flex-col gap-3 p-4 rounded-[32px] border border-studio-border hover:border-primary hover:shadow-2xl hover:shadow-primary/5 transition-all text-left bg-white"
                >
                  <div className="aspect-[16/7] w-full rounded-2xl overflow-hidden shadow-sm bg-gray-50/50">
                    {dec.thumbnail}
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[13px] font-black text-studio-dark">{dec.name}</span>
                    {dec.isVip && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg text-[9px] font-black italic uppercase tracking-tighter">VIP</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'BACKGROUND' && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">画布底纹</h4>
            <div className="grid grid-cols-1 gap-4">
              {bgPresets.map((bg) => (
                <button
                  key={bg.id}
                  onClick={() => setActiveBg(bg)}
                  className={`flex items-center gap-4 p-3 rounded-[32px] border transition-all ${
                    activeBg.id === bg.id ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-studio-border hover:bg-studio-bg'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                    {bg.thumbnail}
                  </div>
                  <span className="text-[12px] font-black">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'BRAND' && (
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">个人与工作区品牌</h4>
            {brandPresets.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setActiveBrand(brand)}
                className={`w-full flex items-center gap-4 p-4 rounded-[32px] border transition-all ${
                  activeBrand.id === brand.id ? 'border-primary bg-primary/5' : 'border-studio-border hover:bg-studio-bg'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  {brand.thumbnail}
                </div>
                <span className="text-sm font-black">{brand.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSidebar;
