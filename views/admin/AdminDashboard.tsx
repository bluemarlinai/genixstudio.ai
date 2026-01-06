
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemHealth } from '../../types';

const revenueData = [
  { name: '1月', revenue: 45000 },
  { name: '2月', revenue: 52000 },
  { name: '3月', revenue: 61000 },
];

const AdminDashboard: React.FC = () => {
  const healthMetrics: SystemHealth[] = [
    { service: 'Gemini 3 Pro API', status: 'healthy', latency: '240ms' },
    { service: 'Veo Video Engine', status: 'degraded', latency: '4.2s' },
    { service: 'CDN - Image Assets', status: 'healthy', latency: '45ms' },
    { service: 'PostgreSQL DB', status: 'healthy', latency: '12ms' },
  ];

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">管理中心概况</h1>
          <p className="text-studio-sub mt-2">监控基础设施、用户增长及平台营收表现。</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full flex items-center gap-2 border border-green-100">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            所有系统运行正常
          </div>
        </div>
      </header>

      {/* Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-studio-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${
                m.status === 'healthy' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {m.status}
              </span>
              <span className="text-xs font-bold text-studio-sub">{m.latency}</span>
            </div>
            <h4 className="text-sm font-black text-studio-dark">{m.service}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-studio-border shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black tracking-tight">MRR (月经常性收入)</h3>
            <span className="text-2xl font-black text-primary">¥158,200</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#137fec" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#617589', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#137fec" strokeWidth={4} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Usage stats */}
        <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-8 shadow-2xl">
          <h3 className="text-lg font-black text-indigo-300">AI 算力消耗</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                <span>Gemini Tokens</span>
                <span>82%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-400 w-[82%] rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-widest">
                <span>Veo GPU Units</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 w-[45%] rounded-full shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
              当前预测: 本月 API 支出将达到 <span className="text-white">¥12,400</span>。预算盈余 <span className="text-green-400">¥3,600</span>。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
