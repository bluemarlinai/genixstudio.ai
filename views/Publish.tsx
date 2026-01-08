
import React, { useState } from 'react';

interface PublishProps {
  content: string;
  title: string;
  onBack: () => void;
  onSuccess: () => void;
}

const Publish: React.FC<PublishProps> = ({ content, title, onBack, onSuccess }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedTime, setSelectedTime] = useState('now');
  const [device, setDevice] = useState<'mobile' | 'pc'>('mobile');
  const [copyStatus, setCopyStatus] = useState<'IDLE' | 'COPIED' | 'ERROR'>('IDLE');

  const handleFinalPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onSuccess();
    }, 2000);
  };

  /**
   * 针对微信/头条的超强兼容性内联处理函数
   */
  const processHtmlForWechat = (rawHtml: string, articleTitle: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    
    // 基础排版规范（微信标准）
    const styleMap: Record<string, string> = {
      'h1': 'font-size: 26px; font-weight: bold; color: #1e293b; margin: 30px 0 15px; line-height: 1.4; text-align: left;',
      'h2': 'font-size: 20px; font-weight: bold; color: #1e293b; margin: 25px 0 12px; line-height: 1.4; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;',
      'h3': 'font-size: 18px; font-weight: bold; color: #334155; margin: 20px 0 10px; line-height: 1.4;',
      'p': 'font-size: 16px; line-height: 1.75; color: #3f3f3f; margin: 16px 0; word-wrap: break-word;',
      'blockquote': 'border-left: 4px solid #137fec; padding: 15px 20px; background-color: #f8fafc; color: #64748b; margin: 20px 0; border-radius: 4px; font-style: italic;',
      'strong': 'color: #137fec; font-weight: bold;',
      'img': 'max-width: 100% !important; height: auto !important; border-radius: 12px; display: block; margin: 20px auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1);',
      'ul': 'list-style-type: disc; margin: 16px 0; padding-left: 20px;',
      'li': 'margin-bottom: 8px; font-size: 15px; color: #4b5563;'
    };

    // 遍历所有元素并注入样式
    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      
      // 1. 应用标签基础样式
      let finalStyle = styleMap[tagName] || '';
      
      // 2. 特殊处理：装饰块 (decoration-block)
      // 这些块自带了 style 属性（如背景和边框），我们需要保留它们并合并
      if (el.classList.contains('decoration-block')) {
        const existingStyle = el.getAttribute('style') || '';
        // 将 div 转换为微信更喜欢的 section 标签
        const section = doc.createElement('section');
        section.innerHTML = el.innerHTML;
        section.setAttribute('style', `display: block; box-sizing: border-box; ${existingStyle}`);
        el.parentNode?.replaceChild(section, el);
      } else {
        // 合并原有样式
        const existingStyle = el.getAttribute('style') || '';
        el.setAttribute('style', `${finalStyle} ${existingStyle} box-sizing: border-box;`.trim());
      }
    });

    // 组装最终结果，增加微信专用的外层容器保护
    return `
      <section style="font-family: -apple-system-font,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial,sans-serif; letter-spacing: 0.034em; padding: 20px; box-sizing: border-box; color: #333;">
        <h1 style="${styleMap['h1']} font-size: 28px;">${articleTitle}</h1>
        <section style="margin-top: 20px;">
          ${doc.body.innerHTML}
        </section>
        <section style="margin-top: 50px; text-align: center; color: #888; font-size: 12px; opacity: 0.5;">
          本文由 Genix Studio 驱动排版设计
        </section>
      </section>
    `;
  };

  const handleCopyArticle = async () => {
    try {
      // 执行样式内联化处理
      const processedHtml = processHtmlForWechat(content, title);
      const plainText = title + '\n\n' + content.replace(/<[^>]*>/g, '');

      // 执行富文本拷贝
      const htmlBlob = new Blob([processedHtml], { type: 'text/html' });
      const textBlob = new Blob([plainText], { type: 'text/plain' });
      
      const data = [new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': textBlob,
      })];

      await navigator.clipboard.write(data);
      setCopyStatus('COPIED');
      setTimeout(() => setCopyStatus('IDLE'), 3000);
    } catch (err) {
      console.error('Copy failed:', err);
      setCopyStatus('ERROR');
      setTimeout(() => setCopyStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-studio-bg z-[70] flex flex-col font-sans overflow-hidden">
      {/* Top Bar */}
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
            {title || '预览与发布设置'}
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
        {/* Preview Panel */}
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
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                  <ArticlePreviewContent mode="mobile" content={content} title={title} />
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
                     <span className="text-[10px] text-studio-sub">genixstudio.ai/p/preview-content</span>
                  </div>
                </div>
                <div className="flex-1 p-12 overflow-y-auto">
                  <ArticlePreviewContent mode="pc" content={content} title={title} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Distribution Sidebar */}
        <aside className="w-[400px] bg-white border-l border-studio-border flex flex-col overflow-y-auto p-8 space-y-8 shadow-2xl">
          <section className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">发布策略</h3>
            <div className="grid grid-cols-1 gap-3">
              {/* 一键拷贝按钮：核心功能 */}
              <button 
                onClick={handleCopyArticle}
                className={`w-full p-6 rounded-3xl border transition-all flex flex-col gap-2 relative overflow-hidden group ${
                  copyStatus === 'COPIED' ? 'border-green-500 bg-green-50 ring-4 ring-green-100' : 'border-primary bg-primary/[0.02] hover:bg-primary/[0.05] ring-4 ring-primary/5'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${copyStatus === 'COPIED' ? 'bg-green-500 text-white' : 'bg-primary text-white shadow-lg shadow-primary/20'}`}>
                      <span className="material-symbols-outlined text-[24px]">{copyStatus === 'COPIED' ? 'check_circle' : 'content_paste_go'}</span>
                    </div>
                    <div className="text-left">
                      <span className={`text-sm font-black block ${copyStatus === 'COPIED' ? 'text-green-700' : 'text-primary'}`}>
                        {copyStatus === 'COPIED' ? '已成功复制富文本' : '一键拷贝至微信/头条'}
                      </span>
                      <p className="text-[10px] text-studio-sub font-bold uppercase tracking-tighter">完全适配微信排版引擎</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-primary/10 w-full flex items-center justify-between">
                   <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Inline Style Mode</span>
                   <span className="material-symbols-outlined text-[16px] text-primary/40">verified</span>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button 
                  onClick={() => setSelectedTime('now')}
                  className={`p-4 rounded-2xl border transition-all text-left ${selectedTime === 'now' ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-studio-border bg-white hover:bg-studio-bg'}`}
                >
                  <span className="material-symbols-outlined block mb-2 text-primary">bolt</span>
                  <span className="text-[11px] font-black uppercase tracking-widest block">自动同步</span>
                </button>
                <button 
                  onClick={() => setSelectedTime('scheduled')}
                  className={`p-4 rounded-2xl border transition-all text-left ${selectedTime === 'scheduled' ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-studio-border bg-white hover:bg-studio-bg'}`}
                >
                  <span className="material-symbols-outlined block mb-2 text-studio-sub">calendar_today</span>
                  <span className="text-[11px] font-black uppercase tracking-widest block">定时发布</span>
                </button>
              </div>
            </div>
          </section>

          <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
               <span className="material-symbols-outlined text-[20px]">verified</span>
               <span className="text-[10px] font-black uppercase tracking-widest">排版兼容性报告</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
              我们已针对微信公众号完成 <b>12 项样式兼容性注入</b>。复制后直接在微信编辑器中粘贴，即可完美还原所有背景、边框及金句组件。
            </p>
          </div>

          <div className="pt-4 border-t border-studio-border">
            <button 
              onClick={handleFinalPublish}
              disabled={isPublishing}
              className="w-full py-5 bg-studio-dark text-white rounded-[28px] font-black shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="uppercase tracking-widest">云端分发中...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">rocket_launch</span>
                  <span className="uppercase tracking-widest text-sm">确认多平台发布</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ArticlePreviewContent: React.FC<{ mode: 'mobile' | 'pc', content: string, title: string }> = ({ mode, content, title }) => {
  const isMobile = mode === 'mobile';
  return (
    <div className={`animate-in fade-in duration-500 ${isMobile ? '' : 'max-w-3xl mx-auto'}`}>
      <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
        <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-md">
          正式预览 · 兼容微信引擎
        </span>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-5xl'} font-black text-studio-dark mt-4 leading-tight tracking-tight`}>
          {title || '未命名文章'}
        </h1>
        <div className={`flex items-center gap-3 ${isMobile ? 'mt-4' : 'mt-8 pb-8 border-b border-studio-border'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-200 bg-cover" style={{backgroundImage: 'url("https://picsum.photos/seed/user/50/50")'}}></div>
          <div>
            <p className="text-xs font-bold text-studio-dark">Alex Chen</p>
            <p className="text-[10px] text-studio-sub uppercase tracking-wider">2024.03.21 · 5分钟阅读</p>
          </div>
        </div>
      </div>

      <div 
        className={`prose ${isMobile ? 'prose-sm' : 'prose-lg'} prose-blue max-w-none rendered-content`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Publish;
