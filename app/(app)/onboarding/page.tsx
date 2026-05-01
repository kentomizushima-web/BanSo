'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Factory, ShoppingBag, Briefcase, Building2, Utensils, ChevronRight, ChevronLeft, Check, Bot, BarChart3, Wallet, TrendingUp, PieChart, Award } from 'lucide-react';

const INDUSTRIES = [
  { value: 'logistics',     label: '物流・運輸',     icon: <Truck size={22} />,       description: '配送・倉庫・輸送' },
  { value: 'manufacturing', label: '製造業',         icon: <Factory size={22} />,     description: '生産・加工・組立' },
  { value: 'retail',        label: '小売・卸売',     icon: <ShoppingBag size={22} />, description: '販売・仕入・EC' },
  { value: 'services',      label: 'サービス業',     icon: <Briefcase size={22} />,  description: 'コンサル・IT・金融' },
  { value: 'construction',  label: '建設・不動産',   icon: <Building2 size={22} />,  description: '建築・工事・不動産' },
  { value: 'food',          label: '飲食・食品',     icon: <Utensils size={22} />,   description: 'レストラン・食品加工' },
  { value: 'it',            label: 'IT・テクノロジー', icon: <Bot size={22} />,        description: 'SaaS・開発・通信' },
  { value: 'other',         label: 'その他',         icon: <Building2 size={22} />,  description: '上記以外の業種' },
] as const;

const REVENUE_RANGES = [
  { value: 'under_100m', label: '1億円未満' }, { value: '100m_500m', label: '1億〜5億円' },
  { value: '500m_1b', label: '5億〜10億円' }, { value: '1b_5b', label: '10億〜50億円' },
  { value: 'over_5b', label: '50億円以上' },
] as const;

const EMPLOYEE_COUNTS = [
  { value: 'under_10', label: '10名未満' }, { value: '10_50', label: '10〜50名' },
  { value: '50_100', label: '50〜100名' }, { value: '100_300', label: '100〜300名' },
  { value: 'over_300', label: '300名以上' },
] as const;

const GOALS = [
  { value: 'budget',       label: '予算・予実管理',   icon: <BarChart3 size={20} />, description: '計画と実績の差異を把握' },
  { value: 'cashflow',     label: '資金繰り管理',     icon: <Wallet size={20} />,   description: '13週キャッシュフロー予測' },
  { value: 'investment',   label: '投資計画',         icon: <PieChart size={20} />, description: 'ROI分析と投資優先度決定' },
  { value: 'benchmarking', label: 'ベンチマーク分析', icon: <Award size={20} />,    description: '業界平均との比較' },
  { value: 'kpi',          label: 'KPI管理',          icon: <TrendingUp size={20} />, description: '経営指標のリアルタイム追跡' },
  { value: 'reporting',    label: 'レポート作成',     icon: <BarChart3 size={20} />, description: 'AIによる自動レポート生成' },
] as const;

