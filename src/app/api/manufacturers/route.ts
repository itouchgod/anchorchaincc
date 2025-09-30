import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const countryCode = searchParams.get('countryCode')
    const certification = searchParams.get('certification')
    const grade = searchParams.get('grade')
    const search = searchParams.get('search')

    const where: any = {
      profileStatus: 'verified'
    }

    if (countryCode) {
      where.countryCode = countryCode
    }

    if (certification) {
      where.certifications = {
        some: {
          classBody: certification,
          status: 'active'
        }
      }
    }

    if (grade) {
      where.products = {
        some: {
          grade: grade
        }
      }
    }

    if (search) {
      where.OR = [
        { legalName: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { aliases: { has: search } }
      ]
    }

    const [manufacturers, total] = await Promise.all([
      prisma.manufacturer.findMany({
        where,
        include: {
          certifications: {
            where: { status: 'active' },
            select: {
              classBody: true,
              certCode: true,
              validTo: true
            }
          },
          products: {
            select: {
              category: true,
              grade: true,
              diameterMin: true,
              diameterMax: true
            }
          },
          facilities: {
            select: {
              name: true,
              annualCapacity: true
            }
          },
          _count: {
            select: {
              certifications: true,
              products: true,
              newsItems: true
            }
          }
        },
        orderBy: {
          lastVerifiedAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.manufacturer.count({ where })
    ])

    return NextResponse.json({
      manufacturers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching manufacturers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      legalName,
      brand,
      aliases = [],
      countryCode,
      address,
      geo = [],
      foundedYear,
      siteUrl,
      publicEmails = [],
      phones = []
    } = body

    // 验证必需字段
    if (!legalName || !countryCode) {
      return NextResponse.json(
        { error: 'Legal name and country code are required' },
        { status: 400 }
      )
    }

    // 检查是否已存在
    const existing = await prisma.manufacturer.findFirst({
      where: {
        legalName: legalName,
        countryCode: countryCode
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Manufacturer already exists' },
        { status: 409 }
      )
    }

    const manufacturer = await prisma.manufacturer.create({
      data: {
        legalName,
        brand,
        aliases,
        countryCode,
        address,
        geo,
        foundedYear,
        siteUrl,
        publicEmails,
        phones,
        profileStatus: 'pending'
      }
    })

    return NextResponse.json(manufacturer, { status: 201 })
  } catch (error) {
    console.error('Error creating manufacturer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
