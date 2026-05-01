'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Bot, ArrowRight, Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const storeUser = (payload: object) => {
    try { localStorage.setItem('banso_user', JSON.stringify(payload)); } catch {}
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('メールアドレスとパスワードを入力してください。'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    storeUser({ name: '山田太郎', email, role: '管理者', company: 'サンプル物流株式会社', loginAt: new Date().toISOString() });
    router.push('/dashboard');
  };

  const handleDemo = () => {
    storeUser({ name: 'デモユーザー', email: 'demo@banso.ai', role: '管理者', company: 'サンプル物流株式会社', isDemo: true });
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7F0] via-white to-[#E8EDE3] px-4 py-12 overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#92D050]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00C09A]/10 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#334926] shadow-md">
              <span className="text-[#92D050] font-black text-xl select-none">B</span>
            </div>
            <span className="text-3xl font-black text-[#334926] tracking-tight">BanSo</span>
          </div>
          <p className="text-[#5C6657] text-sm font-medium">経営の未来を、AIと共に</p>
        </div>
        <div className="rounded-2xl border border-[#E8EDE3] bg-white p-8 shadow-md">
          <h1 className="mb-6 text-xl font-bold text-[#1A2016]">ログイン</h1>
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-[#1A2016]">メールアドレス</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="yamada@example.co.jp"
                className="w-full rounded-xl border border-[#E8EDE3] bg-[#F5F7F0] px-4 py-2.5 text-sm outline-none focus:border-[#334926] focus:bg-white focus:ring-2 focus:ring-[#334926]/10" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-[#1A2016]">パスワード</label>
                <Link href="/forgot-password" className="text-xs text-[#334926] hover:underline">パスワードを忘れた方</Link>
              </div>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E8EDE3] bg-[#F5F7F0] px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#334926] focus:bg-white focus:ring-2 focus:ring-[#334926]/10" />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C6657]/60"
                  onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>}
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#334926] py-3 text-sm font-semibold text-white hover:bg-[#2a3d1f] disabled:opacity-60 transition-all">
              {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <><span>ログイン</span><ArrowRight size={16} /></>}
            </button>
          </form>
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E8EDE3]" /><span className="text-xs text-[#5C6657]/60">または</span><div className="flex-1 h-px bg-[#E8EDE3]" />
          </div>
          <button type="button" onClick={handleDemo}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#334926]/30 bg-[#F5F7F0] py-3 text-sm font-semibold text-[#334926] hover:bg-[#334926]/5 transition-all">
            <Bot size={16} />デモを試す
          </button>
        </div>
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 text-sm text-[#5C6657]">
            <Building2 size={14} className="text-[#334926]" />
            <span><strong className="text-[#334926]">2,000社以上</strong>が利用中</span>
          </div>
          <p className="text-xs text-[#5C6657]/60">
            アカウントをお持ちでない方は <Link href="/register" className="text-[#334926] font-medium hover:underline">新規登録</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
