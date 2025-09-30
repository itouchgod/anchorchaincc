import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Items must be an array' },
        { status: 400 }
      )
    }

    const results = []

    for (const item of items) {
      try {
        // 检查是否已存在相同的新闻
        const existingNews = await prisma.newsItem.findFirst({
          where: {
            url: item.url,
            title: item.title
          }
        })

        if (existingNews) {
          console.log(`News item already exists: ${item.title}`)
          continue
        }

        // 创建新闻条目
        const newsItem = await prisma.newsItem.create({
          data: {
            title: item.title,
            summary: item.summary,
            publishedAt: new Date(item.publishedAt),
            url: item.url,
            manufacturerId: item.manufacturerId,
            sourceId: item.sourceId,
            publisher: item.publisher,
            lang: item.lang || 'en',
            status: item.status || 'active',
            entities: item.entities || null
          }
        })

        results.push(newsItem)
        console.log(`Created news item: ${newsItem.title}`)
      } catch (error) {
        console.error(`Error creating news item: ${item.title}`, error)
      }
    }

    return NextResponse.json({
      message: `Successfully processed ${results.length} news items`,
      created: results.length,
      total: items.length
    })
  } catch (error) {
    console.error('Error processing news items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const manufacturerId = searchParams.get('manufacturerId')
    const category = searchParams.get('category')

    const where: any = {
      status: 'active'
    }

    if (manufacturerId) {
      where.manufacturerId = manufacturerId
    }

    if (category) {
      where.entities = {
        path: ['categories'],
        array_contains: [category]
      }
    }

    const [newsItems, total] = await Promise.all([
      prisma.newsItem.findMany({
        where,
        include: {
          manufacturer: {
            select: {
              id: true,
              legalName: true,
              brand: true,
              countryCode: true
            }
          }
        },
        orderBy: {
          publishedAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.newsItem.count({ where })
    ])

    return NextResponse.json({
      newsItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching news items:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
