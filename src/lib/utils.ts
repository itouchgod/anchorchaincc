import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 锚链行业相关工具函数

// 产品等级枚举
export const CHAIN_GRADES = {
  U2: 'U2',
  U3: 'U3', 
  R3: 'R3',
  R4: 'R4',
  R5: 'R5'
} as const

// 船级社枚举
export const CLASS_BODIES = {
  LR: 'Lloyd\'s Register',
  ABS: 'American Bureau of Shipping',
  DNV: 'DNV GL',
  RINA: 'RINA',
  CCS: 'China Classification Society',
  IRS: 'Indian Register of Shipping',
  RMRS: 'Russian Maritime Register of Shipping'
} as const

// 产品类别枚举
export const PRODUCT_CATEGORIES = {
  STUD: 'stud',
  STUDLESS: 'studless',
  ANCHOR_FITTINGS: 'anchor_fittings'
} as const

// 表面处理枚举
export const SURFACE_TREATMENTS = {
  BITUMEN: 'bitumen',
  GALVANIZED: 'galvanized',
  PAINTED: 'painted',
  BARE: 'bare'
} as const

// 国家代码到名称映射
export const COUNTRY_NAMES: Record<string, string> = {
  CN: 'China',
  US: 'United States',
  DE: 'Germany',
  JP: 'Japan',
  KR: 'South Korea',
  IT: 'Italy',
  NL: 'Netherlands',
  GB: 'United Kingdom',
  FR: 'France',
  ES: 'Spain',
  IN: 'India',
  BR: 'Brazil',
  RU: 'Russia',
  AU: 'Australia',
  CA: 'Canada',
  SE: 'Sweden'
}

// 格式化日期
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 格式化日期时间
export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 生成厂商slug
export function generateManufacturerSlug(legalName: string, countryCode: string): string {
  const slug = legalName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  
  return `${countryCode.toLowerCase()}-${slug}`
}

// 计算链条重量 (kg/m)
export function calculateChainWeight(diameter: number, grade: string): number {
  // 简化的重量计算公式，实际应用中需要更精确的公式
  const baseWeight = Math.PI * Math.pow(diameter / 2, 2) * 7.85 / 1000 // 钢密度 7.85 g/cm³
  const gradeMultiplier = {
    U2: 1.0,
    U3: 1.1,
    R3: 1.2,
    R4: 1.3,
    R5: 1.4
  }[grade] || 1.0
  
  return baseWeight * gradeMultiplier
}

// 验证证书状态
export function getCertificationStatus(validTo: Date): 'active' | 'expiring' | 'expired' {
  const now = new Date()
  const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
  
  if (validTo < now) return 'expired'
  if (validTo < threeMonthsFromNow) return 'expiring'
  return 'active'
}

// 生成搜索关键词
export function generateSearchKeywords(manufacturer: {
  legalName: string
  brand?: string | null
  aliases: string[]
  countryCode: string
}): string[] {
  const keywords = [
    manufacturer.legalName,
    manufacturer.brand,
    ...manufacturer.aliases,
    COUNTRY_NAMES[manufacturer.countryCode]
  ].filter(Boolean)
  
  return keywords as string[]
}