const STEP_LABELS = ['業種選択', '企業規模', '利用目的'];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [completing, setCompleting] = useState(false);
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [employees, setEmployees] = useState('');
  const [goals, setGoals] = useState<string[]>([]);

  const canProceed = (step === 1 && industry !== '') || (step === 2 && revenue !== '' && employees !== '') || (step === 3 && goals.length > 0);

  const handleComplete = async () => {
    setCompleting(true);
    try { localStorage.setItem('banso_onboarding', JSON.stringify({ industry, revenue, employees, goals })); } catch {}
    await new Promise(r => setTimeout(r, 1200));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7F0] via-white to-[#E8EDE3] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#334926]"><span className="text-[#92D050] font-black text-base">B</span></div>
            <span className="text-2xl font-black text-[#334926]">BanSo</span>
          </div>
          <p className="text-[#5C6657] text-sm">最適なダッシュボードを作成するために、いくつかご質問させてください</p>
        </div>

        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            {STEP_LABELS.map((label, i) => {
              const sn = i + 1; const done = step > sn; const active = step === sn;
              return (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div className={['flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all', done ? 'bg-[#334926] text-white' : active ? 'bg-[#334926] text-white ring-4 ring-[#334926]/20' : 'bg-[#E8EDE3] text-[#5C6657]'].join(' ')}>
                    {done ? <Check size={12} /> : sn}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${active ? 'text-[#334926]' : 'text-[#5C6657]/50'}`}>{label}</span>
                  {i < STEP_LABELS.length - 1 && <div className="flex-1 h-0.5 bg-[#E8EDE3]"><div className="h-full bg-[#334926] transition-all" style={{ width: done ? '100%' : '0%' }} /></div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E8EDE3] bg-white p-6 shadow-md sm:p-8">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center"><h2 className="text-xl font-bold">業種を選択してください</h2><p className="text-sm text-[#5C6657] mt-1">業種に合わせた財務指標を提供します</p></div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {INDUSTRIES.map(ind => (
                  <button key={ind.value} onClick={() => setIndustry(ind.value)}
                    className={['flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all', industry === ind.value ? 'border-[#334926] bg-[#334926]/5' : 'border-[#E8EDE3] bg-white hover:border-[#334926]/40'].join(' ')}>
                    <span className={industry === ind.value ? 'text-[#334926]' : 'text-[#5C6657]'}>{ind.icon}</span>
                    <span className={`text-sm font-semibold ${industry === ind.value ? 'text-[#334926]' : 'text-[#1A2016]'}`}>{ind.label}</span>
                    {industry === ind.value && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#334926]"><Check size={11} className="text-white" /></span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center"><h2 className="text-xl font-bold">企業規模を教えてください</h2></div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">年間売上規模</h3>
                <div className="grid grid-cols-5 gap-2">
                  {REVENUE_RANGES.map(r => <button key={r.value} onClick={() => setRevenue(r.value)} className={['rounded-xl border-2 px-2 py-3 text-sm font-medium transition-all', revenue === r.value ? 'border-[#334926] bg-[#334926] text-white' : 'border-[#E8EDE3] bg-white text-[#5C6657] hover:border-[#334926]/40'].join(' ')}>{r.label}</button>)}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">従業員数</h3>
                <div className="grid grid-cols-5 gap-2">
                  {EMPLOYEE_COUNTS.map(e => <button key={e.value} onClick={() => setEmployees(e.value)} className={['rounded-xl border-2 px-2 py-3 text-sm font-medium transition-all', employees === e.value ? 'border-[#334926] bg-[#334926] text-white' : 'border-[#E8EDE3] bg-white text-[#5C6657] hover:border-[#334926]/40'].join(' ')}>{e.label}</button>)}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center"><h2 className="text-xl font-bold">利用目的を選択してください</h2><p className="text-sm text-[#5C6657] mt-1">複数選択可能です</p></div>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map(g => {
                  const sel = goals.includes(g.value);
                  return (
                    <button key={g.value} onClick={() => setGoals(prev => sel ? prev.filter(x => x !== g.value) : [...prev, g.value])}
                      className={['flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all', sel ? 'border-[#334926] bg-[#334926]/5' : 'border-[#E8EDE3] bg-white hover:border-[#334926]/40'].join(' ')}>
                      <span className={`shrink-0 rounded-xl p-2 ${sel ? 'bg-[#334926] text-white' : 'bg-[#F5F7F0] text-[#5C6657]'}`}>{g.icon}</span>
                      <div><div className={`text-sm font-semibold ${sel ? 'text-[#334926]' : 'text-[#1A2016]'}`}>{g.label}</div><div className="text-xs text-[#5C6657] mt-0.5">{g.description}</div></div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
              className="flex items-center gap-2 rounded-xl border border-[#E8EDE3] bg-white px-5 py-2.5 text-sm font-medium text-[#5C6657] hover:bg-[#F5F7F0] disabled:opacity-0 disabled:pointer-events-none">
              <ChevronLeft size={16} />戻る
            </button>
            {step < 3
              ? <button onClick={() => setStep(s => s + 1)} disabled={!canProceed} className="flex items-center gap-2 rounded-xl bg-[#334926] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2a3d1f] disabled:opacity-40">次へ<ChevronRight size={16} /></button>
              : <button onClick={handleComplete} disabled={!canProceed || completing} className="flex items-center gap-2 rounded-xl bg-[#334926] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2a3d1f] disabled:opacity-40">
                  {completing ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />AIが生成中...</> : <><Bot size={16} />ダッシュボードを生成する</>}
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
