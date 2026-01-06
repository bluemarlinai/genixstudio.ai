
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'WECHAT'>('EMAIL');
  const [qrStatus, setQrStatus] = useState<'LOADING' | 'READY' | 'EXPIRED'>('LOADING');

  useEffect(() => {
    if (loginMethod === 'WECHAT') {
      setQrStatus('LOADING');
      const timer = setTimeout(() => {
        setQrStatus('READY');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [loginMethod]);

  const handleWechatLogin = () => {
    setLoginMethod('WECHAT');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-studio-bg px-6 font-sans">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-xl shadow-primary/10 overflow-hidden">
            <img src="assets/logo.png" alt="Genix Studio Logo" className="w-10 h-10 object-contain" />
          </div>
          <h2 className="text-3xl font-black text-studio-dark tracking-tight">
            {loginMethod === 'EMAIL' ? '欢迎回来' : '微信登录'}
          </h2>
          <p className="text-studio-sub mt-2">
            {loginMethod === 'EMAIL' 
              ? '登录您的 Genix Studio 账户以继续' 
              : '请使用微信扫一扫安全登录'}
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-gray-200 border border-studio-border relative overflow-hidden transition-all duration-500">
          {loginMethod === 'EMAIL' ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-2">电子邮箱</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 rounded-2xl border-studio-border bg-studio-bg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  placeholder="alex@genixstudio.ai"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">密码</label>
                  <a href="#" className="text-xs font-bold text-primary hover:underline">忘记密码?</a>
                </div>
                <input 
                  type="password" 
                  className="w-full px-5 py-4 rounded-2xl border-studio-border bg-studio-bg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
              <button 
                onClick={onLogin}
                className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all mt-4"
              >
                进入工作区
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-studio-border"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-400 tracking-widest">
                  <span className="bg-white px-4">或者通过以下方式</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3.5 border border-studio-border rounded-2xl hover:bg-studio-bg transition-all text-xs font-bold">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4 opacity-70" alt="Google" />
                  Google
                </button>
                <button 
                  onClick={handleWechatLogin}
                  className="flex items-center justify-center gap-2 py-3.5 border border-studio-border rounded-2xl hover:bg-studio-bg hover:border-green-200 transition-all text-xs font-bold text-green-600"
                >
                  <span className="material-symbols-outlined text-[18px] fill-icon">chat</span>
                  微信扫码
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <div className="relative group mb-8">
                <div className={`w-52 h-52 rounded-3xl bg-studio-bg border border-studio-border p-4 flex items-center justify-center transition-all ${qrStatus === 'READY' ? 'opacity-100' : 'opacity-40'}`}>
                  {qrStatus === 'LOADING' ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <span className="text-[10px] font-bold text-studio-sub uppercase tracking-widest">生成中...</span>
                    </div>
                  ) : (
                    <div className="relative">
                       {/* Mocking a high-fidelity QR Code */}
                       <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=genix-studio-login-mock" 
                        alt="WeChat QR Code" 
                        className="w-full h-full rounded-xl"
                        onClick={onLogin} // Simulated scan success on click
                       />
                       <div className="absolute inset-0 border-2 border-primary/10 rounded-xl pointer-events-none"></div>
                    </div>
                  )}
                </div>
                {qrStatus === 'READY' && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-studio-border shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] font-black text-studio-dark uppercase tracking-widest">等待扫码</span>
                  </div>
                )}
              </div>

              <div className="text-center space-y-4 w-full">
                <div className="flex items-center justify-center gap-6 text-studio-sub">
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                    <span className="text-[10px] font-bold">扫一扫</span>
                  </div>
                  <div className="w-px h-6 bg-studio-border"></div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">touch_app</span>
                    <span className="text-[10px] font-bold">确认登录</span>
                  </div>
                </div>

                <button 
                  onClick={() => setLoginMethod('EMAIL')}
                  className="w-full py-4 text-xs font-black text-studio-sub uppercase tracking-widest hover:text-primary hover:bg-primary/5 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  返回账号登录
                </button>
              </div>

              {/* Security Hint */}
              <div className="mt-8 pt-6 border-t border-studio-border w-full flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-studio-sub">verified_user</span>
                <span className="text-[10px] font-bold text-studio-sub uppercase tracking-widest">微信安全登录保护中</span>
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-sm font-medium text-studio-sub">
          还没有账户? <a href="#" className="text-primary font-bold hover:underline">立即注册</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
