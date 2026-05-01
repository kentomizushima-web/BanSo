'use client'
import { benchmarkData } from '@/lib/mock-data'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'

export default function BenchmarkPage() {
  const radarData = benchmarkData.slice(0,8).map(b => ({
    subject: b.category,
    '貴社': b.percentile,
    '業界平均': 50,
    '業界上位25%': 75,
  }))

  const overall = Math.round(benchmarkData.reduce((a,b)=>a+b.percentile,0)/benchmarkData.length)
  const score = 62

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2016]">業界ベンチマーク</h1>
        <p className="text-sm text-[#5C6657] mt-1">業界(物流・運送)平均との比較</p>
      </div>

      {/* Score hero */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#334926] text-white p-8 flex flex-col items-center justify-center">
          <div className="text-sm font-medium text-white/70 mb-2">業界偏差値</div>
          <div className="text-8xl font-black text-[#92D050]">{score}</div>
          <div className="text-sm text-white/70 mt-2">上位{100-score}%</div>
          <div className="mt-4 text-sm text-white/80 text-center leading-relaxed">
            粗利率と労働生産性が強み。
            倴入依存度と売掛金回転期間に改善予地。
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#E8EDE3] p-6 shadow-sm">
          <h2 className="font-semibold text-[#1A2016] mb-2">レーダーチャート</h2>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E8EDE3" />
              <PolarAngleAxis dataKey="subject" tick={{fontSize:10}} />
              <Tooltip />
              <Radar name="貴社" dataKey="貴社" stroke="#334926" fill="#334926" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="業界平均" dataKey="業界平均" stroke="#E8EDE3" fill="none" strokeWidth={1} strokeDasharray="4 4" />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 text-xs text-[#5C6657] justify-center">
            <span className="flex items-center gap-1"><span className="h-2 w-4 bg-[#334926] rounded-full inline-block opacity-50"/>貴社</span>
            <span className="flex items-center gap-1"><span className="h-2 w-4 bg-[#E8EDE3] rounded-full inline-block"/>業界平均</span>
          </div>
        </div>
      </div>

      {/* Detail table */}
      <div className="rounded-2xl bg-white border border-[#E8EDE3] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8EDE3] font-semibold text-[#1A2016]">指標別詳細</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F5F7F0]">
                {['指標','貴社','業界平均','業界上位25%','パーセンタイル','評価'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#5C6657]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F7F0]">
              {benchmarkData.map(b=>(
                <tr key={b.category} className="hover:bg-[#F5F7F0]/50">
                  <td className="px-4 py-3 font-medium text-[#1A2016]">{b.category}</td>
                  <td className="px-4 py-3 font-semibold tabular-nums">{b.ownValue}{b.unit}</td>
                  <td className="px-4 py-3 text-[#5C6657] tabular-nums">{b.industryAvg}{b.unit}</td>
                  <td className="px-4 py-3 text-[#5C6657] tabular-nums">{b.industryTop25}{b.unit}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#E8EDE3] rounded-full">
                        <div className={`h-2 rounded-full ${b.percentile>=60?'bg-[#334926]':'bg-orange-400'}`} style={{width:`${b.percentile}%`}} />
                      </div>
                      <span className={`text-xs font-semibold w-8 ${b.percentile>=60?'text-[#334926]':'text-orange-500'}`}>{b.percentile}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${b.percentile>=70?'bg-green-100 text-green-700':b.percentile>=50?'bg-[#334926]/10 text-[#334926]':'bg-orange-100 text-orange-600'}`}>
                      {b.percentile>=70?'優秀':b.percentile>=50?'平均以上':'改善余地'}
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
