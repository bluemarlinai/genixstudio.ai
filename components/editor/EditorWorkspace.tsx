
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

  useEffect(() => {
    if (!editor) return;
    const updateHeadings = () => {
      const items: HeadingItem[] = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          const text = node.textContent;
          const level = node.attrs.level;
          const id = `heading-${pos}`;
          if (text) items.push({ text, level, id });
        }
      });
      setHeadings(items);
    };
    editor.on('update', updateHeadings);
    updateHeadings();
    return () => { editor.off('update', updateHeadings); };
  }, [editor]);

  if (!editor) return null;

  const scrollToHeading = (index: number) => {
    const headingNodes = editor.view.dom.querySelectorAll('h1, h2, h3');
    if (headingNodes[index]) {
      headingNodes[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    icon, 
    label, 
    isText = false 
  }: { 
    onClick: () => void, 
    isActive?: boolean, 
    icon?: string, 
    label?: string,
    isText?: boolean
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl flex items-center justify-center transition-all group relative ${
        isActive 
          ? 'bg-primary/10 text-primary shadow-inner' 
          : 'hover:bg-studio-bg text-studio-sub hover:text-studio-dark'
      }`}
      title={label}
    >
      {isText ? (
        <span className="text-[10px] font-black">{label}</span>
      ) : (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-studio-dark text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] uppercase tracking-widest">
        {label}
      </span>
    </button>
  );

  return (
    <section className="flex-1 overflow-y-auto bg-studio-bg/60 flex flex-col items-center scroll-smooth pb-32 relative transition-all duration-500">
      
      {/* 1. STICKY TOOLBAR - MOVED TO ABSOLUTE TOP TO ELIMINATE CONTENT GAP */}
      <div className="sticky top-4 mb-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-xl border border-studio-border rounded-[22px] p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] z-50 ring-1 ring-black/5 animate-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-0.5 pr-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon="undo" label="撤销" />
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon="redo" label="重做" />
        </div>

        <div className="flex items-center gap-0.5 px-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon="format_bold" label="加粗" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon="format_italic" label="斜体" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon="strikethrough_s" label="删除线" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon="code" label="行内代码" />
        </div>

        <div className="flex items-center gap-0.5 px-1.5 border-r border-studio-border">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} label="H1" isText />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} label="H2" isText />
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} label="H3" isText />
          <div className="w-px h-4 bg-studio-border mx-1"></div>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon="format_list_bulleted" label="无序列表" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon="format_list_numbered" label="有序列表" />
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} icon="format_quote" label="引用块" />
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} icon="horizontal_rule" label="分割线" />
        </div>

        <div className="flex items-center gap-2 pl-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-studio-dark text-white rounded-xl text-[9px] font-black hover:bg-black transition-all uppercase tracking-[0.15em] shadow-lg shadow-black/10 active:scale-95 group overflow-hidden">
            <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">bolt</span>
            智能润色
          </button>
          <ToolbarButton onClick={() => {}} icon="auto_fix" label="AI 续写" />
          <ToolbarButton onClick={() => {}} icon="auto_awesome_motion" label="一键排版" />
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA WITH SIDEBAR TOC */}
      <div className="flex w-full max-w-[1100px] items-start justify-center gap-8 px-4">
        
        {/* LEFT STICKY TOC - FIXED TO LEFT OF CANVAS */}
        <div className="sticky top-24 w-52 shrink-0 hidden xl:block animate-in fade-in slide-in-from-left-4 duration-1000">
          <div className="bg-white/60 backdrop-blur-xl border border-studio-border rounded-[28px] p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-studio-border pb-3">
              <span className="material-symbols-outlined text-[16px] text-primary font-bold">toc</span>
              <span className="text-[9px] font-black text-studio-dark uppercase tracking-widest">智能大纲</span>
            </div>
            
            <div className="max-h-[50vh] overflow-y-auto scrollbar-hide space-y-3">
              {headings.length === 0 ? (
                <p className="text-[9px] text-studio-sub font-medium italic">等待输入内容...</p>
              ) : (
                headings.map((h, i) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(i)}
                    className={`block text-left hover:translate-x-1 transition-all group w-full ${h.level === 1 ? 'pl-0' : h.level === 2 ? 'pl-3' : 'pl-5'}`}
                  >
                    <p className={`truncate leading-tight ${
                      h.level === 1 
                        ? 'text-[10px] font-black text-studio-dark group-hover:text-primary' 
                        : 'text-[9px] font-bold text-studio-sub group-hover:text-studio-dark border-l-2 border-transparent group-hover:border-primary/30 pl-1.5'
                    }`}>
                      {h.text}
                    </p>
                  </button>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-studio-border">
              <div className="h-0.5 w-full bg-studio-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-700" 
                  style={{ width: `${Math.min(100, headings.length * 10)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ARTICLE CANVAS - ZERO TOP GAP DESIGN */}
        <div 
          className={`w-full max-w-[720px] rounded-[32px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-studio-border relative transition-all duration-700 ease-in-out flex flex-col mb-20 z-10 ${activeBg.class || ''}`}
          style={{
            ...activeBg.style,
            backgroundRepeat: 'repeat',
            backgroundSize: activeBg.style?.backgroundImage && !activeBg.style?.backgroundSize ? 'cover' : activeBg.style?.backgroundSize || 'auto',
            backgroundAttachment: 'scroll'
          }}
        >
          {/* Brand Overlay */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none overflow-visible">
            {activeBrand.component}
          </div>

          {/* EDITOR BODY - MINIMIZED TOP PADDING */}
          <div className="relative z-10 px-8 pt-4 pb-14 md:px-14 md:pt-6 md:pb-20 flex-1">
            <EditorContent editor={editor} />
            
            {/* ARTICLE FOOTER */}
            <div className="mt-16 pt-8 border-t border-studio-border/30 flex items-center justify-between text-[8px] font-black text-studio-sub uppercase tracking-widest">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">edit_note</span> {editor.getText().length} 字</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">speed</span> {Math.ceil(editor.getText().length / 400)} 分钟阅读</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary/50">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                PRO WORKSPACE
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SPACER FOR BALANCE ON XL SCREENS */}
        <div className="w-52 shrink-0 hidden xl:block pointer-events-none"></div>

      </div>
    </section>
  );
};

export default EditorWorkspace;
