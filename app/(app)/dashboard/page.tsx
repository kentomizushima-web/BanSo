'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, TrendingDown, Bot, ArrowRight, ChevronDown, AlertTriangle, Info } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { kpis, kpiProgress, actions, alerts, monthlyPL } from '@/lib/mock-data'
import { formatCurrency, formatPercent } from '@/lib/utils'

const MONTHS = ['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月']

export default function DashboardPage() {
  const [alertsExpanded, setAlertsExpanded] = useState(false)

  const chartData = monthlyPL.map((pl, i) => ({
    month: MONTHS[i],
    '売上高': +(pl.revenue / 1_000_000).toFixed(1),
    '粗利益': +(pl.grossProfit / 1_000_000).toFixed(1),
    '営業利益': +(pl.operatingProfit / 1_000_000).toFixed(1),
  }))

  const kpiChartData = kpiProgress.map(k => ({ name: k.name, '達成率': k.achievement }))

  return (
    <div className="space-y-6">
      {/* AI Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#334926] to-[#2a5a1f] p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#92D050]/20">
            <Bot size={20} className="text-[#92D050]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium leading-relaxed">
              山田社長、おはようございます。今月の粗利は前月比<strong className="text-[#92D050]">+8.2%</strong>と好調です。一方、営業CFが前月比-15%と要注意です。
            </p>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-white/70">
              <span>① 消耗品費の異常増加</span>
              <span>② 大口顧客へのアップセル提案</span>
              <span>③ 燃料費削減施策の進捗</span>
            </div>
          </div>
          <Link href="/ai-assistant" className="hidden sm:flex shrink-0 items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
            AIに相談 <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(kpi => (
          <Link key={kpi.id} href="/finance/kpi"
            className="group rounded-2xl bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-[#E8EDE3]">
            <div className="text-sm text-[#5C6657] font-medium">{kpi.name}</div>
            <div className="mt-2 text-2xl font-bold text-[#1A2016]">{formatCurrency(kpi.actual, true)}</div>
            <div className={`mt-1 flex items-center gap-1 text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {kpi.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {formatPercent(kpi.changePercent, true)} 前月比
            </div>
            {kpi.id === 'cash-balance' && <div className="mt-1 text-xs text-[#5C6657]">ALIVE期間 8.2ヶ月</div>}
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E8EDE3]">
          <h3 className="font-semibold text-[#1A2016] mb-1">月次PL推移</h3>
          <p className="text-xs text-[#5C6657] mb-4">単位：百万円</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`¥${v}M`]} />
              <Line type="monotone" dataKey="売上高" stroke="#334926" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="粗利益" stroke="#92D050" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="営業利益" stroke="#00C09A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex gap-4 text-xs text-[#5C6657]">
            {[{c:'#334926',l:'売上高'},{c:'#92D050',l:'粗利益'},{c:'#00C09A',l:'営業利益'}].map(x => (
              <span key={x.l} className="flex items-center gap-1">
                <span className="h-2 w-4 rounded-full inline-block" style={{backgroundColor:x.c}} />{x.l}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E8EDE3]">
          <h3 className="font-semibold text-[#1A2016] mb-1">KPI達成状況</h3>
          <p className="text-xs text-[#5C6657] mb-4">展開率 (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={kpiChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE3" />
              <XAxis type="number" domain={[0, 130]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={68} />
              <Tooltip formatter={(v: number) => [`${v}%`]} />
              <Bar dataKey="達成率" fill="#334926" radius={[0,4,4,0]}
                label={{ position: 'right', fontSize: 11, formatter: (v: number) => `${v}%` }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Actions */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E8EDE3]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1A2016]">今週の推奨施策 TOP3</h3>
          <Link href="/initiatives/board" className="text-sm text-[#334926] hover:underline flex items-center gap-1">施策ボードで見る <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {actions.filter(a => a.status !== 'done').slice(0, 3).map((action, i) => (
            <Link key={action.id} href={`/initiatives/${action.id}`}
              className="rounded-xl border border-[#E8EDE3] p-4 hover:border-[#334926]/30 hover:shadow-sm transition-all block">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${i===0?'bg-red-100 text-red-600':i===1?'bg-yellow-100 text-yellow-700':'bg-[#F5F7F0] text-[#5C6657]'}`}>
                  {i===0?'高':'中'}優先度
                </span>
                {action.aiGenerated && <span className="text-[10px] bg-[#334926]/10 text-[#334926] px-2 py-0.5 rounded-full font-medium">AI生成</span>}
              </div>
              <h4 className="text-sm font-semibold text-[#1A2016] leading-snug">{action.title}</h4>
              <div className="mt-2 text-xs text-green-600 font-medium">効果見込み {formatCurrency(action.impactAmount, true)}/年</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-[#334926]/15 flex items-center justify-center text-[9px] font-bold text-[#334926]">{action.assignee.avatar}</div>
                  <span className="text-xs text-[#5C6657]">{action.assignee.name}</span>
                </div>
                <span className="text-[10px] text-[#5C6657]">{action.dueDate.slice(5).replace('-','/')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-2xl bg-white shadow-sm border border-[#E8EDE3] overflow-hidden">
        <button className="flex w-full items-center justify-between p-6 hover:bg-[#F5F7F0]" onClick={() => setAlertsExpanded(v => !v)}>
          <div className="flex items-center gap-3">
            <AlertTriangle size={18} className="text-[#FFEC47]" />
            <span className="font-semibold text-[#1A2016]">{alerts.filter(a=>!a.isRead).length}件のアラートがあります</span>
          </div>
          <ChevronDown size={16} className={`text-[#5C6657] transition-transform ${alertsExpanded?'rotate-180':''}`} />
        </button>
        {alertsExpanded && (
          <div className="border-t border-[#E8EDE3] divide-y divide-[#F5F7F0]">
            {alerts.slice(0,4).map(alert => (
              <div key={alert.id} className="flex items-start gap-3 px-6 py-4">
                {alert.severity==='high' ? <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                  : alert.severity==='medium' ? <AlertTriangle size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                  : <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1A2016]">{alert.title}</div>
                  <div className="text-xs text-[#5C6657] mt-0.5">{alert.message}</div>
                </div>
                {!alert.isRead && <span className="h-2 w-2 rounded-full bg-[#334926] shrink-0 mt-1.5" />}
              </div>
            ))}
            <div className="px-6 py-3 bg-[#F5F7F0]">
              <Link href="/initiatives/alerts" className="text-sm text-[#334926] hover:underline">すべてのアラートを見る →</Link>
            </div>
          </div>
        )}
      </div>

      {/* Expert */}
      <div className="rounded-2xl border border-[#E8EDE3] bg-gradient-to-r from-[#F5F7F0] to-white p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[#334926] flex items-center justify-center shrink-0">
            <span className="text-white font-bold">田</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1A2016]">田中税理士</span>
              <span className="text-[10px] bg-[#334926] text-white px-2 py-0.5 rounded-full">Pro+</span>
            </div>
            <p className="text-sm text-[#5C6657] mt-0.5">資金繰りについて確認事項があります。今週中にご連絡ください。</p>
          </div>
          <Link href="/experts/chat" className="shrink-0 rounded-xl bg-[#334926] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a3d1f]">返信する</Link>
        </div>
      </div>
    </div>
  )
}
