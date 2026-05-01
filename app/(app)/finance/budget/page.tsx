'use client'
import { useState } from 'react'
import { Bot } from 'lucide-react'
import { budgetActuals } from '@/lib/mock-data'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function BudgetPage() {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const totalRevVariance = budgetActuals.find(b=>b.category==='売上高')?.variance ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2016]">予実比較</h1>
          <p className="text-sm text-[#5C6657] mt-1">2025年3月実績</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {l:'売上差異',v:3200000,note:'目標比+7.6%'},
          {l:'コスト差異',v:-2240000,note:'各項目合計'},
          {l:'差引庀益',v:960000,note:'純利益影響'},
        ].map(s=>(
          <div key={s.l} className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
            <div className="text-sm text-[#5C6657] font-medium">{s.l}</div>
            <div className={`text-2xl font-bold mt-1 ${s.v>=0?'text-green-600':'text-red-500'}`}>
              {s.v>=0?'+':''}{formatCurrency(s.v,true)}
            </div>
            <div className="text-xs text-[#5C6657] mt-1">{s.note}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-4">科目別予実差異</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={budgetActuals} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE3" />
            <XAxis type="number" tick={{fontSize:11}} tickFormatter={v=>`¥${(v/1000000).toFixed(1)}M`} />
            <YAxis dataKey="category" type="category" tick={{fontSize:11}} width={100} />
            <Tooltip formatter={(v:number)=>[formatCurrency(v)]} />
            <Bar dataKey="budgetAmount" name="予算" fill="#E8EDE3" radius={[0,4,4,0]} />
            <Bar dataKey="actualAmount" name="実績" radius={[0,4,4,0]}>
              {budgetActuals.map((b,i)=>(
                <Cell key={i} fill={b.actualAmount>b.budgetAmount&&b.category!=='売上高'?'#ef4444':b.category==='売上高'?'#334926':'#92D050'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail table */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EDE3]">
          <h2 className="font-semibold text-[#1A2016]">詳細内訳</h2>
          <button onClick={()=>setShowAnalysis(v=>!v)} className="flex items-center gap-2 rounded-xl bg-[#334926]/10 text-[#334926] px-3 py-1.5 text-sm font-medium hover:bg-[#334926]/20">
            <Bot size={14}/>AI分析
          </button>
        </div>
        {showAnalysis && (
          <div className="mx-6 my-3 rounded-xl bg-[#334926]/5 border border-[#334926]/20 p-4 text-sm text-[#1A2016]">
            <strong>主要差異の要因:</strong> 売上高は目標比+¥3.2Mと好調です。一方、消耗品費が予算の2.3倍（+¥39万）と異常増加しており、来有12月に向けて一括発注体制への切り替えを推奨します。マーケティング費も110%と超過していますが、新規12社獲得への貢献を考慮すると許容範囲内と判断できます。
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F7F0] border-b border-[#E8EDE3]">
                {['科目','予算','実績','差異(円)','差異(%)',''].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#5C6657]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F0]">
              {budgetActuals.map(b=>(
                <tr key={b.category} className="hover:bg-[#F5F7F0]/50">
                  <td className="px-4 py-3 font-medium text-[#1A2016]">{b.category}</td>
                  <td className="px-4 py-3 tabular-nums text-[#5C6657]">{formatCurrency(b.budgetAmount,true)}</td>
                  <td className="px-4 py-3 tabular-nums font-medium">{formatCurrency(b.actualAmount,true)}</td>
                  <td className={`px-4 py-3 tabular-nums font-semibold ${b.variance>=0?'text-green-600':'text-red-500'}`}>
                    {b.variance>=0?'+':''}{formatCurrency(b.variance,true)}
                  </td>
                  <td className={`px-4 py-3 tabular-nums font-semibold ${b.variancePercent>=0?'text-green-600':'text-red-500'}`}>
                    {formatPercent(b.variancePercent,true)}
                  </td>
                  <td className="px-4 py-3 w-32">
                    <div className="h-2 bg-[#E8EDE3] rounded-full overflow-hidden">
                      <div className={`h-2 rounded-full ${b.variancePercent>=0?'bg-green-400':'bg-red-400'}`}
                        style={{width:`${Math.min(100,Math.abs(b.variancePercent)/15*100)}%`}} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
