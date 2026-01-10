
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';

import { BackgroundPreset, BrandPreset, SidebarTab } from '../components/editor/EditorTypes';
import { bgPresets, decorationPresets, brandPresets, snippetPresets } from '../components/editor/EditorData';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import EditorWorkspace from '../components/editor/EditorWorkspace';

const Div = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() { return { class: { default: null }, style: { default: null } }; },
  parseHTML() { 
    return [{ 
      tag: 'div',
      priority: 51,
      getAttrs: node => (node as HTMLElement).classList.contains('ProseMirror-trailingCursor') ? false : null,
    }]; 
  },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes), 0]; },
});

const Span = Node.create({
  name: 'span',
  group: 'inline',
  inline: true,
  content: 'text*', 
  addAttributes() { return { class: { default: null }, style: { default: null } }; },
  parseHTML() { return [{ tag: 'span' }]; },
  renderHTML({ HTMLAttributes }) { return ['span', mergeAttributes(HTMLAttributes), 0]; },
});

const Image = Node.create({
  name: 'image',
  group: 'block',
  inline: false,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      style: { default: null },
      class: { default: null },
    };
  },
  parseHTML() { return [{ tag: 'img' }]; },
  renderHTML({ HTMLAttributes }) { return ['img', mergeAttributes(HTMLAttributes)]; },
});

interface EditorProps {
  onBack: () => void;
  onPublish: (content: string, title: string, bg: BackgroundPreset, brand: BrandPreset) => void;
  onNavigateUpgrade: () => void;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('🎨太酷啦！NotebookLM生成PPT也太丝滑了！这效果直接拿去毕业答辩/路演，稳了！🏆');
  const [summary, setSummary] = useState('深度测评 Google 最新黑科技 NotebookLM 的 PPT 自动化生成能力...');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[1]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[0]);

  const toggleZenMode = () => {
    setIsLeftCollapsed(!isLeftCollapsed);
    setIsRightCollapsed(!isRightCollapsed);
  };

  const longContent = `
    <div class="article-meta" style="margin-bottom: 32px; font-family: -apple-system-font, system-ui, sans-serif;">
      <p style="margin: 0; font-size: 15px; color: #888888; letter-spacing: 0.5px; line-height: 1.4;">
        GENIX INSIGHTS <span style="margin: 0 4px; color: #576b95; font-weight: 500;">老李的AI江湖</span>
      </p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #b2b2b2; line-height: 1.4;">2026年1月10日 12:32</p>
    </div>

    <p style="text-align: center; color: #1e293b; font-weight: 700; letter-spacing: 0.15em; font-size: 13px; margin: 40px 0 20px; text-transform: uppercase;">TECH REVIEW • AI PRODUCTIVITY • 2024</p>
    
    <p style="line-height: 1.8; letter-spacing: 0.03em; margin-bottom: 24px; color: #333;">最近不少小伙伴被 Google 的 <strong>NotebookLM</strong> 刷屏了，但绝大多数人只停留在“播客生成”和“文档摘要”上。其实，它隐藏的 <strong>PPT 结构化生成能力</strong> 才是真正的效率核武！</p>
    
    <div class="decoration-block" style="margin: 40px 0; padding: 40px 24px; border-radius: 24px; border: 1px dashed #137fec30; background: rgba(19, 127, 236, 0.02); text-align: center; position: relative; box-sizing: border-box;">
      <div style="font-size: 32px; color: #137fec; opacity: 0.3; margin-bottom: 16px; font-weight: 900; line-height: 1;">✨</div>
      <p style="font-size: 18px; font-weight: 700; color: #333; line-height: 1.6; margin: 0; letter-spacing: -0.01em;">“以前做一个毕业答辩 PPT 要掉半层皮，现在我把论文丢进去，NotebookLM 直接给了我整套逻辑骨架，丝滑得不像话。”</p>
    </div>
  `;

  const editor = useEditor({
    extensions: [
      StarterKit, Bold, Italic, Strike, Code, BubbleMenu,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList, OrderedList, ListItem, Blockquote, HorizontalRule,
      Div, Span, Image, 
      Placeholder.configure({ placeholder: '在此处落笔您的灵感...' })
    ],
    content: longContent,
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg transition-colors text-studio-sub"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
          <div className="h-4 w-px bg-studio-border"></div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none text-[11px] font-black text-studio-dark w-[450px] focus:ring-0 p-0" placeholder="文章标题..." />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
           <button onClick={toggleZenMode} className={`flex items-center gap-2 px-5 py-1.5 rounded-full border transition-all duration-500 hover:scale-[1.03] active:scale-95 group ${isLeftCollapsed && isRightCollapsed ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' : 'bg-white text-studio-sub border-studio-border hover:text-primary hover:border-primary/20'}`}>
             <span className="material-symbols-outlined text-[18px] transition-transform duration-500 group-hover:rotate-180">{isLeftCollapsed && isRightCollapsed ? 'fullscreen_exit' : 'fullscreen'}</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden md:block">{isLeftCollapsed && isRightCollapsed ? '退出全屏' : '禅定模式'}</span>
           </button>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onPublish(editor?.getHTML() || '', title, activeBg, activeBrand)} className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest">
            预览并发布文章
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-studio-border bg-white ${isLeftCollapsed ? 'w-0 opacity-0' : 'w-[240px] opacity-100'}`}>
          <LeftSidebar 
            activeTab={activeTab} setActiveTab={setActiveTab}
            bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
            decorationPresets={decorationPresets} onInsertDecoration={(p) => editor?.chain().focus().insertContent(p.template).run()}
            brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
            snippetPresets={snippetPresets} onInsertSnippet={(s) => {
              if (!editor) return;
              const cleanContent = s.content.replace(/>\s+</g, '><'); 
              if (s.type === 'HEADER') editor.chain().focus().insertContentAt(0, cleanContent).run();
              else editor.chain().focus().insertContentAt(editor.state.doc.content.size, cleanContent).run();
            }}
          />
        </div>
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
           <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden border-l border-studio-border bg-white ${isRightCollapsed ? 'w-0 opacity-0' : 'w-[260px] opacity-100'}`}>
          <RightSidebar 
            coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}}
            summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorView;
