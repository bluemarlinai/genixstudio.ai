
import React, { useEffect, useState, useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { BackgroundPreset, BrandPreset } from './EditorTypes';

interface EditorWorkspaceProps {
  editor: Editor | null;
  activeBg: BackgroundPreset;
  activeBrand: BrandPreset;
}

const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({ editor, activeBg, activeBrand }) => {
  const [headings, setHeadings] = useState<{ text: string; level: number; id: string; pos: number }[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;
    const updateHeadings = () => {
      const items: { text: string; level: number; id: string; pos: number }[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const text = node.textContent;
          const level = node.attrs.level;
          if (text) items.push({ text, level, id: `h-${pos}`, pos });
        }
      });
      setHeadings(items);
    };
    editor.on('update', updateHeadings);
    updateHeadings();
    return () => { editor.off('update', updateHeadings); };
  }, [editor]);

  const scrollToHeading = (pos: number) => {
    if (!editor || !scrollContainerRef.current) return;
    const view = editor.view;
    const coords = view.coordsAtPos(pos);
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    // 增加偏移量以避开工具栏
    const relativeTop = coords.top - containerRect.top + scrollContainerRef.current.scrollTop - 100;
    
    scrollContainerRef.current.scrollTo({
      top: relativeTop,
      behavior: 'smooth'
    });
  };

  if (!editor) return null;

  const ToolBtn = ({ onClick, isActive = false, icon, label, isText = false, color }: any) => (
    <button
      onClick={onClick}
      className={`p-1 rounded-md flex items-center justify-center transition-all group relative ${
        isActive ? 'bg-primary text-white shadow-sm ring-1 ring-primary/20' : 'hover:bg-studio-bg text-studio-sub hover:text-studio-dark'
      }`}
      title={label}
    >
      {isText ? (
        <span className="text-[9px] font-black px-1.5 leading-none">{label}</span>
      ) : (
        <span className="material-symbols-outlined text-[17px]" style={{ color: isActive ? 'white' : color }}>{icon}</span>
      )}
    </button>
  );

  const Divider = () => <div className="w-px h-3 bg-studio-border mx-1 shrink-0"></div>;

  return (
    <section 
      ref={scrollContainerRef} 
      className="w-full flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pt-4 pb-48 relative no-scrollbar"
    >
      {/* 居中锁定的极致紧凑工具栏 */}
      <div className="sticky top-2 mb-8 flex flex-col gap-1.5 bg-white/80 backdrop-blur-3xl border border-studio-border rounded-[20px] p-2 shadow-xl z-50 w-fit ring-1 ring-black/5 mx-auto">
        <div className="flex items-center gap-0.5 whitespace-nowrap px-1">
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} icon="undo" />
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} icon="redo" />
          <Divider />
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" />
          <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon="format_underlined" />
          <Divider />
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} label="H1" isText />
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} label="H2" isText />
          <Divider />
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" />
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" />
          <Divider />
          <button className="flex items-center gap-1.5 px-3 py-1 bg-studio-dark text-white rounded-lg text-[8px] font-black hover:bg-black transition-all shadow-md active:scale-95 ml-1">
            <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
            AI 润色
          </button>
        </div>
      </div>

      <div className="flex w-full max-w-[1400px] items-start justify-center gap-8 px-8">
        {/* 智能大纲 */}
        <div className="sticky top-24 w-60 shrink-0 hidden xl:block">
          <div className="bg-white/60 backdrop-blur-xl border border-studio-border rounded-[28px] p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-studio-border pb-3">
              <span className="material-symbols-outlined text-[16px] text-primary font-bold">toc</span>
              <span className="text-[9px] font-black text-studio-dark uppercase tracking-widest">智能大纲</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar space-y-3">
              {headings.length === 0 ? (
                 <p className="text-[9px] text-studio-sub italic px-1">正在分析结构...</p>
              ) : headings.map((h, i) => (
                <button 
                  key={h.id} 
                  onClick={() => scrollToHeading(h.pos)}
                  className={`block text-left hover:translate-x-1 transition-all group w-full ${h.level === 1 ? 'pl-0' : 'pl-3'}`}
                >
                  <p className="truncate leading-tight text-[10px] font-bold text-studio-sub group-hover:text-primary">{h.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 核心编辑舞台 */}
        <div 
          className={`w-full max-w-[840px] rounded-[40px] shadow-2xl border border-studio-border relative transition-all duration-700 flex flex-col mb-40 z-10 ${activeBg.class || ''}`}
          style={{ 
            ...activeBg.style, 
            backgroundRepeat: 'repeat', 
            backgroundSize: activeBg.style?.backgroundImage && !activeBg.style?.backgroundSize ? 'cover' : activeBg.style?.backgroundSize || 'auto' 
          }}
        >
          {activeBrand.id !== 'b-0' && (
            <div className="absolute top-10 right-12 flex items-center gap-2 opacity-30 grayscale select-none pointer-events-none">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-900">Genix Studio</span>
            </div>
          )}
          <div className="relative z-10 px-8 pt-16 pb-24 md:px-20 md:pt-24 md:pb-40 flex-1">
            <EditorContent editor={editor} />
          </div>
        </div>
        <div className="w-60 shrink-0 hidden xl:block"></div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
