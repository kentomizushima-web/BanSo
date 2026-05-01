'use client'
import { useState } from 'react'
import { Bot, TrendingUp } from 'lucide-react'
import { simulationScenarios } from '@/lib/mock-data'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const MONTH_LABELS = ['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月']

export default function SimulationPage() {
  const [selectedId, setSelectedId] = useState('base')
  const scenario = simulationScenarios.find(s=>s.id===selectedId) ?? simulationScenarios[1]

  const chartData = scenario.projectedPL.map((pl,i)=>({ month:MONTH_LABELS[i], '売上高':+(pl.revenue/1_000_000).toFixed(1), '粗利益':+(pl.grossProfit/1_000_000).toFixed(1), '営業利益':+(pl.operatingProfit/1_000_000).toFixed(1) }))

  const colors: Record<string,string> = { optimistic:'text-green-600 bg-green-50 border-green-200', base:'text-[#334926] bg-[#334926]/5 border-[#334926]/20', pessimistic:'text-red-500 bg-red-50 border-red-200' }
  const totalRevenue = scenario.projectedPL.reduce((s,p)=>s+p.revenue,0)
  const totalProfit = scenario.projectedPL.reduce((s,p)=>s+p.operatingProfit,0)
  const avgMargin = (totalProfit/totalRevenue*100).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2016]">AIシミュレーション</h1>
        <p className="text-sm text-[#5C6657] mt-1">来期（FY2026）のWhat-if分析</p>
      </div>

      {/* Scenarios */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {simulationScenarios.map(s=>(
          <button key={s.id} onClick={()=>setSelectedId(s.id)}
            className={`rounded-2xl border-2 p-5 text-left transition-all ${selectedId===s.id ? s.id==='optimistic'?'border-green-400 bg-green-50':s.id==='pessimistic'?'border-red-400 bg-red-50':'border-[#334926] bg-[#334926]/5':'border-[#E8EDE3] bg-white hover:border-[#334926]/30'}`}>
            <div className="font-semibold text-[#1A2016]">{s.name}</div>
            <div className="text-xs text-[#5C6657] mt-1 leading-relaxed">{s.description}</div>
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#5C6657]">売上成長</span>
                <span className={`font-semibold ${s.assumptions.revenueGrowth>=10?'text-green-600':'text-orange-500'}`}>+{s.assumptions.revenueGrowth}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C6657]">原価率</span>
                <span className="font-semibold text-[#1A2016]">{(s.assumptions.cogsRatio*100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#5C6657]">販管費成長</span>
                <span className="font-semibold text-[#1A2016]">+{s.assumptions.sgaGrowth}%</span>
              </div>
            </div>
            {selectedId===s.id && <div className="mt-3 text-xs font-semibold text-[#334926]">✓ 選択中</div>}
          </button>
        ))}
      </div>

      {/* Projection chart */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#1A2016]">{scenario.name} — 将来PL予測（百万円）</h2>
          <div className="flex gap-4 text-sm">
            <div className="text-center"><div className="text-[#5C6657] text-xs">年間売上予測</div><div className="font-bold text-[#1A2016]">{formatCurrency(totalRevenue,true)}</div></div>
            <div className="text-center"><div className="text-[#5C6657] text-xs">平均営業利益率</div><div className="font-bold text-green-600">{avgMargin}%</div></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE3" />
            <XAxis dataKey="month" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip formatter={(v:number)=>[`¥${v}M`]} />
            <Line type="monotone" dataKey="売上高" stroke="#334926" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="粗利益" stroke="#92D050" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="営業利益" stroke="#00C09A" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-3 flex gap-4 text-xs text-[#5C6657]">
          {[{c:'#334926',l:'売上高'},{c:'#92D050',l:'粗利益'},{c:'#00C09A',l:'営業利益'}].map(x=>(
            <span key={x.l} className="flex items-center gap-1"><span className="h-2 w-4 rounded-full inline-block" style={{backgroundColor:x.c}}/>{x.l}</span>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-4">シナリオ比較</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8EDE3]">
                <th className="px-4 py-2 text-left font-semibold text-[#5C6657]">指標</th>
                {simulationScenarios.map(s=>(
                  <th key={s.id} className={`px-4 py-2 text-right font-semibold ${selectedId===s.id?'text-[#334926]':'text-[#5C6657]'}`}>{s.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F0]">
              {[{l:'年間売上',fn:(s:typeof simulationScenarios[0])=>formatCurrency(s.projectedPL.reduce((a,p)=>a+p.revenue,0),true)},
                {l:'年間粗利',fn:(s:typeof simulationScenarios[0])=>formatCurrency(s.projectedPL.reduce((a,p)=>a+p.grossProfit,0),true)},
                {l:'年間営業利益',fn:(s:typeof simulationScenarios[0])=>formatCurrency(s.projectedPL.reduce((a,p)=>a+p.operatingProfit,0),true)},
              ].map(row=>(
                <tr key={row.l} className="hover:bg-[#F5F7F0]/50">
                  <td className="px-4 py-3 font-medium text-[#1A2016]">{row.l}</td>
                  {simulationScenarios.map(s=>(
                    <td key={s.id} className={`px-4 py-3 text-right tabular-nums font-semibold ${selectedId===s.id?'text-[#334926]':'text-[#5C6657]'}`}>{row.fn(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
