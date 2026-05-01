'use client'
import { useState } from 'react'
import { Bot, Plus, TrendingUp, TrendingDown } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { kpis, kpiProgress, benchmarkData } from '@/lib/mock-data'
import { formatCurrency, formatPercent } from '@/lib/utils'

export default function KpiPage() {
  const [showAI, setShowAI] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2016]">KPI管理</h1>
          <p className="text-sm text-[#5C6657] mt-1">2025年3月実績</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAI(v=>!v)} className="flex items-center gap-2 rounded-xl border border-[#334926]/30 bg-[#F5F7F0] px-4 py-2 text-sm font-medium text-[#334926] hover:bg-[#334926]/5">
            <Bot size={15} />AI推奨
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-[#334926] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a3d1f]">
            <Plus size={15} />KPI追加
          </button>
        </div>
      </div>

      {showAI && (
        <div className="rounded-2xl bg-[#334926]/5 border border-[#334926]/20 p-5">
          <div className="flex items-start gap-3">
            <Bot size={18} className="text-[#334926] mt-0.5 shrink-0" />
            <div className="text-sm text-[#1A2016] leading-relaxed">
              <strong>貴社の粗利率は業界平均を+2.2pt上回っています。</strong>
              一方、稼働率（87.3%）は目標の90%に屐どかないです。受注管理改善による稼働率向上と、大口顧客へのアップセルによる案件単価向上の2点を優先的に取り組むことを推奨します。
            </div>
          </div>
        </div>
      )}

      {/* Main KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(kpi => (
          <div key={kpi.id} className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
            <div className="text-sm font-medium text-[#5C6657]">{kpi.name}</div>
            <div className="mt-2 text-2xl font-bold text-[#1A2016]">{formatCurrency(kpi.actual,true)}</div>
            <div className="mt-1 text-xs text-[#5C6657]">目標: {formatCurrency(kpi.target,true)}</div>
            <div className="mt-3">
              <Progress value={Math.min(100, (kpi.actual/kpi.target)*100)} className="h-1.5" />
            </div>
            <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${kpi.trend==='up'?'text-green-600':'text-red-500'}`}>
              {kpi.trend==='up'?<TrendingUp size={13}/>:<TrendingDown size={13}/>}
              {formatPercent(kpi.changePercent,true)} 前月比
            </div>
          </div>
        ))}
      </div>

      {/* KPI Progress Detail */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-5">KPI進捗詳細</h2>
        <div className="space-y-5">
          {kpiProgress.map(kpi => (
            <div key={kpi.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#1A2016]">{kpi.name}</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#5C6657]">目標: {kpi.target.toLocaleString()}{kpi.unit}</span>
                  <span className="font-semibold text-[#1A2016]">実績: {kpi.actual.toLocaleString()}{kpi.unit}</span>
                  <span className={`font-bold ${kpi.achievement>=100?'text-green-600':'text-orange-500'}`}>{kpi.achievement.toFixed(1)}%</span>
                </div>
              </div>
              <div className="relative">
                <Progress value={Math.min(100,kpi.achievement)} className="h-3" />
                {kpi.achievement>100 && (
                  <div className="absolute right-0 top-0 h-3 rounded-r-full bg-[#92D050]/50" style={{width:`${Math.min(20,(kpi.achievement-100)/100*20)}%`}} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark Summary */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-4">業界ベンチマーク比較（主要5指標）</h2>
        <div className="space-y-3">
          {benchmarkData.slice(0,5).map(b => (
            <div key={b.category} className="flex items-center gap-4">
              <span className="text-sm text-[#1A2016] w-28 shrink-0">{b.category}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="relative flex-1 h-2 bg-[#E8EDE3] rounded-full">
                    <div className="absolute h-2 bg-[#334926] rounded-full" style={{width:`${Math.min(100,(b.ownValue/b.industryTop25)*100)}%`}} />
                    <div className="absolute h-4 w-0.5 bg-[#5C6657]/40 top-[-4px]" style={{left:`${(b.industryAvg/b.industryTop25)*100}%`}} />
                  </div>
                  <span className="text-sm font-semibold text-[#1A2016] w-16 text-right tabular-nums">{b.ownValue}{b.unit}</span>
                </div>
                <div className="flex gap-3 text-xs text-[#5C6657]">
                  <span>業界平均: {b.industryAvg}{b.unit}</span>
                  <span>上位25%: {b.industryTop25}{b.unit}</span>
                  <span className={`font-medium ${b.percentile>=60?'text-green-600':'text-orange-500'}`}>{b.percentile}パーセンタイル</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
