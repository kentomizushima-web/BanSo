import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    const abs = Math.abs(amount)
    if (abs >= 100_000_000) return `¥${(amount / 100_000_000).toFixed(1)}億`
    if (abs >= 10_000_000) return `¥${(amount / 10_000_000).toFixed(1)}千万`
    if (abs >= 1_000_000) return `¥${(amount / 1_000_000).toFixed(1)}M`
    if (abs >= 10_000) return `¥${(amount / 10_000).toFixed(1)}万`
  }
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercent(value: number, showSign = false): string {
  const sign = showSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月`
}

export function getTrendColor(
  trend: 'up' | 'down' | 'neutral',
  isNegativeBad = true
): string {
  if (trend === 'neutral') return 'text-gray-500'
  if (isNegativeBad) return trend === 'up' ? 'text-green-600' : 'text-red-500'
  return trend === 'up' ? 'text-red-500' : 'text-green-600'
}

export function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline' {
  const map: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'> = {
    todo: 'secondary',
    in_progress: 'default',
    done: 'success',
    planning: 'secondary',
    approved: 'default',
    completed: 'success',
    high: 'destructive',
    medium: 'warning',
    low: 'secondary',
  }
  return map[status] ?? 'secondary'
}

export function calculateAliveMonths(cashBalance: number, monthlyBurnRate: number): number {
  if (monthlyBurnRate <= 0) return 999
  return Math.round((cashBalance / monthlyBurnRate) * 10) / 10
}

export function getMonthLabel(month: number, year: number): string {
  return `${year}年${String(month).padStart(2, '0')}月`
}
