
import React, { useState, useEffect } from 'react';

interface PaymentPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack, onSuccess }) => {
  const [method, setMethod] = useState<'WECHAT' | 'ALIPAY'>('WECHAT');
  const [qrStatus, setQrStatus] = useState<'LOADING' | 'READY'>('LOADING');

  useEffect(() => {
    setQrStatus('LOADING');
    const timer = setTimeout(() => setQrStatus('READY'), 1000);
    return () => clearTimeout(timer);
  }, [method]);

  return (
    <div className="min-h-screen bg-studio-bg flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[56px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-studio-border overflow-hidden">
        {/* Left: Order Info */}
        <div className="p-12 lg:p-16 space-y-10 border-r border-studio-border">
          <header className="space-y-4">
            <button onClick={onBack} className="flex items-center gap-2 text-studio-sub hover:text-primary transition-colors mb-8">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              <span className="text-xs font-black uppercase tracking-widest">返回修改方案</span>
            </button>
            <h1 className="text-3xl font-black text-studio-dark tracking-tight">确认订单信息</h1>
            <p className="text-studio-sub text-sm">请核对订阅详情并选择支付方式</p>
          </header>

          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-studio-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined">workspace_premium</span>
                </div>
                <div>
                  <p className="text-sm font-black">Creator Studio Pro</p>
                  <p className="text-[10px] text-studio-sub font-bold">按月订阅方案</p>
                </div>
              </div>
              <span className="text-lg font-black text-studio-dark">¥99.00</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium text-studio-sub">
                <span>小计</span>
                <span>¥99.00</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-studio-sub">
                <span>平台手续费</span>
                <span>¥0.00</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-black text-studio-dark">应付总额</span>
                <span className="text-3xl font-black text-primary">¥99.00</span>
              </div>
            </div>
          </div>

          <div className="pt-10 flex items-center gap-4 border-t border-studio-border">
            <span className="material-symbols-outlined text-emerald-500 text-[32px]">verified_user</span>
            <div>
              <p className="text-xs font-black text-studio-dark uppercase tracking-widest">安全支付保护</p>
              <p className="text-[10px] text-studio-sub leading-relaxed">您的支付信息已通过 SSL 加密传输。Creator Studio 不会存储您的银行卡或钱包密码。</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Method & QR */}
        <div className="bg-slate-50 p-12 lg:p-16 flex flex-col items-center justify-center text-center space-y-8">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-studio-border w-full">
            <button 
              onClick={() => setMethod('WECHAT')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${method === 'WECHAT' ? 'bg-green-500 text-white shadow-lg' : 'text-studio-sub hover:bg-gray-50'}`}
            >
              <span className="material-symbols-outlined text-[18px] fill-icon">chat</span>
              微信支付
            </button>
            <button 
              onClick={() => setMethod('ALIPAY')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${method === 'ALIPAY' ? 'bg-blue-500 text-white shadow-lg' : 'text-studio-sub hover:bg-gray-50'}`}
            >
              <span className="material-symbols-outlined text-[18px] fill-icon">payments</span>
              支付宝
            </button>
          </div>

          <div className="relative group">
            <div className="bg-white p-6 rounded-[40px] border-4 border-white shadow-2xl relative z-10">
              <div className={`w-64 h-64 rounded-3xl bg-studio-bg flex items-center justify-center overflow-hidden transition-opacity duration-300 ${qrStatus === 'READY' ? 'opacity-100' : 'opacity-40'}`}>
                {qrStatus === 'LOADING' ? (
                  <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                ) : (
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${method === 'WECHAT' ? 'wx-pay-mock' : 'ali-pay-mock'}`} 
                    className="w-full h-full object-contain cursor-pointer"
                    alt="Payment QR"
                    onClick={onSuccess} // Mock success on click
                  />
                )}
              </div>
            </div>
            
            {/* Pulsing Status Label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border border-studio-border shadow-lg z-20 whitespace-nowrap flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${method === 'WECHAT' ? 'bg-green-500' : 'bg-blue-500'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-studio-dark">等待扫码确认</span>
            </div>
          </div>

          <p className="text-xs text-studio-sub max-w-xs font-medium leading-relaxed pt-4">
            打开{method === 'WECHAT' ? '微信' : '支付宝'}扫一扫，确认支付。支付成功后您的账户将自动升级。
          </p>

          <button 
            onClick={onSuccess} 
            className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline pt-4"
          >
            [ 模拟支付成功 ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
