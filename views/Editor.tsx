
import React, { useState } from 'react';
import { useEditor } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import { BackgroundPreset, DecorationPreset, BrandPreset, SidebarTab } from '../components/editor/EditorTypes';
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
  onPublish: () => void;
  onNavigateUpgrade: () => void;
}

const EditorView: React.FC<EditorProps> = ({ onBack, onPublish }) => {
  const [title, setTitle] = useState('共生演进：AI 时代的创意表达与个体品牌重塑');
  const [summary, setSummary] = useState('深度探讨生成式 AI 对创作者生态的影响，解析如何利用技术杠杆实现从单一创作者到多维内容导演的华丽转型。');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800');
  const [activeTab, setActiveTab] = useState<SidebarTab>('BACKGROUND');

  const longContent = `
    <p style="text-align: center; color: #137fec; font-weight: 900; letter-spacing: 0.1em; font-size: 0.75rem; margin-bottom: 2rem;">GENIX INSIGHTS • SPECIAL REPORT • 2024</p>
    <h1>共生演进：AI 时代的创意表达与个体品牌重塑</h1>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。</p>
    
    <div class="decoration-block" style="margin:3rem 0; text-align:center; padding:2.5rem; background:linear-gradient(135deg, #137fec08, #137fec02); border-radius:2.5rem; border:1.5px dashed #137fec30;"><span class="material-symbols-outlined" style="font-size:2.5rem; color:#137fec; opacity:0.3; display:block; margin-bottom:1.25rem;">format_quote</span><p style="font-size:1.25rem; font-weight:900; color:#1e293b; line-height:1.6; margin:0; font-style:italic; letter-spacing:-0.01em;">“技术并非创作的终结，而是表达的新起点。我们正从文字的编织者进化为意境的策展人。”</p></div>

    <h2>第一章：从“像素”到“意图”的范式转移</h2>
    <p>过去十年，内容创作的门槛在于<strong>工具的熟练度</strong>。无论是复杂的图文排版引擎，还是繁琐的视频剪辑流程，都将无数有思想的灵魂挡在了表达的大门之外。然而，生成式 AI 的崛起彻底改变了这一现状。现在的核心竞争力已不再是“如何使用软件”，而是“如何清晰地表达意图”。</p>
    <p>当 AI 能够瞬间完成从文本到视觉的转化，创作者的角色正悄然发生转变。我们不再仅仅是生产者，而是成为了<strong>创意导演</strong>。这种转变意味着我们需要更高维度的全局观：理解风格的语义，把握情感的共鸣，以及在海量生成的可能性中筛选出最具品牌辨识度的那一枚像素。</p>
    
    <div class="decoration-block" style="display:flex; gap:1.25rem; margin:2.5rem 0; padding:1.5rem; background:#f8fafc; border-radius:1.25rem; border:1px solid #e2e8f0;"><div style="background:#137fec; color:white; width:2.5rem; height:2.5rem; border-radius:0.75rem; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0;">01</div><div style="flex:1;"><h4 style="margin:0; font-weight:900; font-size:1.1rem; color:#1e293b;">重新定义工作流</h4><p style="margin:0.5rem 0 0; color:#64748b; font-size:0.9rem; line-height:1.6;">将 80% 的机械劳动交给 AI 处理，保留 20% 的决策权力，这是效率飞跃的核心逻辑。</p></div></div>

    <h2>第二章：审美红利与情感溢价</h2>
    <p>在 AI 生成内容泛滥的未来，<strong>稀缺性</strong>将来自于极致的个性和真实的情感。当每个人都能生成 60 分的文章时，那剩下的 40 分——那些关于生命体验、独特视角和极致审美的打磨，将成为区分平庸与伟大的唯一分水岭。</p>
    <p>Genix Studio 的设计初衷便是保护这种稀缺性。我们不提倡盲目的自动化，而是强调<strong>人机协作的精致感</strong>。每一款底纹、每一个装饰组件，都是为了让 AI 生成的骨架穿上具有灵魂的外衣。这种视觉上的专业度，本质上是在向读者传递一个信号：这篇文章值得你投入最宝贵的注意力。</p>

    <h2>第三章：多模态叙事的无限可能</h2>
    <p>未来的内容将不再局限于单一的媒介。文字、图像、音频乃至交互式的 3D 环境将无缝融合。一个优秀的创作者，应该能够根据内容的深度，自由切换表达的模态。例如，在讲解复杂逻辑时调用结构化的数据结论卡片；在抒发情感时，配合 AI 生成的具有氛围感的动态背景。</p>
    
    <div class="decoration-block" style="margin:2rem 0; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;"><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">多模态采纳率</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">+312%</p></div><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">读者停留时长</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">+85%</p></div></div>

    <h2>第四章：个体品牌的长青之道</h2>
    <p>最后，我们必须认识到，AI 时代最强大的护城河是个体品牌。在一个算法推荐主导的世界里，忠实的受众群体是你唯一的资产。这意味着你需要保持高度的一致性——不仅是内容的深度，更是视觉风格的辨识度。</p>
    <p>通过使用品牌预设（Brands）和自定义水印，您可以在每一篇分发出去的内容中植入品牌基因。无论读者是在微信、知乎还是 Medium 上读到您的文字，他们都能在第一时间感知到这种一脉相承的专业品质。</p>
    
    <p>（以下内容为长篇幅演示，旨在展示画布的动态生长能力...）</p>
    <p>我们需要理解的是，AI 的介入并不会让创作变得容易，而是让创作变得更深刻。它剥离了那些阻碍我们思考的细枝末节，迫使我们直面表达的核心。正如在摄影技术出现后，绘画并未消失，而是孕育出了印象派和抽象表现主义，AI 也会催生出前所未有的文字艺术形式。</p>
    <p>这种演进不仅是工具的迭代，更是人类意识的延伸。当我们习惯了与算法对话，我们实际上是在借用全人类的知识库来丰富自己的语汇。这是一种前所未有的智力共生。</p>
    <p>... (重复段落以增加长度) ...</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。Genix Studio 致力于消解技术门槛，让每一个像素都服务于您的表达。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。在这个信息过载的数字时代，创作者不仅需要有深度的思考，更需要有极致的排版审美来吸引受众。</p>
    <p>（以上为演示长文本，实际创作中建议根据读者注意力曲线进行合理的模块化拆分。Genix Studio 感谢您的每一份灵感输入。）</p>
  `;

  const editor = useEditor({
    extensions: [StarterKit, Div, Span, Placeholder.configure({ placeholder: '在此处落笔您的灵感...' })],
    content: longContent,
    editorProps: { attributes: { class: 'prose prose-sm prose-blue max-w-none focus:outline-none' } },
  });

  // --- 20+ BACKGROUNDS ---
  const bgPresets: BackgroundPreset[] = [
    { id: 'w-1', name: '纯净白', class: 'bg-white', thumbnail: <div className="w-full h-full bg-white border border-studio-border rounded"></div> },
    { id: 'w-2', name: '小寒初雪', style: { backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.9)), url("https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1200")', backgroundSize: 'cover' }, thumbnail: <img src="https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover rounded" /> },
    { id: 'w-3', name: '复古纸张', style: { background: '#fcfaf2', backgroundImage: 'radial-gradient(#e1e1e1 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }, thumbnail: <div className="w-full h-full bg-[#fcfaf2] rounded"></div> },
    { id: 'w-4', name: '静谧深夜', style: { background: '#0f172a', color: '#e2e8f0' }, thumbnail: <div className="w-full h-full bg-[#0f172a] rounded"></div> },
    { id: 'w-5', name: '鼠尾草绿', style: { background: '#f0f4f0' }, thumbnail: <div className="w-full h-full bg-[#f0f4f0] rounded"></div> },
    { id: 'w-6', name: '晨曦薄雾', style: { background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)' }, thumbnail: <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-slate-50 rounded"></div> },
    { id: 'w-7', name: '极简网格', style: { background: 'white', backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)', backgroundSize: '24px 24px' }, thumbnail: <div className="w-full h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:8px_8px] rounded"></div> },
    { id: 'w-8', name: '碳纤黑', style: { background: '#18181b', color: '#f4f4f5' }, thumbnail: <div className="w-full h-full bg-zinc-900 rounded"></div> },
    { id: 'w-9', name: '奶油杏', style: { background: '#fff9f2' }, thumbnail: <div className="w-full h-full bg-[#fff9f2] rounded"></div> },
    { id: 'w-10', name: '熏衣草紫', style: { background: '#f5f3ff' }, thumbnail: <div className="w-full h-full bg-violet-50 rounded"></div> },
    { id: 'w-11', name: '深海', style: { background: '#001b3a', color: '#fff' }, thumbnail: <div className="w-full h-full bg-blue-950 rounded"></div> },
    { id: 'w-12', name: '樱花', style: { background: '#fff5f7' }, thumbnail: <div className="w-full h-full bg-pink-50 rounded"></div> },
    { id: 'w-13', name: '薄荷', style: { background: '#f0fff4' }, thumbnail: <div className="w-full h-full bg-green-50 rounded"></div> },
    { id: 'w-14', name: '工业水泥', style: { background: '#e5e7eb' }, thumbnail: <div className="w-full h-full bg-gray-200 rounded"></div> },
    { id: 'w-15', name: '科技蓝', style: { background: '#0f172a', borderLeft: '10px solid #137fec' }, thumbnail: <div className="w-full h-full bg-slate-900 border-l-4 border-primary rounded"></div> },
    { id: 'w-16', name: '柔和渐变', style: { background: 'linear-gradient(to right, #ffafbd, #ffc3a0)' }, thumbnail: <div className="w-full h-full bg-gradient-to-r from-pink-200 to-orange-100 rounded"></div> },
    { id: 'w-17', name: '摩登灰', style: { background: '#334155', color: 'white' }, thumbnail: <div className="w-full h-full bg-slate-700 rounded"></div> },
    { id: 'w-18', name: '复古宫廷', style: { background: '#fdfcf0', border: '16px solid #f2e8cf' }, thumbnail: <div className="w-full h-full bg-[#fdfcf0] border-2 border-amber-100 rounded"></div> },
    { id: 'w-19', name: '波点', style: { background: '#ffffff', backgroundImage: 'radial-gradient(#137fec10 2px, transparent 2px)', backgroundSize: '20px 20px' }, thumbnail: <div className="w-full h-full bg-white rounded-full border"></div> },
    { id: 'w-20', name: '牛皮纸', style: { background: '#e7cba9' }, thumbnail: <div className="w-full h-full bg-orange-200 rounded"></div> },
    { id: 'w-21', name: '抽象蓝', style: { background: 'linear-gradient(135deg, #00B4DB, #0083B0)', color: 'white' }, thumbnail: <div className="w-full h-full bg-blue-400 rounded"></div> },
  ];

  // --- 35+ DECORATIONS ---
  const decorationPresets: DecorationPreset[] = Array.from({ length: 35 }, (_, i) => {
    const id = `dec-${i}`;
    let name = `排版组件 ${i + 1}`;
    let template = `<div class="decoration-block" style="padding:1.5rem; border:1px solid #e2e8f0; border-radius:1rem; margin:2rem 0;">内容占位符 ${i + 1}</div>`;
    let icon = <span className="material-symbols-outlined text-gray-300">extension</span>;

    if (i === 0) {
      name = '分步指示卡';
      template = `<div class="decoration-block" style="display:flex; gap:1.25rem; margin:2.5rem 0; padding:1.5rem; background:#f8fafc; border-radius:1.25rem; border:1px solid #e2e8f0;"><div style="background:#137fec; color:white; width:2.5rem; height:2.5rem; border-radius:0.75rem; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:1rem; flex-shrink:0;">01</div><div style="flex:1;"><h4 style="margin:0; font-weight:900; font-size:1.1rem; color:#1e293b;">核心步骤标题</h4><p style="margin:0.5rem 0 0; color:#64748b; font-size:0.9rem; line-height:1.6;">在此处详细描述该步骤的执行细节与核心逻辑点。</p></div></div>`;
      icon = <span className="material-symbols-outlined text-primary">looks_one</span>;
    } else if (i === 1) {
      name = '金句引用';
      template = `<div class="decoration-block" style="margin:3rem 0; text-align:center; padding:2.5rem; background:linear-gradient(135deg, #137fec08, #137fec02); border-radius:2.5rem; border:1.5px dashed #137fec30;"><span class="material-symbols-outlined" style="font-size:2.5rem; color:#137fec; opacity:0.3; display:block; margin-bottom:1.25rem;">format_quote</span><p style="font-size:1.25rem; font-weight:900; color:#1e293b; line-height:1.6; margin:0; font-style:italic; letter-spacing:-0.01em;">“这里是您想要强调的核心观点或名言警句。”</p></div>`;
      icon = <span className="material-symbols-outlined text-primary">format_quote</span>;
    } else if (i === 2) {
      name = 'AI 洞察卡';
      template = `<div class="decoration-block" style="margin:2.5rem 0; padding:1.5rem; background:#4f46e508; border-radius:1.5rem; border:1px solid #4f46e520;"><div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:1rem;"><span className="material-symbols-outlined" style="font-size:1.4rem; color:#4f46e5;">auto_awesome</span><span style="font-size:0.8rem; font-weight:900; color:#4f46e5; text-transform:uppercase; letter-spacing:0.15em;">AI Insights</span></div><p style="margin:0; font-size:0.95rem; color:#4338ca; font-weight:500; line-height:1.6;">呈现 AI 对正文内容的深度总结或背景扩展。</p></div>`;
      icon = <span className="material-symbols-outlined text-indigo-500">auto_awesome</span>;
    } else if (i === 3) {
      name = '代码块';
      template = `<div class="decoration-block" style="margin:2rem 0; background:#1e293b; color:#f8fafc; padding:1.25rem; border-radius:1rem; font-family:monospace; font-size:0.85rem;"><div style="color:#94a3b8; border-bottom:1px solid #334155; padding-bottom:0.5rem; margin-bottom:0.75rem;">python // example.py</div><pre style="margin:0;">def content_revolution():\n  print("AI is reshaping expression")</pre></div>`;
      icon = <span className="material-symbols-outlined text-slate-400">code</span>;
    } else if (i === 4) {
      name = '数据结论';
      template = `<div class="decoration-block" style="margin:2rem 0; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;"><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">转化率</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">+24.8%</p></div><div style="background:#f8fafc; padding:1.5rem; border-radius:1.25rem; border:1px solid #e2e8f0; text-align:center;"><h5 style="margin:0 0 0.5rem; font-size:0.75rem; color:#64748b; font-weight:900;">留存</h5><p style="margin:0; font-size:1.75rem; font-weight:900; color:#137fec;">68%</p></div></div>`;
      icon = <span className="material-symbols-outlined text-blue-500">analytics</span>;
    }

    return { id, name, template, thumbnail: <div className="flex items-center gap-2">{icon}<span className="text-[9px] font-black text-studio-sub uppercase">{name}</span></div>, isVip: i > 5 };
  });

  // --- 10+ BRANDS ---
  const brandPresets: BrandPreset[] = [
    { id: 'b-0', name: '无品牌', component: null, thumbnail: <span className="material-symbols-outlined text-gray-300">block</span> },
    { id: 'b-1', name: 'Genix Studio', component: <div className="absolute top-6 right-10 flex items-center gap-2 opacity-30 grayscale pointer-events-none select-none"><img src="assets/logo.png" className="w-4 h-4" /><span className="text-[10px] font-black uppercase tracking-widest">Genix Studio</span></div>, thumbnail: <img src="assets/logo.png" className="w-full h-full object-contain p-1" /> },
    { id: 'b-2', name: 'Tech Insight', component: <div className="absolute bottom-6 left-10 opacity-20 text-[9px] font-black uppercase tracking-[0.3em] pointer-events-none select-none">© Tech Insights Research</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">precision_manufacturing</span> },
    { id: 'b-3', name: 'Verified', component: <div className="absolute bottom-6 right-10 flex items-center gap-1.5 opacity-30 pointer-events-none select-none text-emerald-600"><span className="material-symbols-outlined text-[14px]">verified</span><span className="text-[9px] font-black uppercase tracking-widest">Verified Content</span></div>, thumbnail: <span className="material-symbols-outlined text-emerald-500">verified</span> },
    { id: 'b-4', name: 'Fashion Journal', component: <div className="absolute top-6 left-10 opacity-25 italic text-[11px] font-serif tracking-tight pointer-events-none select-none">Fashion & Minimal</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">shopping_bag</span> },
    { id: 'b-5', name: 'Creative Lab', component: <div className="absolute top-[50%] right-[-30px] rotate-90 opacity-10 text-[20px] font-black uppercase tracking-[1em] pointer-events-none select-none">CREATIVE</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">biotech</span> },
    { id: 'b-6', name: 'News Media', component: <div className="absolute top-6 right-10 px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest opacity-20 pointer-events-none select-none">Daily Report</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">news</span> },
    { id: 'b-7', name: 'Academic Uni', component: <div className="absolute bottom-6 left-10 opacity-15 text-[8px] font-serif pointer-events-none select-none">Institute of Digital Arts</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">school</span> },
    { id: 'b-8', name: 'Minimalist', component: <div className="absolute top-8 left-[50%] -translate-x-1/2 opacity-20 text-[7px] font-black uppercase tracking-[0.5em] pointer-events-none select-none">Minimal Concept</div>, thumbnail: <span className="material-symbols-outlined text-gray-400">circle</span> },
    { id: 'b-9', name: 'Global Net', component: <div className="absolute bottom-8 right-12 opacity-25 flex flex-col items-end pointer-events-none select-none"><span className="text-[8px] font-black uppercase tracking-widest">Global Network</span><div className="w-12 h-0.5 bg-current mt-1"></div></div>, thumbnail: <span className="material-symbols-outlined text-gray-400">public</span> },
    { id: 'b-10', name: 'Studio One', component: <div className="absolute bottom-4 left-4 bg-primary text-white p-2 rounded-lg opacity-20 scale-50 origin-bottom-left">STUDIO ONE</div>, thumbnail: <span className="material-symbols-outlined text-primary">looks_one</span> },
  ];

  const [activeBg, setActiveBg] = useState<BackgroundPreset>(bgPresets[1]);
  const [activeBrand, setActiveBrand] = useState<BrandPreset>(brandPresets[1]);

  const handleInsertDecoration = (preset: DecorationPreset) => {
    editor?.chain().focus().insertContent(preset.template).run();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-studio-bg font-sans overflow-hidden">
      <header className="h-[52px] px-4 bg-white border-b border-studio-border flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-studio-bg rounded-lg transition-colors">
            <span className="material-symbols-outlined text-[20px] text-studio-sub">arrow_back</span>
          </button>
          <div className="h-4 w-px bg-studio-border"></div>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent border-none text-[11px] font-black text-studio-dark w-[450px] focus:ring-0 p-0"
            placeholder="文章标题..."
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest hidden md:block">已同步云端</span>
          <button 
            onClick={onPublish}
            className="px-6 py-2 bg-primary text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            发布文章
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar 
          activeTab={activeTab} setActiveTab={setActiveTab}
          bgPresets={bgPresets} activeBg={activeBg} setActiveBg={setActiveBg}
          decorationPresets={decorationPresets} onInsertDecoration={handleInsertDecoration}
          brandPresets={brandPresets} activeBrand={activeBrand} setActiveBrand={setActiveBrand}
        />
        
        <EditorWorkspace 
          editor={editor} 
          activeBg={activeBg} 
          activeBrand={activeBrand} 
        />

        <RightSidebar 
          coverImage={coverImage} isGeneratingCover={false} onGenerateCover={() => {}}
          summary={summary} setSummary={setSummary} isGeneratingSummary={false} onGenerateSummary={() => {}}
        />
      </div>
    </div>
  );
};

export default EditorView;
