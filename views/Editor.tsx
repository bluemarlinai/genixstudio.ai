
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { BackgroundPreset, DecorationPreset, BrandPreset, SnippetPreset, SidebarTab } from '../components/editor/EditorTypes';
import LeftSidebar from '../components/editor/LeftSidebar';
import RightSidebar from '../components/editor/RightSidebar';
import EditorWorkspace from '../components/editor/EditorWorkspace';

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
  onPublish: (content: string, title: string) => void;
  onNavigateUpgrade: () => void;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('共生演进：AI 时代的创意表达与个体品牌重塑');
  const [summary, setSummary] = useState('深度探讨生成式 AI 对创作者生态的影响，解析如何利用技术杠杆实现从单一创作者到多维内容导演的华丽转型。');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');
  
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);

  const toggleZenMode = () => {
    if (!isLeftCollapsed || !isRightCollapsed) {
      setIsLeftCollapsed(true);
      setIsRightCollapsed(true);
    } else {
      setIsLeftCollapsed(false);
      setIsRightCollapsed(false);
    }
  };

  const longContent = `<p style="text-align: center; color: #137fec; font-weight: 900; letter-spacing: 0.1em; font-size: 0.75rem; margin-bottom: 1rem;">GENIX INSIGHTS • SPECIAL REPORT • 2024</p>
    <h1>共生演进：AI 时代的创意表达与个体品牌重塑</h1>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。</p>
    
    <div class="decoration-block" style="margin:3rem 0; text-align:center; padding:2.5rem; background:linear-gradient(135deg, #137fec08, #137fec02); border-radius:2.5rem; border:1.5px dashed #137fec30;"><span class="material-symbols-outlined" style="font-size:2.5rem; color:#137fec; opacity:0.3; display:block; margin-bottom:1.25rem;">format_quote</span><p style="font-size:1.25rem; font-weight:900; color:#1e293b; line-height:1.6; margin:0; font-style:italic; letter-spacing:-0.01em;">“技术并非创作的终结，而是表达的新起点。我们正从文字的编织者进化为意境的策展人。”</p></div>

    <h2>第一章：从“像素”到“意图”的范式转移</h2>
    <p>过去十年，内容创作的门槛在于<strong>工具的熟练度</strong>。无论是复杂的图文排版引擎，还是繁琐的视频剪辑流程，都将无数有思想的灵魂挡在了表达的大门之外。</p>
    
    <div class="decoration-block" style="margin:2.5rem 0; border-radius:1.5rem; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 20px 50px -12px rgba(0,0,0,0.1);">
      <div style="background:#f1f5f9; padding:0.5rem 1rem; border-bottom:1px solid #e2e8f0; display:flex; gap:6px;">
        <div style="width:8px; height:8px; border-radius:50%; background:#ef4444;"></div>
        <div style="width:8px; height:8px; border-radius:50%; background:#fbbf24;"></div>
        <div style="width:8px; height:8px; border-radius:50%; background:#10b981;"></div>
      </div>
      <img src="https://images.unsplash.com/photo-1542744173-8e7e5381c60c?auto=format&fit=crop&q=80&w=1000" style="width:100%; height:auto; display:block;" alt="Workspace Preview" />
      <div style="padding:1rem; background:white; text-align:center;">
        <p style="margin:0; font-size:0.75rem; font-weight:900; color:#64748b; text-transform:uppercase; letter-spacing:0.1em;">图 1.1 Genix 全栈创作工作区预览</p>
      </div>
    </div>

    <p>当 AI 能够瞬间完成从文本到视觉的转化，创作者的角色正悄然发生转变。我们不再仅仅是生产者，而是成为了<strong>创意导演</strong>。</p>
    
    <div class="decoration-block" style="display:flex; gap:1.25rem; margin:2.5rem 0; padding:1.5rem; background:#f8fafc; border-radius:1.25rem; border:1px solid #e2e8f0;"><div style="background:#137fec; color:white; width:2.5rem; height:2.5rem; border-radius:0.75rem; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0;">01</div><div style="flex:1;"><h4 style="margin:0; font-weight:900; font-size:1.1rem; color:#1e293b;">重新定义工作流</h4><p style="margin:0.5rem 0 0; color:#64748b; font-size:0.9rem; line-height:1.6;">将 80% 的机械劳动交给 AI 处理，保留 20% 的决策权力，这是效率飞跃的核心逻辑。</p></div></div>

    <h2>第二章：审美红利与情感溢价</h2>
    <p>在 AI 生成内容泛滥的未来，<strong>稀缺性</strong>将来自于极致的个性和真实的情感。每一款底纹、每一个装饰组件，都是为了让 AI 生成的骨架穿上具有灵魂的外衣。</p>

    <div class="decoration-block" style="margin:2.5rem 0; border-radius:1.5rem; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 20px 50px -12px rgba(0,0,0,0.1);">
      <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000" style="width:100%; height:auto; display:block;" alt="Design Presets" />
      <div style="padding:1rem; background:white; border-top:1px solid #f1f5f9;">
        <p style="margin:0; font-size:0.75rem; font-weight:900; color:#137fec; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.25rem;">PROSETS / 设计预设</p>
        <p style="margin:0; font-size:0.85rem; color:#64748b; line-height:1.5;">内置 50+ 种高保真背景预设，覆盖从极简商务到艺术先锋的多种表达语境。</p>
      </div>
    </div>

    <h2>第三章：多模态叙事的无限可能</h2>
    <p>文字、图像、音频乃至交互式的 3D 环境将无缝融合。通过极致的视觉呈现，我们可以将读者的注意力从碎片化的划动中拉回。</p>
    
    <div class="decoration-block" style="margin:2rem 0; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;"><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">多模态采纳率</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">+312%</p></div><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">读者停留时长</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">+85%</p></div></div>

    <h2>第四章：个体品牌的长青之道</h2>
    <p>在一个算法推荐主导的世界里，忠实的受众群体是你唯一的资产。Genix Studio 提供的品牌化水印与统一排版，正是为了在用户心中建立长期一致的认知。</p>

    <div class="decoration-block" style="margin:2.5rem 0; border-radius:1.5rem; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 20px 50px -12px rgba(0,0,0,0.1);">
      <img src="https://images.unsplash.com/photo-1551288049-bbdac8a28a80?auto=format&fit=crop&q=80&w=1000" style="width:100%; height:auto; display:block;" alt="Analytics Dashboard" />
      <div style="padding:1.5rem; background:white;">
        <h4 style="margin:0 0 0.5rem; font-weight:900; color:#1e293b;">全渠道增长追踪</h4>
        <p style="margin:0; font-size:0.9rem; color:#64748b; line-height:1.6;">实时洞察全平台内容表现，从微信公众号到知乎、Medium，每一份互动数据都被精准捕捉。</p>
      </div>
    </div>
    
    <p>我们需要理解的是，AI 的介入并不会让创作变得容易，而是让创作变得更深刻。它剥离了那些阻碍我们思考的细枝末节，迫使我们直面表达的核心价值。</p>`;

  const editor = useEditor({
    extensions: [StarterKit, Div, Span, Placeholder.configure({ placeholder: '在此处落笔您的灵感...' })],
    content: longContent,
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
  });

  const Thumbnail = ({ src, name, icon }: { src?: string, name: string, icon?: string }) => (
    <div className="w-full h-full relative bg-gray-50 flex items-center justify-center">
      {src ? (
        <img src={src} className="w-full h-full object-cover" alt={name} />
      ) : icon ? (
        <span className="material-symbols-outlined text-primary/30 text-[20px]">{icon}</span>
      ) : (
        <div className="flex flex-col items-center gap-1 text-gray-300">
          <span className="material-symbols-outlined text-[20px]">palette</span>
        </div>
      )}
    </div>
  );

  // 1. 完整底纹预设库
  const bgPresets: BackgroundPreset[] = [
    { id: 'w-1', name: '纯净白', class: 'bg-white', thumbnail: <Thumbnail name="纯净白" /> },
    { id: 'w-2', name: '小寒初雪', style: { backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1200")', backgroundSize: 'cover' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=300" name="小寒初雪" /> },
    { id: 'w-3', name: '复古纸张', style: { background: '#fcfaf2', backgroundImage: 'radial-gradient(#e1e1e1 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1586075010633-247fe1bd67a7?auto=format&fit=crop&q=80&w=300" name="复古纸张" /> },
    { id: 'w-4', name: '静谧深夜', style: { background: '#0f172a', color: '#e2e8f0' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1506318137071-a8e063b497a1?auto=format&fit=crop&q=80&w=300" name="静谧深夜" /> },
    { id: 'w-5', name: '鼠尾草绿', style: { background: '#f0f4f0' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=300" name="鼠尾草绿" /> },
    { id: 'w-6', name: '晨曦薄雾', style: { background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=300" name="晨曦薄雾" /> },
    { id: 'w-7', name: '极简网格', style: { background: 'white', backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '24px 24px' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=300" name="极简网格" /> },
    { id: 'w-8', name: '碳纤黑', style: { background: '#18181b', color: '#f4f4f5' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300" name="碳纤黑" /> },
    { id: 'w-9', name: '奶油杏', style: { background: '#fff9f2' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=300" name="奶油杏" /> },
    { id: 'w-10', name: '熏衣草紫', style: { background: '#f5f3ff' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1499002238440-d2647394ef71?auto=format&fit=crop&q=80&w=300" name="熏衣草紫" /> },
    { id: 'w-11', name: '深海', style: { background: '#001b3a', color: '#fff' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?auto=format&fit=crop&q=80&w=300" name="深海" /> },
    { id: 'w-12', name: '樱花', style: { background: '#fff5f7' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=300" name="樱花" /> },
    { id: 'w-13', name: '薄荷', style: { background: '#f0fff4' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=300" name="薄荷" /> },
    { id: 'w-14', name: '工业水泥', style: { background: '#e5e7eb' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1517646280104-aa29a5099309?auto=format&fit=crop&q=80&w=300" name="工业水泥" /> },
    { id: 'w-15', name: '科技蓝', style: { background: '#0f172a', borderLeft: '10px solid #137fec' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300" name="科技蓝" /> },
    { id: 'w-16', name: '柔和渐变', style: { background: 'linear-gradient(to right, #ffafbd, #ffc3a0)' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=300" name="柔和渐变" /> },
    { id: 'w-17', name: '摩登灰', style: { background: '#334155', color: 'white' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300" name="摩登灰" /> },
    { id: 'w-18', name: '复古宫廷', style: { background: '#fdfcf0', border: '16px solid #f2e8cf' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=300" name="复古宫廷" /> },
    { id: 'w-19', name: '波点', style: { background: '#ffffff', backgroundImage: 'radial-gradient(#137fec10 2px, transparent 2px)', backgroundSize: '20px 20px' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&q=80&w=300" name="波点" /> },
    { id: 'w-20', name: '牛皮纸', style: { background: '#e7cba9' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=300" name="牛皮纸" /> },
    { id: 'w-21', name: '抽象蓝', style: { background: 'linear-gradient(135deg, #00B4DB, #0083B0)', color: 'white' }, thumbnail: <Thumbnail src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=300" name="抽象蓝" /> },
  ];

  // 2. 完整排版组件库 (35组)
  const decorationPresets: DecorationPreset[] = Array.from({ length: 35 }, (_, i) => {
    const id = `dec-${i}`;
    let name = `组件 ${i + 1}`;
    let template = `<div class="decoration-block" style="padding:1.5rem; border:1px solid #e2e8f0; border-radius:1rem; margin:2rem 0;">占位组件 ${i + 1}</div>`;
    let icon = <span className="material-symbols-outlined text-gray-300">extension</span>;
    
    if (i === 0) {
      name = '分步卡片';
      template = `<div class="decoration-block" style="display:flex; gap:1.25rem; margin:2.5rem 0; padding:1.5rem; background:#f8fafc; border-radius:1.25rem; border:1px solid #e2e8f0;"><div style="background:#137fec; color:white; width:2.5rem; height:2.5rem; border-radius:0.75rem; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0;">01</div><div style="flex:1;"><h4 style="margin:0; font-weight:900; font-size:1.1rem; color:#1e293b;">核心步骤</h4><p style="margin:0.5rem 0 0; color:#64748b; font-size:0.9rem; line-height:1.6;">操作细节描述与逻辑解析。</p></div></div>`;
      icon = <span className="material-symbols-outlined text-primary">looks_one</span>;
    } else if (i === 1) {
      name = '金句引用';
      template = `<div class="decoration-block" style="margin:3rem 0; text-align:center; padding:2.5rem; background:linear-gradient(135deg, #137fec08, #137fec02); border-radius:2.5rem; border:1.5px dashed #137fec30;"><span className="material-symbols-outlined" style="font-size:2.5rem; color:#137fec; opacity:0.3; display:block; margin-bottom:1.25rem;">format_quote</span><p style="font-size:1.25rem; font-weight:900; color:#1e293b; line-height:1.6; margin:0; font-style:italic;">“在这里输入您的核心观点或想要强调的金句。”</p></div>`;
      icon = <span className="material-symbols-outlined text-primary">format_quote</span>;
    } else if (i === 2) {
      name = '数据网格';
      template = `<div class="decoration-block" style="margin:2rem 0; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;"><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">数据指标 A</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">99%</p></div><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">数据指标 B</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">24/7</p></div></div>`;
      icon = <span className="material-symbols-outlined text-primary">grid_view</span>;
    }
    return { 
      id, 
      name, 
      template, 
      thumbnail: <div className="flex items-center gap-2">{icon}<span className="text-[9px] font-black uppercase">{name}</span></div>, 
      isVip: i > 5 
    };
  });

  // 3. 品牌水印
  const brandPresets: BrandPreset[] = [
    { id: 'b-0', name: '无品牌', component: null, thumbnail: <Thumbnail name="无品牌" icon="block" /> },
    { id: 'b-1', name: 'Genix Studio', component: <div className="absolute top-6 right-10 flex items-center gap-2 opacity-30 grayscale pointer-events-none select-none"><img src="/logo.png" className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Genix Studio</span></div>, thumbnail: <Thumbnail src="/logo.png" name="Genix Studio" /> },
  ];

  // 4. 片段预设 (Header/Footer)
  const snippetPresets: SnippetPreset[] = [
    { id: 's-h-1', name: '研报眉标', type: 'HEADER', content: `<div class="snippet-header" style="text-align: center; border-bottom: 2px solid #137fec; padding-bottom: 2rem; margin-bottom: 3rem;"><span style="display: inline-block; padding: 0.5rem 1.5rem; background: #137fec; color: white; border-radius: 99px; font-weight: 900; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase;">SPECIAL REPORT 2024</span><h3 style="margin: 1.5rem 0 0.5rem; font-weight: 900; color: #1e293b;">数字时代生存指南</h3><p style="margin: 0; font-size: 0.85rem; color: #64748b;">GENIX STUDIO • 第 12 期深度研报</p></div>`, thumbnail: <Thumbnail icon="view_headline" name="研报眉标" /> },
    { id: 's-f-1', name: '关注尾卡', type: 'FOOTER', content: `<div class="snippet-footer" style="margin-top: 5rem; padding: 3rem; background: #f8fafc; border-radius: 2rem; border: 1px solid #e2e8f0; text-align: center;"><div style="width: 100px; height: 100px; background: #fff; border: 1px solid #e2e8f0; border-radius: 1rem; margin: 0 auto 1.5rem; padding: 0.5rem;"><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Genix" style="width: 100%; height: 100%;" /></div><h4 style="margin: 0; font-weight: 900; color: #1e293b;">长按关注 Genix Studio</h4><p style="margin: 0.5rem 0 0; font-size: 0.85rem; color: #64748b;">每周同步最新趋势</p></div>`, thumbnail: <Thumbnail icon="qr_code_2" name="关注尾卡" /> },
  ];

  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[1]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[1]);

  const handleInsertDecoration = (preset: DecorationPreset) => {
    editor?.chain().focus().insertContent(preset.template).run();
  };

  const handleInsertSnippet = (snippet: SnippetPreset) => {
    if (!editor) return;
    if (snippet.type === 'HEADER') {
      editor.chain().focus().insertContentAt(0, snippet.content).run();
    } else {
      const endPos = editor.state.doc.content.size;
      editor.chain().focus().insertContentAt(endPos, snippet.content).run();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg transition-colors text-studio-sub"><span className="material-symbols-outlined text-[20px]">arrow_back</span></button>
          <div className="h-4 w-px bg-studio-border"></div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none text-[11px] font-black text-studio-dark w-[350px] focus:ring-0 p-0" placeholder="文章标题..." />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
           <button onClick={toggleZenMode} className={`flex items-center gap-2 px-5 py-1.5 rounded-full border transition-all duration-500 hover:scale-[1.03] active:scale-95 group ${isLeftCollapsed && isRightCollapsed ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/10' : 'bg-white text-studio-sub border-studio-border hover:text-primary hover:border-primary/20'}`}>
             <span className="material-symbols-outlined text-[18px] transition-transform duration-500 group-hover:rotate-180">{isLeftCollapsed && isRightCollapsed ? 'fullscreen_exit' : 'fullscreen'}</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden md:block">{isLeftCollapsed && isRightCollapsed ? '退出全屏' : '禅定模式'}</span>
           </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onPublish(editor?.getHTML() || '', title)} 
            className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            发布文章
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="relative h-full flex shrink-0">
          <div className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-studio-border bg-white ${isLeftCollapsed ? 'w-0 opacity-0' : 'w-[240px] opacity-100'}`}>
            <LeftSidebar 
              activeTab={activeTab} setActiveTab={setActiveTab}
              bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
              decorationPresets={decorationPresets} onInsertDecoration={handleInsertDecoration}
              brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
              snippetPresets={snippetPresets} onInsertSnippet={handleInsertSnippet}
            />
          </div>
          <button onClick={() => setIsLeftCollapsed(!isLeftCollapsed)} className={`absolute top-1/2 -translate-y-1/2 -right-3 z-[60] w-6 h-14 bg-white border border-studio-border rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-studio-sub hover:text-primary hover:scale-110 transition-all group ${isLeftCollapsed ? 'translate-x-1 opacity-100' : 'opacity-20 hover:opacity-100'}`}>
            <span className={`material-symbols-outlined text-[14px] transition-transform duration-500 ${isLeftCollapsed ? 'rotate-180' : ''}`}>chevron_left</span>
          </button>
        </div>

        <div className="flex-1 relative overflow-hidden flex flex-col">
           <EditorWorkspace editor={editor} activeBg={activeBg} activeBrand={activeBrand} />
        </div>

        <div className="relative h-full flex shrink-0">
          <button onClick={() => setIsRightCollapsed(!isRightCollapsed)} className={`absolute top-1/2 -translate-y-1/2 -left-3 z-[60] w-6 h-14 bg-white border border-studio-border rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-studio-sub hover:text-primary hover:scale-110 transition-all group ${isRightCollapsed ? '-translate-x-1 opacity-100' : 'opacity-20 hover:opacity-100'}`}>
            <span className={`material-symbols-outlined text-[14px] transition-transform duration-500 ${isRightCollapsed ? '' : 'rotate-180'}`}>chevron_left</span>
          </button>
          <div className={`transition-all duration-500 ease-in-out overflow-hidden border-l border-studio-border bg-white ${isRightCollapsed ? 'w-0 opacity-0' : 'w-[260px] opacity-100'}`}>
            <RightSidebar 
              coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}}
              summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
