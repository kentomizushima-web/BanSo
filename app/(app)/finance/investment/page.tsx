'use client'
import { useState } from 'react'
import { Plus, Cpu, Users, Megaphone, Settings, Building2, CheckCircle, Clock } from 'lucide-react'
import { investmentPlans } from '@/lib/mock-data'
import { formatCurrency, formatPercent } from '@/lib/utils'

const TYPE_ICONS: Record<string,React.ReactNode> = {
  it: <Cpu size={18}/>, hr: <Users size={18}/>, marketing: <Megaphone size={18}/>,
  equipment: <Settings size={18}/>, other: <Building2 size={18}/>,
}
const STATUS_LABELS: Record<string,{l:string,c:string}> = {
  planning:    {l:'計画中',  c:'bg-[#F5F7F0] text-[#5C6657]'},
  approved:    {l:'承認済',  c:'bg-[#334926]/10 text-[#334926]'},
  in_progress: {l:'進行中',  c:'bg-blue-100 text-blue-600'},
  completed:   {l:'完了',    c:'bg-green-100 text-green-600'},
}

export default function InvestmentPage() {
  const total = investmentPlans.reduce((a,p)=>a+p.amount,0)
  const totalExpected = investmentPlans.reduce((a,p)=>a+p.expectedRevenue,0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2016]">投資計画</h1>
          <p className="text-sm text-[#5C6657] mt-1">FY2025-2026 投資パイプライン</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-[#334926] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a3d1f]">
          <Plus size={15}/>投資追加
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
          <div className="text-sm text-[#5C6657]">計画投資総額</div>
          <div className="text-2xl font-bold text-[#1A2016] mt-1">{formatCurrency(total,true)}</div>
        </div>
        <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
          <div className="text-sm text-[#5C6657]">期待増収益合計</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{formatCurrency(totalExpected,true)}/年</div>
        </div>
        <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
          <div className="text-sm text-[#5C6657]">平均期待ROI</div>
          <div className="text-2xl font-bold text-[#334926] mt-1">{(investmentPlans.reduce((a,p)=>a+p.expectedROI,0)/investmentPlans.length).toFixed(1)}%</div>
        </div>
      </div>

      {/* Investment cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {investmentPlans.map(plan=>(
          <div key={plan.id} className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#334926]/10 flex items-center justify-center text-[#334926]">
                  {TYPE_ICONS[plan.type]}
                </div>
                <div>
                  <div className="font-semibold text-[#1A2016] text-sm leading-snug">{plan.name}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${STATUS_LABELS[plan.status].c}`}>
                    {STATUS_LABELS[plan.status].l}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#5C6657] leading-relaxed mb-4">{plan.description.slice(0,80)}...</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5C6657]">投資額</span>
                <span className="font-semibold text-[#1A2016]">{formatCurrency(plan.amount,true)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6657]">期待ROI</span>
                <span className="font-semibold text-green-600">{plan.expectedROI}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6657]">回収期間</span>
                <span className="font-semibold text-[#1A2016]">{plan.paybackMonths}ヶ月</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C6657]">開始予定</span>
                <span className="font-semibold text-[#1A2016]">{plan.startDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Before/after comparison */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-4">投資前後の財務影響差分比較</h2>
        <div className="grid grid-cols-2 gap-8">
          {[{l:'投資前（現状）',rev:'¥45.2M/月',profit:'¥4.0M/月',cf:'¥3.2M/月',bg:'bg-[#F5F7F0]'},
            {l:'投資後（来期予測）',rev:'¥52.0M/月',profit:'¥5.8M/月',cf:'¥5.0M/月',bg:'bg-[#334926]/5'}].map(s=>(
            <div key={s.l} className={`rounded-xl ${s.bg} p-5`}>
              <div className="font-semibold text-[#1A2016] mb-3">{s.l}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-[#5C6657]">月次売上</span><span className="font-semibold">{s.rev}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#5C6657]">月次営業利益</span><span className="font-semibold text-green-600">{s.profit}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#5C6657]">月次営業CF</span><span className="font-semibold">{s.cf}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
