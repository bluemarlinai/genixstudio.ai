
import React from 'react';
import { EditorContent } from '@tiptap/react';
// Correctly import Editor from @tiptap/core
import { Editor } from '@tiptap/core';
import { BackgroundPreset, BrandPreset } from './EditorTypes';

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
  if (!editor) return null;

  return (
    <section className="flex-1 overflow-y-auto px-12 py-12 bg-studio-bg/40 flex flex-col items-center scroll-smooth">
      {/* TOOLBAR */}
      <div className="sticky top-0 mb-12 flex flex-wrap items-center gap-1 bg-white border border-studio-border rounded-[24px] p-2.5 shadow-2xl z-[100] max-w-fit ring-1 ring-black/5">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bold') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="加粗">
          <span className="material-symbols-outlined text-[22px]">format_bold</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('italic') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="斜体">
          <span className="material-symbols-outlined text-[22px]">format_italic</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('strike') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="中划线">
          <span className="material-symbols-outlined text-[22px]">format_strikethrough</span>
        </button>
        
        <div className="w-px h-6 bg-studio-border mx-2"></div>
        
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-3 py-2 rounded-xl text-sm font-black transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-2 rounded-xl text-sm font-black transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}>H2</button>
        
        <div className="w-px h-6 bg-studio-border mx-2"></div>
        
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="列表">
          <span className="material-symbols-outlined text-[22px]">format_list_bulleted</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2.5 rounded-xl transition-all ${editor.isActive('blockquote') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="引用">
          <span className="material-symbols-outlined text-[22px]">format_quote</span>
        </button>
        
        <div className="w-px h-6 bg-studio-border mx-2"></div>
        
        <button className="p-2.5 hover:bg-indigo-50 rounded-xl text-indigo-500" title="AI 助手">
          <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
        </button>
        <button className="p-2.5 hover:bg-emerald-50 rounded-xl text-emerald-600" title="图片库">
          <span className="material-symbols-outlined text-[22px]">image</span>
        </button>
      </div>

      {/* ARTICLE CARD */}
      <div 
        className={`w-full max-w-[760px] min-h-[1200px] rounded-[56px] shadow-2xl shadow-gray-200/50 border border-studio-border p-24 relative transition-all duration-700 ease-in-out mb-24 ${activeBg.class || ''}`}
        style={activeBg.style}
      >
        {activeBrand.component}
        
        <div className="absolute top-10 left-12 bg-white/60 backdrop-blur-sm text-studio-dark px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic z-20 ring-1 ring-studio-border">
          {activeBg.name}
        </div>

        <div className="relative z-10">
          <EditorContent editor={editor} />
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-12 right-12 flex gap-4 bg-white/70 backdrop-blur-xl border border-studio-border px-6 py-2.5 rounded-full shadow-xl text-[11px] font-black text-studio-sub uppercase tracking-[0.2em] z-20">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">article</span> 
            {editor.getText().length} 字符
          </span>
        </div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
