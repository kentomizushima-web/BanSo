import type {
  Company, KPI, KpiProgress, MonthlyPL, BalanceSheet,
  CashFlowStatement, BudgetActual, CashflowForecast,
  Action, Alert, Expert, ChatMessage, InvestmentPlan,
  BenchmarkData, SimulationScenario,
} from '@/types'

export const company: Company = {
  name: 'サンプル物流株式会社',
  industry: '物流・運送',
  employees: 142,
  fiscalYear: 2025,
  prefecture: '東京都',
  founded: 1998,
}

export const monthlyPL: MonthlyPL[] = [
  { month: 4,  year: 2024, revenue: 38500000, cogs: 25100000, grossProfit: 13400000, sga: 9800000,  operatingProfit: 3600000, netProfit: 2800000 },
  { month: 5,  year: 2024, revenue: 39200000, cogs: 25600000, grossProfit: 13600000, sga: 9900000,  operatingProfit: 3700000, netProfit: 2900000 },
  { month: 6,  year: 2024, revenue: 40100000, cogs: 26100000, grossProfit: 14000000, sga: 10000000, operatingProfit: 4000000, netProfit: 3100000 },
  { month: 7,  year: 2024, revenue: 41300000, cogs: 26900000, grossProfit: 14400000, sga: 10100000, operatingProfit: 4300000, netProfit: 3300000 },
  { month: 8,  year: 2024, revenue: 40800000, cogs: 26600000, grossProfit: 14200000, sga: 10200000, operatingProfit: 4000000, netProfit: 3100000 },
  { month: 9,  year: 2024, revenue: 42500000, cogs: 27600000, grossProfit: 14900000, sga: 10300000, operatingProfit: 4600000, netProfit: 3500000 },
  { month: 10, year: 2024, revenue: 43100000, cogs: 28000000, grossProfit: 15100000, sga: 10400000, operatingProfit: 4700000, netProfit: 3600000 },
  { month: 11, year: 2024, revenue: 43800000, cogs: 28500000, grossProfit: 15300000, sga: 10500000, operatingProfit: 4800000, netProfit: 3700000 },
  { month: 12, year: 2024, revenue: 46200000, cogs: 30000000, grossProfit: 16200000, sga: 11200000, operatingProfit: 5000000, netProfit: 3800000 },
  { month: 1,  year: 2025, revenue: 40300000, cogs: 26200000, grossProfit: 14100000, sga: 10600000, operatingProfit: 3500000, netProfit: 2700000 },
  { month: 2,  year: 2025, revenue: 40500000, cogs: 26400000, grossProfit: 14100000, sga: 10700000, operatingProfit: 3400000, netProfit: 2600000 },
  { month: 3,  year: 2025, revenue: 45200000, cogs: 29400000, grossProfit: 15800000, sga: 11800000, operatingProfit: 4000000, netProfit: 3100000 },
]

export const kpis: KPI[] = [
  { id: 'revenue',      name: '売上高',   actual: 45200000, target: 42000000, unit: '円', change: 4900000,  changePercent: 12.2,  trend: 'up'   },
  { id: 'gross-profit', name: '粗利益',   actual: 12800000, target: 12000000, unit: '円', change: 970000,   changePercent: 8.2,   trend: 'up'   },
  { id: 'operating-cf', name: '営業CF',   actual: 3200000,  target: 4000000,  unit: '円', change: -560000,  changePercent: -14.9, trend: 'down' },
  { id: 'cash-balance', name: '資金残高', actual: 28400000, target: 30000000, unit: '円', change: -1200000, changePercent: -4.1,  trend: 'down' },
]

export const kpiProgress: KpiProgress[] = [
  { name: '売上目標',   actual: 45200000, target: 42000000, unit: '円', achievement: 107.6 },
  { name: '新規顧客数', actual: 12,       target: 10,       unit: '社', achievement: 120.0 },
  { name: '案件単価',   actual: 3760000,  target: 4000000,  unit: '円', achievement: 94.0  },
  { name: '稼働率',     actual: 87.3,     target: 90.0,     unit: '%',  achievement: 97.0  },
  { name: '粗利率',     actual: 28.3,     target: 30.0,     unit: '%',  achievement: 94.3  },
]

