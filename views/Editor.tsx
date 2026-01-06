
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { BackgroundPreset, DecorationPreset, BrandPreset, SidebarTab } from '../components/editor/EditorTypes';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import EditorWorkspace from '../components/editor/EditorWorkspace';
import { ApiService } from '../api';

const Div = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() { return { class: { default: null }, style: { default: null } }; },
  parseHTML() { return [{ tag: 'div' }]; },
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

interface EditorProps {
  onBack: () => void;
  onPublish: () => void;
  onNavigateUpgrade: () => void;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish, onNavigateUpgrade }) => {
  const [title, setTitle] = useState('未命名文章');
  const [summary, setSummary] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>('BRAND');
  const [userTier] = useState<'Free' | 'Pro'>('Pro');

  const editor = useEditor({
    extensions: [StarterKit, Div, Span, Placeholder.configure({ placeholder: '开始创作您的故事...' })],
    content: `<h1>AI 在创意写作中的未来</h1><p>在这里输入您的第一句话...</p>`,
    editorProps: { attributes: { class: 'prose prose-lg prose-blue max-w-none focus:outline-none min-h-[900px]' } },
  });

  const handleSaveAndPublish = async () => {
    setIsSaving(true);
    try {
      await ApiService.saveArticle({
        id: Date.now().toString(),
        title,
        description: summary || editor?.getText().slice(0, 100) || '',
        status: 'published',
        platforms: ['chat'],
        lastEdited: new Date().toISOString(),
        coverImage,
        views: '0'
      });
      onPublish();
    } finally {
      setIsSaving(false);
    }
  };

  const bgPresets: BackgroundPreset[] = [
    { id: 'empty', name: '纯净白', class: 'bg-white', thumbnail: <div className="w-full h-full bg-white border border-studio-border rounded-lg flex items-center justify-center text-gray-300"><span className="material-symbols-outlined">block</span></div> },
    { id: 'winter-snow', name: '小寒初雪', style: { backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.94), rgba(255,255,255,0.85)), url("https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1200")', backgroundSize: 'cover' }, thumbnail: <img src="https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover rounded-lg" /> },
  ];

  const brandPresets: BrandPreset[] = [
    { 
      id: 'none', 
      name: '无品牌', 
      component: null, 
      thumbnail: <div className="w-full h-full flex items-center justify-center text-gray-300"><span className="material-symbols-outlined">block</span></div> 
    },
    { 
      id: 'genix-studio', 
      name: 'Genix Studio', 
      component: (
        <div className="absolute top-12 right-12 flex items-center gap-2 opacity-40 grayscale select-none pointer-events-none">
          <img src="assets/logo.png" alt="Watermark" className="w-6 h-6 object-contain" />
          <span className="text-xs font-black tracking-tighter uppercase">Genix Studio</span>
        </div>
      ), 
      thumbnail: <img src="assets/logo.png" className="w-full h-full object-contain p-1" /> 
    }
  ];

  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[0]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[1]);

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col font-sans overflow-hidden">
      <header className="h-[64px] px-6 bg-white border-b border-studio-border flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-studio-bg rounded-xl transition-colors">
            <span className="material-symbols-outlined text-studio-sub">arrow_back</span>
          </button>
          <div className="flex items-center gap-3 border-l border-studio-border pl-6">
            <img src="assets/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-black p-0 border-none focus:ring-0 bg-transparent" placeholder="输入标题..." />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            disabled={isSaving}
            onClick={handleSaveAndPublish} 
            className="px-8 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-2xl text-sm font-black shadow-xl disabled:opacity-50 transition-all"
          >
            {isSaving ? '保存中...' : '发布文章'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar 
          activeTab={activeTab} setActiveTab={setActiveTab} bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
          decorationPresets={[]} onInsertDecoration={() => {}} brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
        />
        <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        <RightSidebar 
          coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}}
          summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}}
        />
      </div>
    </div>
  );
};

export default EditorView;
