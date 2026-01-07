
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
    <section className="flex-1 overflow-y-auto px-6 py-8 bg-studio-bg/40 flex flex-col items-center scroll-smooth">
      {/* TOOLBAR */}
      <div className="sticky top-0 mb-8 flex flex-wrap items-center gap-0.5 bg-white border border-studio-border rounded-xl p-1.5 shadow-xl z-[100] max-w-fit ring-1 ring-black/5">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="加粗">
          <span className="material-symbols-outlined text-[20px]">format_bold</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="斜体">
          <span className="material-symbols-outlined text-[20px]">format_italic</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded-lg transition-all ${editor.isActive('strike') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="中划线">
          <span className="material-symbols-outlined text-[20px]">format_strikethrough</span>
        </button>
        
        <div className="w-px h-4 bg-studio-border mx-1.5"></div>
        
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 rounded-lg text-xs font-black transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 rounded-lg text-xs font-black transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`}>H2</button>
        
        <div className="w-px h-4 bg-studio-border mx-1.5"></div>
        
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="列表">
          <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-primary/10 text-primary' : 'hover:bg-studio-bg text-studio-sub'}`} title="引用">
          <span className="material-symbols-outlined text-[20px]">format_quote</span>
        </button>
        
        <div className="w-px h-4 bg-studio-border mx-1.5"></div>
        
        <button className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-500" title="AI 助手">
          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
        </button>
        <button className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600" title="图片库">
          <span className="material-symbols-outlined text-[20px]">image</span>
        </button>
      </div>

      {/* ARTICLE CARD */}
      <div 
        className={`w-full max-w-[720px] min-h-[1000px] rounded-[32px] shadow-xl shadow-gray-200/50 border border-studio-border p-12 md:p-16 relative transition-all duration-700 ease-in-out mb-16 ${activeBg.class || ''}`}
        style={activeBg.style}
      >
        {activeBrand.component}
        
        <div className="absolute top-6 left-8 bg-white/60 backdrop-blur-sm text-studio-dark px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic z-20 ring-1 ring-studio-border">
          {activeBg.name}
        </div>

        <div className="relative z-10">
          <EditorContent editor={editor} />
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-6 right-8 flex gap-3 bg-white/70 backdrop-blur-xl border border-studio-border px-4 py-1.5 rounded-full shadow-lg text-[9px] font-black text-studio-sub uppercase tracking-[0.2em] z-20">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">article</span> 
            {editor.getText().length} 字符
          </span>
        </div>
      </div>
    </section>
  );
};

export default EditorWorkspace;