export const balanceSheet: BalanceSheet = {
  month: 3, year: 2025,
  totalAssets: 185000000, currentAssets: 82000000, cash: 28400000,
  receivables: 38600000, inventory: 15000000, fixedAssets: 103000000,
  totalLiabilities: 98000000, currentLiabilities: 45000000, payables: 22000000,
  shortTermDebt: 15000000, longTermDebt: 53000000,
  equity: 87000000, retainedEarnings: 52000000,
}

export const cashFlowStatements: CashFlowStatement[] = monthlyPL.map((pl, i) => ({
  month: pl.month,
  year: pl.year,
  operatingCF: Math.round(pl.operatingProfit * 0.8 + 500000),
  investingCF: -2000000 - (i % 3 === 0 ? 5000000 : 0),
  financingCF: i % 6 === 0 ? -1000000 : 500000,
  netCF: 0,
  endingCash: 28400000 - (11 - i) * 800000,
})).map(cf => ({ ...cf, netCF: cf.operatingCF + cf.investingCF + cf.financingCF }))

export const budgetActuals: BudgetActual[] = [
  { month: 3, year: 2025, category: '売上高',         budgetAmount: 42000000, actualAmount: 45200000, variance: 3200000,   variancePercent: 7.6   },
  { month: 3, year: 2025, category: '売上原価',       budgetAmount: 28000000, actualAmount: 29400000, variance: -1400000,  variancePercent: -5.0  },
  { month: 3, year: 2025, category: '人件費',         budgetAmount: 7500000,  actualAmount: 7800000,  variance: -300000,   variancePercent: -4.0  },
  { month: 3, year: 2025, category: 'マーケティング費', budgetAmount: 1500000,  actualAmount: 1650000,  variance: -150000,   variancePercent: -10.0 },
  { month: 3, year: 2025, category: '消耗品費',       budgetAmount: 300000,   actualAmount: 690000,   variance: -390000,   variancePercent: -130.0},
  { month: 3, year: 2025, category: 'その他SGA',     budgetAmount: 2200000,  actualAmount: 1860000,  variance: 340000,    variancePercent: 15.5  },
]

export const cashflowForecasts: CashflowForecast[] = Array.from({ length: 13 }, (_, i) => ({
  week: i + 1,
  date: new Date(2025, 2, 17 + i * 7).toISOString().slice(0, 10),
  inflow:  Math.round(8000000 + Math.sin(i * 0.8) * 2000000 + (i % 4 === 0 ? 5000000 : 0)),
  outflow: Math.round(6500000 + Math.cos(i * 0.5) * 1000000 + (i % 3 === 0 ? 3000000 : 0)),
  balance: Math.round(28400000 + i * 800000 + Math.sin(i * 0.3) * 500000),
  isActual: i < 3,
}))

export const actions: Action[] = [
  {
    id: 'a1', title: '幹線ルート再編による燃料費削減',
    description: '主要3ルートの配送経路を見直し、燃料消費量を15%削減する。GPSデータ分析により最適ルートを特定済み。',
    impact: 'コスト削減', impactAmount: 1800000,
    assignee: { name: '田中一郎', avatar: 'TI' }, status: 'in_progress', priority: 'high',
    category: 'コスト削減', dueDate: '2025-04-30', createdAt: '2025-03-15',
    tags: ['燃料費', '物流最適化', 'AI生成'], aiGenerated: true,
  },
  {
    id: 'a2', title: '大口顧客3社へのアップセル提案',
    description: '月次取引額上位3社（合計売上38%）に対し、付加価値サービス（温度管理・即日配送）を提案する。',
    impact: '売上拡大', impactAmount: 2400000,
    assignee: { name: '鈴木花子', avatar: 'SH' }, status: 'todo', priority: 'high',
    category: '売上拡大', dueDate: '2025-04-15', createdAt: '2025-03-18',
    tags: ['アップセル', '顧客管理'], aiGenerated: true,
  },
  {
    id: 'a3', title: '消耗品費の一括発注切替',
    description: '現在バラバラに発注している消耗品を月次一括発注に変更。単価交渉により20%コスト削減を見込む。',
    impact: 'コスト削減', impactAmount: 480000,
    assignee: { name: '佐藤次郎', avatar: 'SJ' }, status: 'todo', priority: 'medium',
    category: 'コスト削減', dueDate: '2025-04-20', createdAt: '2025-03-20',
    tags: ['消耗品', '購買最適化', 'AI生成'], aiGenerated: true,
  },
  {
    id: 'a4', title: '新規エリア（神奈川西部）開拓',
    description: '競合空白地帯である神奈川県西部エリアへの配送網拡大。月次売上150万円を目標。',
    impact: '売上拡大', impactAmount: 1500000,
    assignee: { name: '山田太郎', avatar: 'YT' }, status: 'todo', priority: 'medium',
    category: '新規開拓', dueDate: '2025-06-30', createdAt: '2025-03-22',
    tags: ['エリア拡大', '新規開拓'], aiGenerated: false,
  },
  {
    id: 'a5', title: '稼働率90%達成のための受注管理改善',
    description: '現在87.3%の稼働率を90%以上にするため、受注管理システムのアルゴリズムを改善する。',
    impact: '効率改善', impactAmount: 960000,
    assignee: { name: '田中一郎', avatar: 'TI' }, status: 'done', priority: 'high',
    category: '業務効率化', dueDate: '2025-03-31', createdAt: '2025-02-01',
    tags: ['稼働率', 'システム改善'], aiGenerated: false,
  },
]

