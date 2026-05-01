export interface Company {
  name: string
  industry: string
  employees: number
  fiscalYear: number
  prefecture: string
  founded: number
}

export interface KPI {
  id: string
  name: string
  actual: number
  target: number
  unit: string
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'neutral'
}

export interface MonthlyPL {
  month: number
  year: number
  revenue: number
  cogs: number
  grossProfit: number
  sga: number
  operatingProfit: number
  netProfit: number
}

export interface BalanceSheet {
  month: number
  year: number
  totalAssets: number
  currentAssets: number
  cash: number
  receivables: number
  inventory: number
  fixedAssets: number
  totalLiabilities: number
  currentLiabilities: number
  payables: number
  shortTermDebt: number
  longTermDebt: number
  equity: number
  retainedEarnings: number
}

export interface CashFlowStatement {
  month: number
  year: number
  operatingCF: number
  investingCF: number
  financingCF: number
  netCF: number
  endingCash: number
}

export interface BudgetActual {
  month: number
  year: number
  category: string
  budgetAmount: number
  actualAmount: number
  variance: number
  variancePercent: number
}

export interface CashflowForecast {
  week: number
  date: string
  inflow: number
  outflow: number
  balance: number
  isActual: boolean
}

export interface Action {
  id: string
  title: string
  description: string
  impact: string
  impactAmount: number
  assignee: { name: string; avatar: string }
  status: 'todo' | 'in_progress' | 'done'
  priority: 'high' | 'medium' | 'low'
  category: string
  dueDate: string
  createdAt: string
  tags: string[]
  aiGenerated: boolean
}

export interface Alert {
  id: string
  type: 'anomaly' | 'budget_exceeded' | 'data_inconsistency' | 'milestone'
  severity: 'high' | 'medium' | 'low'
  title: string
  message: string
  detail: string
  category: string
  createdAt: string
  isRead: boolean
  aiAnalysis: string
}

export interface Expert {
  id: string
  name: string
  title: string
  firm: string
  avatar: string
  specialties: string[]
  rating: number
  responseTime: string
}

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant' | 'expert'
  sender: string
  createdAt: string
  type: 'text' | 'analysis' | 'recommendation'
}

export interface InvestmentPlan {
  id: string
  name: string
  type: 'hr' | 'equipment' | 'marketing' | 'it' | 'other'
  amount: number
  expectedROI: number
  expectedRevenue: number
  paybackMonths: number
  status: 'planning' | 'approved' | 'in_progress' | 'completed'
  description: string
  startDate: string
}

export interface BenchmarkData {
  category: string
  ownValue: number
  industryAvg: number
  industryTop25: number
  unit: string
  percentile: number
}

export interface SimulationScenario {
  id: string
  name: string
  description: string
  assumptions: {
    revenueGrowth: number
    cogsRatio: number
    sgaGrowth: number
    capex: number
  }
  projectedPL: MonthlyPL[]
}

export interface KpiProgress {
  name: string
  actual: number
  target: number
  unit: string
  achievement: number
}
