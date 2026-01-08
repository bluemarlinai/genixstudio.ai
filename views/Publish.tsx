
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
   * 微信公众号超高保真处理逻辑
   * 修复：标题重复、加粗颜色错位、Padding丢失、边距过大
   */
  const processHtmlForWechat = (rawHtml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    
    // 微信高保真基础样式映射 (调整为更标准的中文字体与颜色)
    const styleMap: Record<string, string> = {
      'h1': 'font-size: 26px; font-weight: bold; color: #1e293b; margin: 25px 0 15px; line-height: 1.5; text-align: left;',
      'h2': 'font-size: 21px; font-weight: bold; color: #1e293b; margin: 22px 0 12px; line-height: 1.5; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;',
      'h3': 'font-size: 18px; font-weight: bold; color: #334155; margin: 18px 0 10px; line-height: 1.5;',
      'p': 'font-size: 16px; line-height: 1.8; color: #333333; margin: 14px 0; word-wrap: break-word; text-align: justify;',
      'blockquote': 'border-left: 3px solid #137fec; padding: 12px 18px; background-color: #f8fafc; color: #666666; margin: 18px 0; border-radius: 6px; font-style: normal;',
      'strong': 'color: #1e293b; font-weight: bold;', // 修复：由蓝改深灰
      'img': 'max-width: 100% !important; height: auto !important; border-radius: 8px; display: block; margin: 15px auto; outline: none;',
      'ul': 'list-style-type: disc; margin: 15px 0; padding-left: 20px;',
      'ol': 'list-style-type: decimal; margin: 15px 0; padding-left: 20px;',
      'li': 'margin-bottom: 8px; font-size: 16px; color: #333333;'
    };

    // 微信渲染核心：将所有 div 转换为 section，这是布局稳定的基石
    const divs = doc.body.querySelectorAll('div');
    divs.forEach(div => {
      const section = doc.createElement('section');
      section.innerHTML = div.innerHTML;
      Array.from(div.attributes).forEach(attr => {
        section.setAttribute(attr.name, attr.value);
      });
      div.parentNode?.replaceChild(section, div);
    });

    // 递归注入内联样式
    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const baseStyle = styleMap[tagName] || '';
      const existingStyle = el.getAttribute('style') || '';
      
      // 核心修复点：
      // 1. 强制 box-sizing
      // 2. 针对 section 注入 overflow: hidden 以触发微信的 padding 解析
      // 3. 强制 width: 100% 防止内容缩窄
      let forcedLayout = 'box-sizing: border-box !important; max-width: 100% !important;';
      
      if (tagName === 'section') {
        forcedLayout += ' display: block; overflow: hidden; width: 100%;';
      } else if (!['strong', 'span', 'em', 'a'].includes(tagName)) {
        forcedLayout += ' display: block;';
      }

      el.setAttribute('style', `${baseStyle}; ${forcedLayout}; ${existingStyle}`.trim());
      el.removeAttribute('class'); // 清理类名防止冲突
    });

    // 组装最终结果
    // 1. 移除 articleTitle (解决标题重复问题)
    // 2. 修正外层容器，解决“缩窄”和“顶部间距过大”
    return `
      <section style="margin: 0 auto; padding: 0; font-family: -apple-system-font,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei UI,Microsoft YaHei,Arial,sans-serif; line-height: 1.8; color: #333; max-width: 100%; box-sizing: border-box;">
        <section style="margin: 0 auto; padding: 15px; width: 100%; box-sizing: border-box !important; overflow: hidden;">
          ${doc.body.innerHTML}
          <section style="margin-top: 40px; text-align: center; color: #bbbbbb; font-size: 11px; letter-spacing: 2px;">
            <p style="margin: 0; opacity: 0.5;">DESIGNED WITH GENIX STUDIO</p>
          </section>
        </section>
      </section>
    `;
  };

  const handleCopyArticle = async () => {
    try {
      // 执行样式修复逻辑
      const processedHtml = processHtmlForWechat(content);
      const plainText = title + '\n\n' + content.replace(/<[^>]*>/g, '');

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
      {/* Enhanced Header */}
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
        {/* Device Preview */}
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

        {/* Action Panel */}
        <aside className="w-[400px] bg-white border-l border-studio-border flex flex-col overflow-y-auto p-8 space-y-8 shadow-2xl">
          <section className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">手动拷贝发布</h3>
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
                        {copyStatus === 'COPIED' ? '已修复排版并复制' : '复制微信/头条富文本'}
                      </span>
                      <p className="text-[10px] text-studio-sub font-bold uppercase tracking-tighter">已修复加粗颜色与内边距</p>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-primary/10 w-full flex items-center justify-between">
                   <span className="text-[9px] font-black text-primary/40 uppercase tracking-widest">Wechat Native Engine</span>
                   <span className="material-symbols-outlined text-[16px] text-primary/40">verified</span>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <button 
                  onClick={() => setSelectedTime('now')}
                  className={`p-4 rounded-2xl border transition-all text-left ${selectedTime === 'now' ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-studio-border bg-white hover:bg-studio-bg'}`}
                >
                  <span className="material-symbols-outlined block mb-2 text-primary">bolt</span>
                  <span className="text-[11px] font-black uppercase tracking-widest block">实时同步</span>
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
               <span className="text-[10px] font-black uppercase tracking-widest">排版兼容性修复</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
              根据您的反馈，我们已<b>移除正文内的重复标题</b>，并将加粗字体回归为<b>专业深灰色</b>。同时优化了容器宽度逻辑，解决了内容被缩窄的问题。
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
                  <span className="uppercase tracking-widest text-sm">发布至已关联平台</span>
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