export const alerts: Alert[] = [
  {
    id: 'al1', type: 'anomaly', severity: 'high',
    title: '消耗品費の異常増加', category: '費用管理', isRead: false, createdAt: '2025-01-15',
    message: '12月の消耗品費が過去12ヶ月平均の2.3倍（¥69万）',
    detail: '12月消耗品費: ¥690,000 / 過去平均: ¥300,000 / 乖離: +¥390,000',
    aiAnalysis: '12月の消耗品費が突出して高くなっています。①年末まとめ買い②特定部門での使用増③勘定科目の誤計上が考えられます。購買担当者に内訳確認を依頼することを推奨します。',
  },
  {
    id: 'al2', type: 'budget_exceeded', severity: 'medium',
    title: 'マーケティング費が予算超過', category: '予算管理', isRead: false, createdAt: '2025-03-05',
    message: 'マーケティング費が月次予算の110%に達しています',
    detail: '予算: ¥1,500,000 / 実績: ¥1,650,000 / 超過: ¥150,000 (+10%)',
    aiAnalysis: '先月も予算比108%でした。新規12社獲得の成果を考慮すると問題ではありませんが、来期予算の見直しを検討する時期です。',
  },
  {
    id: 'al3', type: 'data_inconsistency', severity: 'medium',
    title: '取引先マスタに重複の可能性', category: 'データ品質', isRead: true, createdAt: '2025-03-10',
    message: '「山田運送」「（株）山田運送」が別レコードとして登録されています',
    detail: 'マスタID: M-1042, M-1287 / 住所: 東京都品川区（一致）',
    aiAnalysis: '住所・電話番号が一致しているため同一取引先の可能性が高いです。マスタ統合で集計精度が向上します。',
  },
  {
    id: 'al4', type: 'anomaly', severity: 'high',
    title: '資金残高が目標値を下回っています', category: '資金管理', isRead: false, createdAt: '2025-03-31',
    message: '資金残高¥28.4Mは目標値¥30Mを5.3%下回っています',
    detail: '現在残高: ¥28,400,000 / 目標: ¥30,000,000 / 不足: ¥1,600,000',
    aiAnalysis: '資金残高が3ヶ月連続で減少しています。ALIVE期間8.2ヶ月は健全ですが、売掛金の回収サイト短縮または短期借入枠の確保を推奨します。',
  },
  {
    id: 'al5', type: 'milestone', severity: 'low',
    title: '売上目標を達成しました', category: '売上', isRead: true, createdAt: '2025-04-01',
    message: '3月売上¥45.2Mが月次目標¥42Mを7.6%上回りました',
    detail: '目標: ¥42,000,000 / 実績: ¥45,200,000 / 超過: ¥3,200,000 (+7.6%)',
    aiAnalysis: '新規受注3件（合計¥4.5M）が寄与しています。4月の受注パイプラインの確認を推奨します。',
  },
  {
    id: 'al6', type: 'budget_exceeded', severity: 'low',
    title: '人件費が予算を4%超過', category: '費用管理', isRead: true, createdAt: '2025-04-02',
    message: '3月の人件費が予算比+4.0%（¥300,000超過）',
    detail: '予算: ¥7,500,000 / 実績: ¥7,800,000 / 超過: ¥300,000',
    aiAnalysis: '残業代の増加が主因と思われます。来期は採用計画と残業管理の両面から対策を検討することを推奨します。',
  },
]

