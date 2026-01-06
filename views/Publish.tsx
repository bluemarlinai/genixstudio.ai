import React, { useState } from 'react';

interface PublishProps {
  onBack: () => void;
  onSuccess: () => void;
}

const Publish: React.FC<PublishProps> = ({ onBack, onSuccess }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedTime, setSelectedTime] = useState('now');
  const [device, setDevice] = useState<'mobile' | 'pc'>('mobile');

  const handleFinalPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-studio-bg z-[70] flex flex-col font-sans overflow-hidden">
      {/* Enhanced Top Bar */}
      <header className="h-16 px-6 bg-white border-b border-studio-border flex items-center justify-between shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-studio-sub hover:text-studio-dark transition-colors group"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            返回编辑
          </button>
          <div className="w-px h-6 bg-studio-border"></div>
          <h1 className="text-sm font-black text-studio-dark truncate max-w-xs uppercase tracking-widest">
            预览与发布设置
          </h1>
        </div>

        <div className="flex items-center gap-1 bg-studio-bg p-1 rounded-2xl border border-studio-border">
          <button 
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${device === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}
          >
            <span className="material-symbols-outlined text-[18px]">smartphone</span>
            移动端
          </button>
          <button 
            onClick={() => setDevice('pc')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${device === 'pc' ? 'bg-white text-primary shadow-sm' : 'text-studio-sub hover:text-studio-dark'}`}
          >
            <span className="material-symbols-outlined text-[18px]">laptop</span>
            桌面端
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleFinalPublish}
            disabled={isPublishing}
            className="px-8 py-2.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
          >
            {isPublishing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
            )}
            确认分发
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Device Preview Container */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 flex justify-center bg-studio-bg relative">
          <div className={`transition-all duration-700 ease-in-out ${device === 'mobile' ? 'w-[375px] h-[760px] rounded-[50px] border-[12px] border-studio-dark shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white overflow-hidden sticky top-0' : 'w-full max-w-4xl h-fit min-h-[600px] rounded-3xl border border-studio-border bg-white shadow-2xl overflow-hidden'}`}>
            
            {device === 'mobile' ? (
              <div className="h-full flex flex-col relative rounded-[38px]">
                <div className="h-10 w-full bg-white flex justify-between items-center px-8 shrink-0">
                  <span className="text-[10px] font-bold">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                    <span className="material-symbols-outlined text-[14px]">wifi</span>
                    <span className="material-symbols-outlined text-[14px]">battery_full</span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  <ArticlePreviewContent mode="mobile" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full bg-white">
                <div className="h-10 bg-studio-bg border-b border-studio-border flex items-center px-4 gap-2 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="flex-1 mx-4 h-6 bg-white rounded-lg border border-studio-border flex items-center px-3 gap-2">
                     <span className="material-symbols-outlined text-[14px] text-studio-sub">lock</span>
                     <span className="text-[10px] text-studio-sub">genixstudio.ai/p/ai-future-writing</span>
                  </div>
                </div>
                <div className="flex-1 p-12 overflow-y-auto">
                  <ArticlePreviewContent mode="pc" />
                </div>
              </div>
            )}
          </div>

          <div className="hidden xl:block absolute left-12 top-1/2 -translate-y-1/2 space-y-6">
             <div className="p-4 bg-white/60 backdrop-blur rounded-2xl border border-studio-border shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">渲染环境</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs font-bold text-studio-dark">实时高保真</span>
                </div>
             </div>
          </div>
        </main>

        {/* Right: Distribution Settings Panel */}
        <aside className="w-[400px] bg-white border-l border-studio-border flex flex-col overflow-y-auto p-8 space-y-8 shadow-2xl">
          <section className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">发布平台</h3>
            <div className="space-y-3">
              {[
                { name: '微信公众号', status: 'ready', icon: 'chat', color: 'text-green-600' },
                { name: 'Medium', status: 'ready', icon: 'article', color: 'text-black' },
                { name: '知乎', status: 'ready', icon: 'school', color: 'text-blue-600' }
              ].map((plat, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-primary/10 bg-primary/[0.02] hover:bg-primary/[0.05] transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-white border border-studio-border flex items-center justify-center ${plat.color}`}>
                      <span className="material-symbols-outlined">{plat.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-studio-dark">{plat.name}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">发布策略</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelectedTime('now')}
                className={`p-4 rounded-2xl border transition-all text-left ${selectedTime === 'now' ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-studio-border bg-white hover:bg-studio-bg'}`}
              >
                <span className="material-symbols-outlined block mb-2 text-primary">bolt</span>
                <span className="text-sm font-bold block">立即发布</span>
              </button>
              <button 
                onClick={() => setSelectedTime('scheduled')}
                className={`p-4 rounded-2xl border transition-all text-left ${selectedTime === 'scheduled' ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-studio-border bg-white hover:bg-studio-bg'}`}
              >
                <span className="material-symbols-outlined block mb-2 text-studio-sub">schedule</span>
                <span className="text-sm font-bold block">定时发布</span>
              </button>
            </div>
            {selectedTime === 'scheduled' && (
              <div className="p-4 bg-studio-bg rounded-2xl border border-studio-border animate-in fade-in slide-in-from-top-2">
                <input type="datetime-local" className="w-full bg-transparent border-none text-sm font-bold focus:ring-0" />
              </div>
            )}
          </section>

          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
               <span className="material-symbols-outlined text-[20px]">info</span>
               <span className="text-xs font-black uppercase tracking-widest">发布须知</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              系统将根据各平台的排版引擎自动适配您的样式装饰。发布后约 3-5 分钟可在对应平台查看。
            </p>
          </div>

          <div className="pt-4 border-t border-studio-border">
            <button 
              onClick={handleFinalPublish}
              disabled={isPublishing}
              className="w-full py-5 bg-studio-dark text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="uppercase tracking-widest">分发中...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">rocket_launch</span>
                  <span className="uppercase tracking-widest text-sm">开始全平台发布</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ArticlePreviewContent: React.FC<{ mode: 'mobile' | 'pc' }> = ({ mode }) => {
  const isMobile = mode === 'mobile';
  return (
    <div className={`animate-in fade-in duration-500 ${isMobile ? 'p-6' : 'max-w-3xl mx-auto'}`}>
      <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
          深度探索
        </span>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-black text-studio-dark mt-4 leading-tight tracking-tight`}>
          AI 在创意写作中的未来
        </h1>
        <div className={`flex items-center gap-3 ${isMobile ? 'mt-4' : 'mt-8 pb-8 border-b border-studio-border'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-200 bg-cover" style={{backgroundImage: 'url("https://picsum.photos/seed/user/50/50")'}}></div>
          <div>
            <p className="text-xs font-bold text-studio-dark">Alex Chen</p>
            <p className="text-[10px] text-studio-sub uppercase tracking-wider">2024.03.21 · 5分钟阅读</p>
          </div>
        </div>
      </div>

      <div className={`prose ${isMobile ? 'prose-sm' : 'prose-lg'} prose-blue max-w-none`}>
        <p className="text-studio-dark/80 leading-relaxed font-medium">
          人工智能重塑创意表达的格局只是时间问题。从最初简单的预测文本，到现在能够起草整部小说、剧本——正如我们现在所见——以及交互式新闻的复杂模型。
        </p>

        <div className={`my-8 rounded-2xl overflow-hidden shadow-xl ${isMobile ? 'aspect-[4/3]' : 'aspect-video'}`}>
           <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="AI Imagery" />
        </div>

        <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-r-2xl my-8">
           <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2">核心观点</h4>
           <p className="text-sm md:text-base font-bold text-studio-dark leading-relaxed">
             未来的写作将是共生的。创作者提供灵魂与方向，而智能系统则负责结构的优化与表现形式的升华。
           </p>
        </div>

        <p className="text-studio-dark/80 leading-relaxed">
          这种协作并非取代人类，而是增强。通过 AI 对庞大数据集的处理能力，人类作家可以更快速地验证逻辑一致性，探索风格的变体。
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-studio-border flex justify-center gap-6 pb-20">
         <div className="flex flex-col items-center gap-1.5">
            <span className="material-symbols-outlined text-studio-sub hover:text-red-500 cursor-pointer transition-colors">favorite</span>
            <span className="text-[10px] font-bold text-studio-sub">1.2k</span>
         </div>
         <div className="flex flex-col items-center gap-1.5">
            <span className="material-symbols-outlined text-studio-sub hover:text-blue-500 cursor-pointer transition-colors">share</span>
            <span className="text-[10px] font-bold text-studio-sub">分享</span>
         </div>
      </div>
    </div>
  );
};

export default Publish;