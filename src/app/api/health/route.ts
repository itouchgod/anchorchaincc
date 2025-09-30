import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // 检查数据库连接
    await prisma.$queryRaw`SELECT 1`
    
    // 获取基本统计信息
    const [manufacturerCount, newsCount, certificationCount] = await Promise.all([
      prisma.manufacturer.count(),
      prisma.newsItem.count(),
      prisma.certification.count()
    ])

    const responseTime = Date.now() - startTime

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'connected',
        manufacturers: manufacturerCount,
        newsItems: newsCount,
        certifications: certificationCount
      },
      services: {
        database: 'healthy',
        api: 'healthy'
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime: `${Date.now() - startTime}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
      services: {
        database: 'unhealthy',
        api: 'healthy'
      }
    }, { status: 503 })
  }
}