export const experts: Expert[] = [
  {
    id: 'e1', name: '田中誠一', title: '公認会計士・税理士', firm: '田中会計事務所', avatar: 'TM',
    specialties: ['税務最適化', '資金調達', '財務三表分析', 'M&A'], rating: 4.9, responseTime: '通常24時間以内',
  },
  {
    id: 'e2', name: '鈴木美佳', title: '中小企業診断士', firm: 'スズキコンサルティング', avatar: 'SM',
    specialties: ['経営改善', '補助金申請', '事業計画', 'DX推進'], rating: 4.7, responseTime: '通常48時間以内',
  },
  {
    id: 'e3', name: '山本健太', title: 'CFO・財務アドバイザー', firm: 'ヤマモトアドバイザリー', avatar: 'YK',
    specialties: ['資金繰り改善', '銀行交渉', '財務戦略', 'IPO準備'], rating: 4.8, responseTime: '通常12時間以内',
  },
]

export const sampleChatMessages: ChatMessage[] = [
  { id: 'cm1', role: 'user', sender: '山田太郎', createdAt: '2025-04-15T10:00:00', type: 'text',
    content: '資金繰りについて相談したいのですが、来月の支払いが心配で…' },
  { id: 'cm2', role: 'assistant', sender: 'BanSo AI', createdAt: '2025-04-15T10:00:05', type: 'analysis',
    content: 'ご相談ありがとうございます。現在の財務データを分析しました。資金残高は¥28.4M、ALIVE期間は8.2ヶ月あります。来月の主な支払い予定は、売掛金回収¥38.6M、仕入支払¥22M、借入返済¥2Mの見込みです。収支はプラスになる予測です。具体的にどの支払いが心配ですか？' },
  { id: 'cm3', role: 'user', sender: '山田太郎', createdAt: '2025-04-15T10:01:00', type: 'text',
    content: '大口顧客の入金が遅れるかもしれないと連絡があって…' },
  { id: 'cm4', role: 'assistant', sender: 'BanSo AI', createdAt: '2025-04-15T10:01:05', type: 'recommendation',
    content: '状況を把握しました。対策として次の3点を推奨します。\n\n1. **短期的**: 取引銀行の当座貸越枠（推定¥20M）の活用準備\n2. **中期的**: 主要取引先との支払いサイト交渉（60日→30日）\n3. **予防的**: ファクタリングの検討（売掛金の早期資金化）\n\n田中税理士に詳細な資金繰り表の作成と銀行交渉のサポートをお願いすることも可能です。' },
]

export const investmentPlans: InvestmentPlan[] = [
  {
    id: 'ip1', name: '配送管理システム更新', type: 'it', amount: 8000000,
    expectedROI: 24.5, expectedRevenue: 3600000, paybackMonths: 27, status: 'approved',
    description: '配送管理システムをクラウド型に移行。リアルタイム追跡と自動配車最適化で稼働率向上・燃料費削減を実現。',
    startDate: '2025-05-01',
  },
  {
    id: 'ip2', name: 'ドライバー採用・研修', type: 'hr', amount: 3500000,
    expectedROI: 42.0, expectedRevenue: 6000000, paybackMonths: 7, status: 'planning',
    description: '増加する受注需要に対応するため、正社員ドライバー3名を採用。採用費・研修費・初期装備費を含む。',
    startDate: '2025-06-01',
  },
  {
    id: 'ip3', name: '電気トラック2台導入', type: 'equipment', amount: 18000000,
    expectedROI: 15.3, expectedRevenue: 1200000, paybackMonths: 60, status: 'planning',
    description: 'カーボンニュートラル対応として電気トラックを2台導入。補助金活用で実質投資額¥12Mの見込み。',
    startDate: '2025-09-01',
  },
  {
    id: 'ip4', name: '神奈川西部営業所開設', type: 'other', amount: 5000000,
    expectedROI: 38.0, expectedRevenue: 7200000, paybackMonths: 8, status: 'planning',
    description: '新規エリア開拓のための小規模営業所（3名体制）を開設。初期費用：敷金礼金¥2M、設備¥1.5M、採用¥1.5M。',
    startDate: '2025-07-01',
  },
  {
    id: 'ip5', name: 'ブランドマーケティング強化', type: 'marketing', amount: 2400000,
    expectedROI: 62.5, expectedRevenue: 4800000, paybackMonths: 6, status: 'in_progress',
    description: 'Webサイトリニューアル・SEO強化・業界誌広告による認知度向上。新規問い合わせ数を月5件→15件に。',
    startDate: '2025-04-01',
  },
]

