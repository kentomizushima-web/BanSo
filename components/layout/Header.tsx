'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, Bell, Bot, ChevronDown, Settings, LogOut, User, ChevronRight } from 'lucide-react';

const ROUTE_LABELS: Record<string, string> = {
  '/dashboard': 'ダッシュボード',
  '/ai-assistant': 'AI経営アシスタント',
  '/finance/statements': '財務三表',
  '/finance/kpi': 'KPI管理',
  '/finance/budget': '予実比較',
  '/finance/simulation': 'シミュレーション',
  '/finance/cashflow': '資金繰り',
  '/finance/investment': '投資計画',
  '/finance/benchmark': 'ベンチマーク',
  '/initiatives/board': '施策ボード',
  '/initiatives/alerts': 'アラート',
  '/experts/chat': '専門家チャット',
  '/reports': 'レポート',
};

const SECTION_LABELS: Record<string, string> = {
  finance: '財務管理',
  initiatives: '施策管理',
  experts: '専門家',
};

const NOTIFICATIONS = [
  { title: 'KPIアラート',   body: '売上総利益率が目標を下回っています', time: '5分前',   dot: 'bg-[#FFEC47]' },
  { title: '施策更新',       body: '「物流コスト削減」施策が完了しました', time: '1時間前', dot: 'bg-[#92D050]' },
  { title: 'AIレポート完成', body: '月次財務レポートが生成されました',   time: '3時間前', dot: 'bg-[#00C09A]' },
];

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: { label: string; href: string }[] = [{ label: 'ホーム', href: '/dashboard' }];
  if (segments.length > 0) {
    const section = segments[0];
    if (SECTION_LABELS[section] && segments.length > 1)
      crumbs.push({ label: SECTION_LABELS[section], href: `/${section}` });
    const full = '/' + segments.join('/');
    const label = ROUTE_LABELS[full];
    if (label && full !== '/dashboard') crumbs.push({ label, href: full });
  }
  return (
    <nav className="hidden sm:flex items-center gap-1 text-sm">
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={13} className="text-[#5C6657]" />}
          {i === crumbs.length - 1
            ? <span className="font-semibold text-[#1A2016]">{c.label}</span>
            : <Link href={c.href} className="text-[#5C6657] hover:text-[#334926]">{c.label}</Link>
          }
        </span>
      ))}
    </nav>
  );
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [userOpen, setUserOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-3 border-b border-[#E8EDE3] bg-white px-4 shadow-sm">
      <button className="lg:hidden flex items-center justify-center h-9 w-9 rounded-xl hover:bg-[#F5F7F0] text-[#5C6657]" onClick={onMenuClick}>
        <Menu size={20} />
      </button>
      <div className="flex-1 min-w-0"><Breadcrumb /></div>
      <div className="hidden md:flex items-center gap-2 h-9 w-56 rounded-xl border border-[#E8EDE3] bg-[#F5F7F0] px-3 text-sm text-[#5C6657] cursor-text">
        <Search size={15} className="shrink-0 opacity-70" />
        <span className="flex-1 text-[#5C6657]/50">検索...</span>
        <kbd className="hidden xl:inline-flex h-5 items-center rounded border border-[#E8EDE3] bg-white px-1.5 text-[10px] text-[#5C6657]/60">⌘K</kbd>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl hover:bg-[#F5F7F0] text-[#5C6657]"
          onClick={() => { setNotifOpen(v => !v); setUserOpen(false); }}>
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-4 w-4 rounded-full bg-[#FFEC47] text-[#1A2016] text-[9px] font-bold flex items-center justify-center border-2 border-white">3</span>
        </button>
        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-[#E8EDE3] bg-white shadow-md z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8EDE3]">
                <span className="font-semibold text-[#1A2016] text-sm">通知</span>
                <button className="text-xs text-[#00C09A] font-medium">すべて既読</button>
              </div>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-[#F5F7F0] cursor-pointer border-b border-[#F5F7F0]">
                  <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${n.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#1A2016]">{n.title}</div>
                    <div className="text-xs text-[#5C6657] truncate">{n.body}</div>
                  </div>
                  <span className="text-[10px] text-[#5C6657]/60 shrink-0">{n.time}</span>
                </div>
              ))}
              <div className="px-4 py-2.5 border-t border-[#E8EDE3] text-center">
                <span className="text-xs text-[#334926] font-medium cursor-pointer">すべての通知を見る</span>
              </div>
            </div>
          </>
        )}
      </div>

      <Link href="/ai-assistant" className="hidden sm:flex items-center gap-2 h-9 rounded-xl bg-[#334926] px-4 text-sm font-medium text-white hover:bg-[#2a3d1f] shadow-sm shrink-0">
        <Bot size={16} /><span>AIに相談</span>
      </Link>

      {/* User dropdown */}
      <div className="relative">
        <button className="flex items-center gap-2 rounded-xl py-1.5 pl-1.5 pr-2.5 hover:bg-[#F5F7F0]"
          onClick={() => { setUserOpen(v => !v); setNotifOpen(false); }}>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#92D050] to-[#00C09A] flex items-center justify-center">
            <span className="text-[#334926] text-xs font-bold">山</span>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-[#1A2016]">山田太郎</div>
            <div className="text-[10px] text-[#5C6657]">管理者</div>
          </div>
          <ChevronDown size={13} className="text-[#5C6657] hidden md:block" />
        </button>
        {userOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setUserOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[#E8EDE3] bg-white shadow-md z-50 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#E8EDE3]">
                <div className="font-semibold text-[#1A2016] text-sm">山田太郎</div>
                <div className="text-xs text-[#5C6657] truncate">yamada@sample-logistics.co.jp</div>
              </div>
              <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#5C6657] hover:bg-[#F5F7F0]" onClick={() => setUserOpen(false)}>
                <User size={15} />プロフィール
              </Link>
              <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#5C6657] hover:bg-[#F5F7F0]" onClick={() => setUserOpen(false)}>
                <Settings size={15} />設定
              </Link>
              <div className="border-t border-[#E8EDE3] mt-1 pt-1">
                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                  <LogOut size={15} />ログアウト
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
