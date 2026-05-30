import { useState, useEffect } from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function Login({ onLogin }: LoginProps) {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem('rememberedAccount');
    if (savedAccount) {
      setAccount(savedAccount);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = () => {
    if (!account || !password || !captchaInput) {
      alert('请填写完整的登录信息');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaCode) {
      alert('验证码错误');
      setCaptchaInput('');
      setCaptchaCode(generateCaptcha());
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedAccount', account);
    } else {
      localStorage.removeItem('rememberedAccount');
    }

    onLogin();
  };

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
  };

  return (
    <div className="size-full flex bg-[#f5f5f7]">
      {/* Left Side - Image/Quote Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0071e3] to-[#005bb5] p-16 flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold tracking-tight">知识管理系统</h1>
            <p className="text-xl text-white/90">让知识成为企业最宝贵的资产</p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed">"知识就是力量"</p>
              <p className="text-sm text-white/70 mt-2">— 弗朗西斯·培根</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed">"科学技术是第一生产力"</p>
              <p className="text-sm text-white/70 mt-2">— 邓小平</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed">"知识是唯一不会因分享而减少的财富"</p>
              <p className="text-sm text-white/70 mt-2">— 托马斯·杰斐逊</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#1d1d1f] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 120 120" className="w-9 h-9">
                <path
                  d="M20 30 L40 20 L40 80 L20 90 Z M50 15 L70 5 L70 95 L50 105 Z M80 20 L100 10 L100 70 L80 80 Z"
                  fill="currentColor"
                  className="text-white"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-[#1d1d1f] mb-2">欢迎回来</h2>
            <p className="text-[#86868b]">请登录您的账户</p>
          </div>

          <div className="space-y-5">
            {/* Account Input */}
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">账号</label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="请输入账号"
                className="w-full px-4 py-3 bg-white rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[15px] text-[#1d1d1f]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">密码</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[15px] text-[#1d1d1f] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-[#f5f5f7] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            {/* Captcha Input */}
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] mb-2">验证码</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="请输入验证码"
                  className="flex-1 px-4 py-3 bg-white rounded-xl border border-[#d2d2d7] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 focus:border-[#0071e3] transition-all text-[15px] text-[#1d1d1f]"
                  maxLength={4}
                />
                <div className="flex items-center gap-2">
                  <div className="w-28 h-[48px] bg-gradient-to-br from-[#0071e3]/10 to-[#0071e3]/20 rounded-xl flex items-center justify-center border border-[#0071e3]/30 select-none">
                    <span className="text-xl font-bold text-[#0071e3] tracking-widest font-mono">
                      {captchaCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="p-3 rounded-xl bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] hover:border-[#0071e3]/30 transition-all"
                    title="刷新验证码"
                  >
                    <RefreshCw className="w-5 h-5 text-[#86868b]" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
              />
              <label htmlFor="rememberMe" className="ml-2 text-[14px] text-[#1d1d1f] cursor-pointer">
                记住我
              </label>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl font-medium text-[15px] transition-all duration-150 shadow-sm hover:shadow-md"
            >
              登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
