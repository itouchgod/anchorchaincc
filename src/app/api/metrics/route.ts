import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // 获取基本指标
    const [
      manufacturerCount,
      newsCount,
      certificationCount,
      activeCertifications,
      expiredCertifications
    ] = await Promise.all([
      prisma.manufacturer.count(),
      prisma.newsItem.count({ where: { status: 'active' } }),
      prisma.certification.count(),
      prisma.certification.count({ 
        where: { 
          status: 'active',
          validTo: { gte: new Date() }
        } 
      }),
      prisma.certification.count({ 
        where: { 
          status: 'expired',
          validTo: { lt: new Date() }
        } 
      })
    ])

    // 生成 Prometheus 格式的指标
    const metrics = [
      '# HELP anchorchain_manufacturers_total Total number of manufacturers',
      '# TYPE anchorchain_manufacturers_total counter',
      `anchorchain_manufacturers_total ${manufacturerCount}`,
      '',
      '# HELP anchorchain_news_items_total Total number of active news items',
      '# TYPE anchorchain_news_items_total counter',
      `anchorchain_news_items_total ${newsCount}`,
      '',
      '# HELP anchorchain_certifications_total Total number of certifications',
      '# TYPE anchorchain_certifications_total counter',
      `anchorchain_certifications_total ${certificationCount}`,
      '',
      '# HELP anchorchain_certifications_active_total Total number of active certifications',
      '# TYPE anchorchain_certifications_active_total counter',
      `anchorchain_certifications_active_total ${activeCertifications}`,
      '',
      '# HELP anchorchain_certifications_expired_total Total number of expired certifications',
      '# TYPE anchorchain_certifications_expired_total counter',
      `anchorchain_certifications_expired_total ${expiredCertifications}`,
      '',
      '# HELP anchorchain_application_info Application information',
      '# TYPE anchorchain_application_info gauge',
      `anchorchain_application_info{version="1.0.0",environment="${process.env.NODE_ENV || 'development'}"} 1`
    ].join('\n')

    return new NextResponse(metrics, {
      headers: {
        'Content-Type': 'text/plain; version=0.0.4; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    })
  } catch (error) {
    console.error('Error generating metrics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
