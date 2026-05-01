'use client'
import { cashflowForecasts } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertTriangle } from 'lucide-react'

export default function CashflowPage() {
  const currentBalance = 28400000
  const aliveMonths = 8.2
  const weeklyBurn = cashflowForecasts.slice(0,4).reduce((a,f)=>a+(f.outflow-f.inflow),0)/4

  const chartData = cashflowForecasts.map(f=>({ week:`W${f.week}`, '入金':+(f.inflow/1_000_000).toFixed(1), '支出':+(f.outflow/1_000_000).toFixed(1), '残高':+(f.balance/1_000_000).toFixed(1) }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2016]">13週資金繰り予測</h1>
        <p className="text-sm text-[#5C6657] mt-1">2025年3月17日〜6月16日</p>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="sm:col-span-1 rounded-2xl bg-[#334926] text-white p-6">
          <div className="text-sm font-medium text-white/70">資金残高</div>
          <div className="text-4xl font-black mt-2">{formatCurrency(currentBalance,true)}</div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#92D050] font-semibold">ALIVE期間</span>
            <span className="text-2xl font-bold text-white">{aliveMonths}ヶ月</span>
          </div>
          <div className="mt-2 text-xs text-white/60">安全水域（6ヶ月）を十分上回る</div>
        </div>
        <div className="sm:col-span-2 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
            <div className="text-sm text-[#5C6657]">週渡り准顧入金</div>
            <div className="text-xl font-bold text-[#1A2016] mt-1">{formatCurrency(8000000,true)}</div>
            <div className="text-xs text-[#5C6657] mt-1">平均（実績3週）</div>
          </div>
          <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
            <div className="text-sm text-[#5C6657]">週渡り準平均支出</div>
            <div className="text-xl font-bold text-[#1A2016] mt-1">{formatCurrency(6500000,true)}</div>
            <div className="text-xs text-[#5C6657] mt-1">平均（実績3週）</div>
          </div>
          <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
            <div className="text-sm text-[#5C6657]">危険水域まで</div>
            <div className="text-xl font-bold text-green-600 mt-1">約16週</div>
            <div className="text-xs text-[#5C6657] mt-1">現在の燃貼率で計算</div>
          </div>
          <div className="rounded-2xl bg-white border border-[#E8EDE3] p-5 shadow-sm">
            <div className="text-sm text-[#5C6657]">AI予測境界</div>
            <div className="text-xl font-bold text-orange-500 mt-1">W9〜10</div>
            <div className="text-xs text-[#5C6657] mt-1">入金集中日空きのリスク</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
        <h2 className="font-semibold text-[#1A2016] mb-4">13週間キャッシュフロー・残高（百万円）</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EDE3" />
            <XAxis dataKey="week" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip formatter={(v:number)=>[`¥${v}M`]} />
            <Area type="monotone" dataKey="残高" stroke="#334926" fill="#334926" fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="入金" stroke="#92D050" fill="#92D050" fillOpacity={0.1} strokeWidth={1.5} />
            <Area type="monotone" dataKey="支出" stroke="#ef4444" fill="#ef4444" fillOpacity={0.05} strokeWidth={1.5} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex gap-4 text-xs text-[#5C6657]">
          {[{c:'#334926',l:'残高'},{c:'#92D050',l:'入金'},{c:'#ef4444',l:'支出'}].map(x=>(
            <span key={x.l} className="flex items-center gap-1"><span className="h-2 w-4 rounded-full inline-block" style={{backgroundColor:x.c}}/>{x.l}</span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EDE3] font-semibold text-[#1A2016]">週次内訳</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F7F0]">
                {['週','日付','入金','支出','ネット','残高','状態'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#5C6657]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F0]">
              {cashflowForecasts.map(f=>(
                <tr key={f.week} className="hover:bg-[#F5F7F0]/50">
                  <td className="px-4 py-3 font-medium text-[#1A2016]">W{f.week}</td>
                  <td className="px-4 py-3 text-[#5C6657]">{f.date}</td>
                  <td className="px-4 py-3 tabular-nums text-green-600">{formatCurrency(f.inflow,true)}</td>
                  <td className="px-4 py-3 tabular-nums text-red-500">{formatCurrency(f.outflow,true)}</td>
                  <td className={`px-4 py-3 tabular-nums font-medium ${f.inflow-f.outflow>=0?'text-green-600':'text-red-500'}`}>{formatCurrency(f.inflow-f.outflow,true)}</td>
                  <td className="px-4 py-3 tabular-nums font-semibold">{formatCurrency(f.balance,true)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${f.isActual?'bg-[#334926]/10 text-[#334926]':'bg-[#F5F7F0] text-[#5C6657]'}`}>
                      {f.isActual?'実績':'予測'}
                    </span>
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
