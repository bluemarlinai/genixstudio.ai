
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes, Extension } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

import { BackgroundPreset, BrandPreset, SidebarTab } from '../components/editor/EditorTypes';
import { bgPresets, decorationPresets, brandPresets, snippetPresets } from '../components/editor/EditorData';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import EditorWorkspace from '../components/editor/EditorWorkspace';

// Define the interface for the Editor component props
interface EditorProps {
  onBack: () => void;
  onPublish: (content: string, title: string, bg: BackgroundPreset, brand: BrandPreset) => void;
  onNavigateUpgrade: () => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType,
      unsetFontSize: () => ReturnType,
    }
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
          renderHTML: attributes => {
            if (!attributes.fontSize) return {};
            return { style: `font-size: ${attributes.fontSize}` };
          },
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => (chain() as any).setMark('textStyle', { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => (chain() as any).setMark('textStyle', { fontSize: null }).run(),
    };
  },
});

const Section = Node.create({
  name: 'section',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() { return { style: { default: null }, class: { default: null } }; },
  parseHTML() { return [{ tag: 'section' }]; },
  renderHTML({ HTMLAttributes }) { return ['section', mergeAttributes(HTMLAttributes), 0]; },
});

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('🎨 深度测评：NotebookLM 彻底改变了我的 PPT 生产流！');
  const [summary, setSummary] = useState('从结构化笔记到高保真演示文稿，NotebookLM 不仅仅是搜索，更是创作大脑...');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  const [isZenMode, setIsZenMode] = useState(false);
  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[1]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[0]);

  const editor = useEditor({
    extensions: [
      StarterKit, Underline, TextStyle, Color, FontFamily, FontSize, Section,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: '在此处落笔您的灵感...' })
    ],
    content: `
      <section style="margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        <p style="margin: 0; font-size: 13px; color: #137fec; font-weight: 800; letter-spacing: 2px;">GENIX INSIGHTS / 深度测评</p>
      </section>

      <h1 style="font-size: 32px; font-weight: 900; line-height: 1.3; color: #1a1a1a;">NotebookLM 如何重构 PPT 生产力？</h1>
      
      <p>最近不少小伙伴被 Google 的 <strong>NotebookLM</strong> 刷屏了。大部分人把它当作“PDF 总结神器”，但经过一周的深度压榨，我发现它隐藏的 <strong>PPT 结构化生成能力</strong> 才是真正的效率核武！</p>
      
      <section style="margin: 30px 0; padding: 25px; background: #f8fafc; border-left: 5px solid #137fec; border-radius: 12px;">
        <h4 style="margin: 0 0 10px; font-weight: 900; color: #1e293b; font-size: 16px;">核心结论</h4>
        <p style="margin: 0; font-size: 15px; color: #64748b; line-height: 1.6;">AI 时代的创作流应该是“对话-结构化-可视化”。NotebookLM 完美填补了从碎片知识到演示文稿之间的空白。</p>
      </section>

      <h2 style="color: #137fec; font-size: 24px; font-weight: 800; margin-top: 40px;">数据对比：传统 vs AI</h2>
      
      <section style="margin: 25px 0; display: flex; gap: 15px; flex-wrap: wrap;">
        <section style="flex: 1; min-width: 140px; background: #fff; padding: 20px; border-radius: 15px; border: 1px solid #e2e8f0; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #64748b; font-weight: 800;">手动效率</p>
          <p style="margin: 5px 0 0; font-size: 28px; font-weight: 900; color: #94a3b8;">100%</p>
        </section>
        <section style="flex: 1; min-width: 140px; background: #fff; padding: 20px; border-radius: 15px; border: 2px solid #137fec; text-align: center; box-shadow: 0 10px 15px -3px rgba(19,127,236,0.1);">
          <p style="margin: 0; font-size: 11px; color: #137fec; font-weight: 800;">AI 协同</p>
          <p style="margin: 5px 0 0; font-size: 28px; font-weight: 900; color: #137fec;">450%</p>
        </section>
      </section>

      <h2 style="color: #137fec; font-size: 24px; font-weight: 800; margin-top: 40px;">结语</h2>
      <p>技术不应该增加焦虑。NotebookLM 负责逻辑，Genix 负责审美，而你只负责感受创作的快感。</p>

      <section style="margin-top: 80px; padding: 40px 20px; background: #f8fafc; border-radius: 30px; text-align: center; border: 1px solid #f0f2f4;">
        <section style="width: 120px; height: 120px; background: #fff; margin: 0 auto 15px; padding: 8px; border: 1px solid #eee; border-radius: 15px; box-sizing: border-box; overflow: hidden;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GenixStudio" style="width: 100%; height: 100%; object-fit: contain; display: block;" />
        </section>
        <p style="margin: 0; font-size: 16px; font-weight: 900; color: #137fec;">关注“老李的AI实验室”</p>
        <p style="margin: 5px 0 0; font-size: 12px; color: #64748b;">回复“PPT”获取本期完整模板</p>
        <p style="margin: 25px 0 0; font-size: 10px; color: #cbd5e1; font-weight: 800; letter-spacing: 3px; text-transform: uppercase;">POWERED BY GENIX STUDIO</p>
      </section>
    `,
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg text-studio-sub"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
          <div className="h-4 w-px bg-studio-border"></div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none text-[12px] font-black text-studio-dark w-[400px] focus:ring-0 p-0" />
        </div>
        <div className="flex items-center gap-3">
          {/* 恢复经典胶囊样式按钮 */}
          <button 
            onClick={() => setIsZenMode(!isZenMode)} 
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all font-black text-[9px] uppercase tracking-widest border ${isZenMode ? 'text-primary bg-primary/10 border-primary/20 ring-4 ring-primary/5' : 'text-studio-sub hover:bg-studio-bg border-transparent'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{isZenMode ? 'self_improvement' : 'fullscreen'}</span>
            {isZenMode ? '禅意模式中' : '沉浸写作'}
          </button>
          <button onClick={() => onPublish(editor?.getHTML() || '', title, activeBg, activeBrand)} className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg hover:scale-105 transition-all">
            预览发布
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className={`transition-all duration-500 ease-in-out border-r border-studio-border bg-white ${isZenMode ? 'w-0 opacity-0 -translate-x-10' : 'w-[240px] opacity-100'}`}>
          <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg} decorationPresets={decorationPresets} onInsertDecoration={(p) => editor?.chain().focus().insertContent(p.template).run()} brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand} snippetPresets={snippetPresets} onInsertSnippet={(s) => { if (!editor) return; if (s.type === 'HEADER') editor.chain().focus().insertContentAt(0, s.content).run(); else editor.chain().focus().insertContentAt(editor.state.doc.content.size, s.content).run(); }} />
        </div>
        
        <div className="flex-1 flex flex-col items-center overflow-hidden">
           <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        </div>

        <div className={`transition-all duration-500 ease-in-out border-l border-studio-border bg-white ${isZenMode ? 'w-0 opacity-0 translate-x-10' : 'w-[260px] opacity-100'}`}>
          <RightSidebar coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}} summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default EditorView;