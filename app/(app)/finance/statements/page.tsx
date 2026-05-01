'use client'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { monthlyPL, balanceSheet, cashFlowStatements } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

const MONTHS = ['4月','5月','6月','7月','8月','9月','10月','11月','12月','1月','2月','3月']

function PLTable() {
  const rows = [
    { label:'売上高',       key:'revenue'         as const, bold:true },
    { label:'売上原価',     key:'cogs'            as const, indent:true },
    { label:'売上総利益',   key:'grossProfit'     as const, bold:true, hi:true },
    { label:'販管費',       key:'sga'             as const, indent:true },
    { label:'営業利益',     key:'operatingProfit' as const, bold:true },
    { label:'当期純利益',   key:'netProfit'       as const, bold:true },
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="border-b border-[#E8EDE3]">
            <th className="sticky left-0 bg-[#F5F7F0] px-4 py-3 text-left font-semibold text-[#5C6657] w-36">科目</th>
            {MONTHS.map(m => <th key={m} className="px-3 py-3 text-right font-medium text-[#5C6657] min-w-[90px]">{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.key} className={`border-b border-[#F5F7F0] hover:bg-[#F5F7F0]/50 ${r.hi?'bg-[#92D050]/5':''}`}>
              <td className={`sticky left-0 bg-inherit px-4 py-2.5 ${r.bold?'font-semibold text-[#1A2016]':'text-[#5C6657]'} ${r.indent?'pl-8':''}`}>{r.label}</td>
              {monthlyPL.map((pl,i)=>(
                <td key={i} className={`px-3 py-2.5 text-right tabular-nums ${r.bold?'font-semibold':''}`}>
                  {formatCurrency(pl[r.key],true)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BSTable() {
  const bs = balanceSheet
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-semibold text-[#1A2016] mb-3">資産の部 (円)</h3>
        {[
          {l:'流動資産合計',v:bs.currentAssets,bold:true},
          {l:'現金・預金',v:bs.cash,indent:true},
          {l:'売掛金',v:bs.receivables,indent:true},
          {l:'棚卸資産',v:bs.inventory,indent:true},
          {l:'固定資産合計',v:bs.fixedAssets,bold:true},
          {l:'資産合計',v:bs.totalAssets,bold:true,hi:true},
        ].map(r=>(
          <div key={r.l} className={`flex justify-between py-2 border-b border-[#F5F7F0] ${r.hi?'bg-[#92D050]/5 px-2 rounded-lg':''}`}>
            <span className={`text-sm ${r.bold?'font-semibold text-[#1A2016]':'text-[#5C6657]'} ${r.indent?'pl-5':''}`}>{r.l}</span>
            <span className={`text-sm tabular-nums ${r.bold?'font-semibold':''}`}>{formatCurrency(r.v,true)}</span>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-semibold text-[#1A2016] mb-3">負債・純資産の部 (円)</h3>
        {[
          {l:'流動負債合計',v:bs.currentLiabilities,bold:true},
          {l:'買掛金',v:bs.payables,indent:true},
          {l:'短期借入金',v:bs.shortTermDebt,indent:true},
          {l:'長期借入金',v:bs.longTermDebt,bold:true},
          {l:'負債合計',v:bs.totalLiabilities,bold:true},
          {l:'純資産合計',v:bs.equity,bold:true,hi:true},
          {l:'負債・純資産合計',v:bs.totalAssets,bold:true},
        ].map(r=>(
          <div key={r.l} className={`flex justify-between py-2 border-b border-[#F5F7F0] ${r.hi?'bg-[#92D050]/5 px-2 rounded-lg':''}`}>
            <span className={`text-sm ${r.bold?'font-semibold text-[#1A2016]':'text-[#5C6657]'} ${r.indent?'pl-5':''}`}>{r.l}</span>
            <span className={`text-sm tabular-nums ${r.bold?'font-semibold':''}`}>{formatCurrency(r.v,true)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CFTable() {
  const keys = [
    {k:'operatingCF' as const,l:'営業活動CF'},
    {k:'investingCF'  as const,l:'投資活動CF'},
    {k:'financingCF'  as const,l:'財務活動CF'},
    {k:'netCF'        as const,l:'ネットCF合計',bold:true},
    {k:'endingCash'   as const,l:'期末現金残高',bold:true,hi:true},
  ]
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[900px]">
        <thead>
          <tr className="border-b border-[#E8EDE3]">
            <th className="sticky left-0 bg-[#F5F7F0] px-4 py-3 text-left font-semibold text-[#5C6657] w-40">科目</th>
            {MONTHS.map(m=><th key={m} className="px-3 py-3 text-right font-medium text-[#5C6657] min-w-[90px]">{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {keys.map(r=>(
            <tr key={r.k} className={`border-b border-[#F5F7F0] hover:bg-[#F5F7F0]/50 ${r.hi?'bg-[#92D050]/5':''}`}>
              <td className={`sticky left-0 bg-inherit px-4 py-2.5 ${r.bold?'font-semibold text-[#1A2016]':'text-[#5C6657]'}`}>{r.l}</td>
              {cashFlowStatements.map((cf,i)=>(
                <td key={i} className={`px-3 py-2.5 text-right tabular-nums ${r.bold?'font-semibold':''} ${cf[r.k]<0?'text-red-500':''}`}>
                  {formatCurrency(cf[r.k],true)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function StatementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A2016]">財務三表</h1>
          <p className="text-sm text-[#5C6657] mt-1">FY2025 (2024年4月、2025年3月)</p>
        </div>
        <button className="rounded-xl border border-[#E8EDE3] bg-white px-4 py-2 text-sm font-medium hover:bg-[#F5F7F0]">エクスポート</button>
      </div>
      <div className="rounded-2xl bg-white shadow-sm border border-[#E8EDE3] overflow-hidden">
        <Tabs defaultValue="pl">
          <div className="border-b border-[#E8EDE3] px-6 pt-4">
            <TabsList>
              <TabsTrigger value="pl">損益計算書 (PL)</TabsTrigger>
              <TabsTrigger value="bs">貸借対照表 (BS)</TabsTrigger>
              <TabsTrigger value="cf">CF計算書</TabsTrigger>
            </TabsList>
          </div>
          <div className="p-6">
            <TabsContent value="pl"><PLTable /></TabsContent>
            <TabsContent value="bs"><BSTable /></TabsContent>
            <TabsContent value="cf"><CFTable /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