export const benchmarkData: BenchmarkData[] = [
  { category: '粗利率',         ownValue: 28.3,     industryAvg: 26.1,     industryTop25: 32.5, unit: '%',    percentile: 62 },
  { category: '営業利益率',     ownValue: 8.8,      industryAvg: 7.2,      industryTop25: 11.5, unit: '%',    percentile: 65 },
  { category: '労働生産性',     ownValue: 4820000,  industryAvg: 4200000,  industryTop25: 6100000, unit: '円/人', percentile: 63 },
  { category: '売上成長率',     ownValue: 9.8,      industryAvg: 4.5,      industryTop25: 15.2, unit: '%',    percentile: 72 },
  { category: '借入依存度',     ownValue: 36.8,     industryAvg: 28.0,     industryTop25: 18.0, unit: '%',    percentile: 35 },
  { category: '流動比率',       ownValue: 182.2,    industryAvg: 165.0,    industryTop25: 220.0, unit: '%',   percentile: 58 },
  { category: '売掛金回転期間', ownValue: 25.8,     industryAvg: 22.0,     industryTop25: 15.0, unit: '日',   percentile: 42 },
  { category: '稼働率',         ownValue: 87.3,     industryAvg: 82.5,     industryTop25: 93.0, unit: '%',    percentile: 68 },
  { category: '燃料費率',       ownValue: 12.4,     industryAvg: 13.8,     industryTop25: 10.2, unit: '%',    percentile: 64 },
  { category: '顧客継続率',     ownValue: 91.2,     industryAvg: 88.0,     industryTop25: 95.0, unit: '%',    percentile: 66 },
]

const buildProjectedPL = (growthRate: number, cogsRatio: number, sgaGrowth: number): MonthlyPL[] => {
  const last = monthlyPL[monthlyPL.length - 1]
  return Array.from({ length: 12 }, (_, i) => {
    const revenue = last.revenue * Math.pow(1 + growthRate / 12, i + 1)
    const cogs = revenue * cogsRatio
    const grossProfit = revenue - cogs
    const sga = last.sga * Math.pow(1 + sgaGrowth / 12, i + 1)
    const operatingProfit = grossProfit - sga
    return {
      month: ((2 + i) % 12) + 1,
      year: i < 10 ? 2025 : 2026,
      revenue: Math.round(revenue), cogs: Math.round(cogs),
      grossProfit: Math.round(grossProfit), sga: Math.round(sga),
      operatingProfit: Math.round(operatingProfit),
      netProfit: Math.round(operatingProfit * 0.75),
    }
  })
}

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'optimistic', name: '楽観シナリオ', description: '新エリア開拓成功・大口受注獲得による成長加速',
    assumptions: { revenueGrowth: 18, cogsRatio: 0.63, sgaGrowth: 8, capex: 25000000 },
    projectedPL: buildProjectedPL(0.18, 0.63, 0.08),
  },
  {
    id: 'base', name: '基本シナリオ', description: '現状トレンドを維持した標準的な成長',
    assumptions: { revenueGrowth: 10, cogsRatio: 0.65, sgaGrowth: 5, capex: 15000000 },
    projectedPL: buildProjectedPL(0.10, 0.65, 0.05),
  },
  {
    id: 'pessimistic', name: '悲観シナリオ', description: '主要顧客離脱・燃料費高騰による収益悪化',
    assumptions: { revenueGrowth: 2, cogsRatio: 0.68, sgaGrowth: 3, capex: 8000000 },
    projectedPL: buildProjectedPL(0.02, 0.68, 0.03),
  },
]
