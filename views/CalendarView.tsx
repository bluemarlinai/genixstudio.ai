
import React from 'react';

const CalendarView: React.FC = () => {
  const daysOfWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  // Generating mock calendar days for current month
  const calendarDays = Array.from({ length: 35 }, (_, i) => ({
    day: (i % 31) + 1,
    isCurrentMonth: i >= 0 && i < 31,
    posts: i === 12 ? [{ title: 'AI 写作未来', platform: 'wechat' }] : 
           i === 15 ? [{ title: 'SaaS 设计趋势', platform: 'medium' }] :
           i === 22 ? [{ title: '周五复盘总结', platform: 'zhihu' }] : []
  }));

  return (
    <div className="p-8 max-w-[90rem] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-studio-dark">发布日历</h1>
          <p className="text-studio-sub mt-2">统筹全平台内容发布节奏，把握流量高峰。</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-studio-border rounded-xl text-sm font-bold text-studio-sub hover:bg-studio-bg transition-all">
            本月
          </button>
          <div className="flex bg-gray-100 p-1 rounded-xl">
             <button className="p-2 hover:bg-white rounded-lg transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
             <button className="p-2 hover:bg-white rounded-lg transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[40px] border border-studio-border shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-studio-border bg-slate-50/50">
          {daysOfWeek.map(day => (
            <div key={day} className="py-4 text-center text-[10px] font-black text-studio-sub uppercase tracking-widest border-r border-studio-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 grid-rows-5 h-[800px]">
          {calendarDays.map((date, i) => (
            <div 
              key={i} 
              className={`p-4 border-r border-b border-studio-border last:border-r-0 group hover:bg-studio-bg/30 transition-colors ${!date.isCurrentMonth ? 'bg-slate-50/50' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-black ${date.isCurrentMonth ? 'text-studio-dark' : 'text-gray-300'}`}>
                  {date.day}
                </span>
                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-primary/10 rounded text-primary transition-all">
                  <span className="material-symbols-outlined text-[16px]">add_box</span>
                </button>
              </div>
              
              <div className="space-y-1">
                {date.posts.map((post, idx) => (
                  <div key={idx} className="p-2 bg-primary/5 border border-primary/10 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors">
                    <p className="text-[10px] font-black text-primary truncate leading-none">{post.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-[8px] text-studio-sub uppercase font-bold tracking-tighter">
                      <span className="material-symbols-outlined text-[12px]">{post.platform === 'wechat' ? 'chat' : 'article'}</span>
                      {post.platform}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
