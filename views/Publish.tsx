
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
   * 重点修复：Padding 不显示、边框背景丢失、盒模型错乱
   */
  const processHtmlForWechat = (rawHtml: string, articleTitle: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    
    // 微信高保真基础样式映射
    const styleMap: Record<string, string> = {
      'h1': 'font-size: 28px; font-weight: bold; color: #1e293b; margin: 32px 0 20px; line-height: 1.4; text-align: left; letter-spacing: 0.5px;',
      'h2': 'font-size: 22px; font-weight: bold; color: #1e293b; margin: 28px 0 16px; line-height: 1.4; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;',
      'h3': 'font-size: 19px; font-weight: bold; color: #334155; margin: 24px 0 12px; line-height: 1.4;',
      'p': 'font-size: 16px; line-height: 1.8; color: #3f3f3f; margin: 16px 0; word-wrap: break-word; text-align: justify;',
      'blockquote': 'border-left: 4px solid #137fec; padding: 16px 20px; background-color: #f8fafc; color: #64748b; margin: 24px 0; border-radius: 8px; font-style: italic;',
      'strong': 'color: #137fec; font-weight: bold;',
      'img': 'max-width: 100% !important; height: auto !important; border-radius: 12px; display: block; margin: 24px auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); outline: none;',
      'ul': 'list-style-type: disc; margin: 18px 0; padding-left: 25px;',
      'ol': 'list-style-type: decimal; margin: 18px 0; padding-left: 25px;',
      'li': 'margin-bottom: 10px; font-size: 16px; color: #4b5563;'
    };

    // 微信兼容性：将所有 div 标签重写为 section
    const divs = doc.body.querySelectorAll('div');
    divs.forEach(div => {
      const section = doc.createElement('section');
      section.innerHTML = div.innerHTML;
      // 拷贝所有属性，尤其是 style 和 class
      Array.from(div.attributes).forEach(attr => {
        section.setAttribute(attr.name, attr.value);
      });
      div.parentNode?.replaceChild(section, div);
    });

    // 递归遍历所有元素注入内联样式
    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const baseStyle = styleMap[tagName] || '';
      const existingStyle = el.getAttribute('style') || '';
      
      // 核心修复点：强制注入 display: block 和 box-sizing，确保 padding 生效
      let forcedLayout = 'display: block; box-sizing: border-box !important;';
      
      // 如果是行内元素（如 strong, span），不需要强制块级
      if (['strong', 'span', 'em', 'a'].includes(tagName)) {
        forcedLayout = 'box-sizing: border-box !important;';
      }

      // 合并样式：基础样式 + 强制布局 + 原始样式
      // 将原始样式放在最后，以确保用户的自定义背景/边框/内边距覆盖默认值
      el.setAttribute('style', `${baseStyle}; ${forcedLayout}; ${existingStyle}`.trim());
      
      // 针对微信的特殊处理：清除所有 class 以防干扰
      el.removeAttribute('class');
    });

    // 组装最终结果，增加微信专用的外层容器保护（使用 section 替代 div）
    return `
      <section style="font-family: -apple-system-font,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial,sans-serif; letter-spacing: 0.034em; padding: 20px; box-sizing: border-box; color: #333; line-height: 1.8; background-color: #ffffff;">
        <section style="max-width: 100%; box-sizing: border-box !important;">
          <h1 style="${styleMap['h1']} font-size: 30px; margin-bottom: 30px;">${articleTitle}</h1>
          <section style="margin-top: 20px; box-sizing: border-box !important;">
            ${doc.body.innerHTML}
          </section>
          <section style="margin-top: 60px; text-align: center; color: #adb5bd; font-size: 12px; letter-spacing: 1px;">
            <p style="margin: 0; opacity: 0.6;">CREATED BY GENIX STUDIO</p>
          </section>
        </section>
      </section>
    `;
  };

  const handleCopyArticle = async () => {
    try {
      // 执行深度内联处理
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
            {title || '发布预览'}
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
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">拷贝并手动发布</h3>
            <div className="grid grid-cols-1 gap-3">
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
                        {copyStatus === 'COPIED' ? '复制成功！请直接粘贴' : '复制微信/头条富文本'}
                      </span>
                      <p className="text-[10px] text-studio-sub font-bold uppercase tracking-tighter">已修复内边距(Padding)与盒模型</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-primary/10 w-full flex items-center justify-between">
                   <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Deep Inline Mode</span>
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
                  <span className="text-[11px] font-black uppercase tracking-widest block">定时排期</span>
                </button>
              </div>
            </div>
          </section>

          <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 space-y-3">
            <div className="flex items-center gap-2 text-blue-600">
               <span className="material-symbols-outlined text-[20px]">info</span>
               <span className="text-[10px] font-black uppercase tracking-widest">为什么需要“一键复制”？</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
              微信公众号的编辑器会过滤大部分网页代码。我们通过“深层内联转换器”将 <b>Padding</b>、<b>Border-radius</b> 和 <b>Box-shadow</b> 直接注入 HTML 属性中，确保在任何平台粘贴都能获得 1:1 的视觉还原。
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
                  <span className="uppercase tracking-widest">正在分发至各平台...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">rocket_launch</span>
                  <span className="uppercase tracking-widest text-sm">确认多端发布</span>
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
