
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
  const [title, setTitle] = useState('AI 时代的数字内容战略：从创作到分发的闭环');
  const [summary, setSummary] = useState('深入探讨在人工智能席卷全球的背景下，个人创作者如何利用多模态工具重构工作流，实现内容影响力的指数级增长。');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>('BRAND');
  const [userTier] = useState<'Free' | 'Pro'>('Pro');

  const demoContent = `
    <h1>数字叙事的未来：赋能个体表达的黄金时代</h1>
    <p>在这个信息碎片化的时代，内容的价值不再仅仅取决于其生产的速度，更取决于其与观众产生共鸣的深度。随着生成式人工智能的爆发，我们正处于一个内容生产力重构的十字路口。</p>
    
    <h2>1. 协作式创作：当灵感遇见算法</h2>
    <p>未来的创作不应是人类与机器的竞争，而是一场优雅的共生。AI 不再只是一个冷冰冰的生成器，它成为了你的初稿撰写员、逻辑审校官以及创意风暴的参与者。通过 Genix Studio，您可以体验到：</p>
    <ul>
      <li><strong>智能结构优化：</strong> AI 会自动识别文章的节奏感，并提供更具吸引力的段落衔接建议。</li>
      <li><strong>多模态素材融合：</strong> 实时根据文字意境生成配图或短视频。</li>
      <li><strong>全平台适配：</strong> 一次编写，自动生成符合各平台排版调性的不同版本。</li>
    </ul>

    <blockquote>
      “技术不应取代艺术，它应该让艺术家从繁琐的工具中解脱，去追逐那些只有人类灵魂才能感知的闪光点。”
    </blockquote>

    <h2>2. 重定义分发策略：从中心化到全域共振</h2>
    <p>一个成功的创作者不仅是一个好的写作者，更是一个精明的策略专家。利用我们的分发引擎，您可以轻松实现：</p>
    <p>首先，建立您的数字主场，通过深度长文沉淀核心价值；其次，通过 AI 提取高光片段，分发至短视频平台获取流量流量。这种“中央厨房式”的内容生产模式将使您的效率提升 10 倍以上。</p>

    <h2>3. 展望：每一个灵魂都是一支军队</h2>
    <p>我们坚信，未来的互联网将由数以亿计的独立节点构成。Genix Studio 的使命就是为每一个有趣的灵魂提供武器。无论是文字、图像还是视频，您的表达都值得被世界看到。</p>
    <p>现在，就开始您的第一篇 Pro 级别创作吧。</p>
  `;

  const editor = useEditor({
    extensions: [StarterKit, Div, Span, Placeholder.configure({ placeholder: '开始创作您的故事...' })],
    content: demoContent,
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
