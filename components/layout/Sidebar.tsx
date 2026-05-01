'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, Bot, BarChart3, Target, TrendingUp, Sliders,
  Wallet, PieChart, Award, Kanban, Bell, MessageCircle, FileText,
  Settings, ChevronDown, ChevronRight, X,
} from 'lucide-react';

const navGroups = [
  {
    items: [
      { label: 'ダッシュボード',     href: '/dashboard',          icon: <LayoutDashboard size={18} /> },
      { label: 'AI経営アシスタント', href: '/ai-assistant',        icon: <Bot size={18} /> },
    ],
  },
  {
    groupLabel: '財務管理',
    items: [
      { label: '財務三表',       href: '/finance/statements', icon: <BarChart3 size={18} /> },
      { label: 'KPI管理',       href: '/finance/kpi',        icon: <Target size={18} /> },
      { label: '予実比較',       href: '/finance/budget',     icon: <TrendingUp size={18} /> },
      { label: 'シミュレーション', href: '/finance/simulation', icon: <Sliders size={18} /> },
      { label: '資金繰り',       href: '/finance/cashflow',   icon: <Wallet size={18} /> },
      { label: '投資計画',       href: '/finance/investment', icon: <PieChart size={18} /> },
      { label: 'ベンチマーク',   href: '/finance/benchmark',  icon: <Award size={18} /> },
    ],
  },
  {
    groupLabel: '施策管理',
    items: [
      { label: '施策ボード',     href: '/initiatives/board',  icon: <Kanban size={18} /> },
      { label: 'アラート',       href: '/initiatives/alerts', icon: <Bell size={18} />, badge: 3 },
    ],
  },
  {
    groupLabel: '専門家',
    items: [
      { label: '専門家チャット', href: '/experts/chat', icon: <MessageCircle size={18} /> },
    ],
  },
  {
    items: [
      { label: 'レポート', href: '/reports', icon: <FileText size={18} /> },
    ],
  },
];

interface SidebarProps { isOpen?: boolean; onClose?: () => void }

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) =>
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }));

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {isOpen && onClose && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside className={[
        'fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-[#334926] text-white transition-transform duration-300',
        'lg:static lg:translate-x-0 lg:shrink-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#92D050]">
              <span className="text-[#334926] font-black text-sm select-none">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-white text-base tracking-wide">BanSo</span>
              <span className="text-[10px] text-[#92D050] font-semibold tracking-wider uppercase mt-0.5">経営支援AI</span>
            </div>
          </div>
          {onClose && (
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-white/10" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Company selector */}
        <div className="px-3 py-3 border-b border-white/10">
          <button
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/10 transition-colors"
            onClick={() => setCompanyDropdownOpen(v => !v)}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="h-7 w-7 rounded-lg bg-[#00C09A] flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">サ</span>
              </div>
              <span className="text-sm font-medium truncate text-white/90">サンプル物流株式会社</span>
            </div>
            <ChevronDown size={15} className={`shrink-0 text-white/60 transition-transform ${companyDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {companyDropdownOpen && (
            <div className="mt-1 rounded-xl bg-[#2a3d1f] border border-white/10 py-1">
              <div className="px-3 py-1.5 text-[11px] text-white/40 font-semibold uppercase tracking-wider">会社を切り替え</div>
              <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-white/90 hover:bg-white/10">
                <div className="h-6 w-6 rounded-md bg-[#00C09A] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">サ</span>
                </div>
                サンプル物流株式会社
              </button>
              <button className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-white/50 hover:bg-white/10">
                <div className="h-6 w-6 rounded-md bg-white/20 flex items-center justify-center">
                  <span className="text-white/60">＋</span>
                </div>
                会社を追加
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {navGroups.map((group, gi) => (
            <div key={gi} className="mb-1">
              {group.groupLabel && (
                <button
                  className="flex w-full items-center justify-between px-3 py-1.5 mb-0.5"
                  onClick={() => toggleGroup(group.groupLabel!)}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                    {group.groupLabel}
                  </span>
                  <ChevronRight size={12} className={`text-white/30 transition-transform ${collapsedGroups[group.groupLabel!] ? '' : 'rotate-90'}`} />
                </button>
              )}
              {!collapsedGroups[group.groupLabel!] && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href} href={item.href}
                        onClick={onClose}
                        className={[
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                          active ? 'bg-[#92D050] text-[#1A2016] font-semibold' : 'text-white/75 hover:bg-white/10 hover:text-white',
                        ].join(' ')}
                      >
                        <span className={active ? 'text-[#334926]' : 'text-white/60'}>{item.icon}</span>
                        <span className="flex-1 truncate">{item.label}</span>
                        {'badge' in item && item.badge != null && (
                          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#FFEC47] px-1.5 text-[10px] font-bold text-[#1A2016]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User area */}
        <div className="border-t border-white/10 px-3 py-3">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/10 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#92D050] to-[#00C09A] flex items-center justify-center">
              <span className="text-[#334926] text-xs font-bold">山</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white">山田太郎</div>
              <div className="text-xs text-white/50">管理者</div>
            </div>
            <Link href="/settings" onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
              <Settings size={16} className="text-white/40" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
