
import React, { useEffect, useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { BackgroundPreset, BrandPreset } from './EditorTypes';

interface HeadingItem {
  text: string;
  level: number;
  id: string;
}

interface EditorWorkspaceProps {
  editor: Editor | null;
  activeBg: BackgroundPreset;
  activeBrand: BrandPreset;
}

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  editor,
  activeBg,
  activeBrand,
}) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  // 动态提取标题
  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const text = node.textContent;
          const level = node.attrs.level;
          const id = `heading-${pos}`;
          if (text) {
            items.push({ text, level, id });
          }
        }
      });
      setHeadings(items);
    };

    editor.on('update', updateHeadings);
    updateHeadings(); // 初始提取

    return () => {
      editor.off('update', updateHeadings);
    };
  }, [editor]);

  if (!editor) return null;

  const scrollToHeading = (index: number) => {
    const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3');
    if (headingNodes[index]) {
      headingNodes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const ToolbarButton = ({ onClick, isActive = false, icon, label }: any) => (
    <button 
      onClick={onClick} 
      className={`p-1.5 rounded-md transition-all flex items-center gap-1 ${isActive ? 'bg-primary/10 text-primary shadow-sm' : 'hover:bg-studio-bg text-studio-sub'}`}
      title={label}
    >
      <span className="material-symbols-outlined text-[17px]">{icon}</span>
    </button>
  );

  return (
    <section className="flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pb-32 pt-6 relative px-10 md:px-20">
      {/* 智能悬浮目录 (TOC) - 修复遮挡：增加 z-30 层级和强阴影 */}
      <div className="fixed left-[254px] top-[100px] w-52 hidden xl:block z-30 animate-in slide-in-from-left-8 duration-1000 ease-out">
        <div className="bg-white/80 backdrop-blur-2xl border border-studio-border rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03] space-y-5">
          <div className="flex items-center gap-2 border-b border-studio-border pb-4">
            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] text-primary">toc</span>
            </div>
            <span className="text-[10px] font-black text-studio-dark uppercase tracking-[0.2em]">文章大纲</span>
          </div>
          
          <div className="max-h-[50vh] overflow-y-auto scrollbar-hide space-y-4">
            {headings.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-[9px] text-studio-sub font-medium italic">等待输入标题...</p>
              </div>
            ) : (
              headings.map((h, i) => (
                <button
                  key={h.id}
                  onClick={() => scrollToHeading(i)}
                  className={`block text-left hover:translate-x-1 transition-all group w-full ${
                    h.level === 1 ? 'pl-0' : 'pl-3'
                  }`}
                >
                  <p className={`truncate leading-relaxed ${
                    h.level === 1 
                      ? 'text-[11px] font-black text-studio-dark group-hover:text-primary' 
                      : 'text-[10px] font-bold text-studio-sub group-hover:text-studio-dark border-l-2 border-transparent group-hover:border-primary/30 pl-2'
                  }`}>
                    {h.text}
                  </p>
                </button>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-studio-border">
            <div className="flex items-center justify-between text-[8px] font-black text-studio-sub uppercase tracking-widest">
              <span>阅读进度</span>
              <span className="text-primary">{Math.min(100, Math.round((headings.length / 8) * 100))}%</span>
            </div>
            <div className="h-1 w-full bg-studio-bg rounded-full mt-2 overflow-hidden">
               <div 
                className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_8px_rgba(19,127,236,0.4)]" 
                style={{ width: `${Math.min(100, (headings.length / 8) * 100)}%` }}
               ></div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT FLOATING TOOLBAR */}
      <div className="sticky top-0 mb-8 flex items-center gap-1 bg-white border border-studio-border rounded-xl p-1 shadow-[0_15px_30px_rgba(0,0,0,0.08)] z-[100] ring-1 ring-black/5 shrink-0">
        <div className="flex items-center px-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
        </div>
        
        <div className="w-px h-3.5 bg-studio-border mx-0.5"></div>
        
        <div className="flex items-center">
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
            className={`px-2 py-1 rounded-md text-[8px] font-black ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'text-studio-sub hover:bg-studio-bg'}`}
          >H1</button>
          <button 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            className={`px-2 py-1 rounded-md text-[8px] font-black ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'text-studio-sub hover:bg-studio-bg'}`}
          >H2</button>
        </div>

        <div className="w-px h-3.5 bg-studio-border mx-0.5"></div>

        <div className="flex items-center">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" label="列表" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" label="引用" />
        </div>

        <div className="w-px h-3.5 bg-studio-border mx-0.5"></div>

        <div className="flex items-center gap-1 px-1">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[8px] font-black hover:bg-indigo-100 transition-all uppercase tracking-widest">
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            润色
          </button>
          <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600">
            <span className="material-symbols-outlined text-[17px]">add_photo_alternate</span>
          </button>
        </div>
      </div>

      {/* ARTICLE CANVAS */}
      <div 
        className={`w-full max-w-[720px] rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-studio-border relative transition-all duration-500 ease-in-out flex flex-col mb-20 z-10 ${activeBg.class || ''}`}
        style={{
          ...activeBg.style,
          backgroundRepeat: 'repeat',
          backgroundSize: activeBg.style?.backgroundImage && !activeBg.style?.backgroundSize ? 'cover' : activeBg.style?.backgroundSize || 'auto',
          backgroundAttachment: 'scroll'
        }}
      >
        {/* Decor: Brand & Labels */}
        <div className="sticky top-0 z-20 pointer-events-none overflow-visible">
          {activeBrand.component}
          <div className="absolute top-8 left-10 flex items-center gap-2 select-none">
             <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
             <span className="text-[8px] font-black text-studio-sub uppercase tracking-[0.2em]">{activeBg.name}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 px-10 pt-20 pb-10 md:px-14 md:pt-24 md:pb-14 flex-1">
          <EditorContent editor={editor} />
          
          <div className="mt-16 pt-8 border-t border-studio-border/30 flex items-center justify-between text-[8px] font-black text-studio-sub uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">history_edu</span> 
                {editor.getText().length} 字数
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">schedule</span> 
                {Math.ceil(editor.getText().length / 450)} 分钟阅毕
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-primary/50">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              GENIX STUDIO PREVIEW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
