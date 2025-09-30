import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 创建示例厂商数据
  const manufacturers = [
    {
      legalName: 'Jiangsu Anchor Chain Co., Ltd.',
      brand: 'JAC',
      aliases: ['JAC Chain', 'Jiangsu Anchor'],
      countryCode: 'CN',
      address: 'No. 1 Harbor Road, Nantong, Jiangsu, China',
      geo: [120.8, 32.0],
      foundedYear: 1985,
      siteUrl: 'https://www.jacchain.com',
      publicEmails: ['info@jacchain.com'],
      phones: ['+86-513-8888-8888'],
      profileStatus: 'verified',
      lastVerifiedAt: new Date()
    },
    {
      legalName: 'Ramnäs Bruk AB',
      brand: 'Ramnäs',
      aliases: ['Ramnas', 'Ramnäs Bruk'],
      countryCode: 'SE',
      address: 'Ramnäs, Sweden',
      geo: [16.2, 59.8],
      foundedYear: 1920,
      siteUrl: 'https://www.ramnas.se',
      publicEmails: ['info@ramnas.se'],
      phones: ['+46-220-12345'],
      profileStatus: 'verified',
      lastVerifiedAt: new Date()
    },
    {
      legalName: 'CMP Group',
      brand: 'CMP',
      aliases: ['CMP Marine', 'CMP Group'],
      countryCode: 'IT',
      address: 'Via Industriale, 1, 25010 Isorella (BS), Italy',
      geo: [10.3, 45.3],
      foundedYear: 1970,
      siteUrl: 'https://www.cmpgroup.it',
      publicEmails: ['info@cmpgroup.it'],
      phones: ['+39-030-995-1000'],
      profileStatus: 'verified',
      lastVerifiedAt: new Date()
    },
    {
      legalName: 'Peerless Chain Company',
      brand: 'Peerless',
      aliases: ['Peerless Chain', 'Peerless Marine'],
      countryCode: 'US',
      address: '2000 W. Washington St., Winona, MN 55987, USA',
      geo: [-91.6, 44.0],
      foundedYear: 1900,
      siteUrl: 'https://www.peerlesschain.com',
      publicEmails: ['info@peerlesschain.com'],
      phones: ['+1-507-454-2323'],
      profileStatus: 'verified',
      lastVerifiedAt: new Date()
    },
    {
      legalName: 'Daido Steel Co., Ltd.',
      brand: 'Daido',
      aliases: ['Daido Steel', 'Daido Marine'],
      countryCode: 'JP',
      address: '1-1, Nishiki-cho, Naka-ku, Nagoya, Japan',
      geo: [136.9, 35.2],
      foundedYear: 1916,
      siteUrl: 'https://www.daido.co.jp',
      publicEmails: ['info@daido.co.jp'],
      phones: ['+81-52-201-2111'],
      profileStatus: 'verified',
      lastVerifiedAt: new Date()
    }
  ]

  for (const manufacturerData of manufacturers) {
    const manufacturer = await prisma.manufacturer.upsert({
      where: { legalName: manufacturerData.legalName },
      update: {},
      create: manufacturerData
    })

    console.log(`✅ Created manufacturer: ${manufacturer.legalName}`)

    // 为每个厂商创建证书
    const certifications = [
      {
        classBody: 'LR',
        certCode: `LR-${manufacturer.id.slice(-6)}`,
        scope: 'Stud Link U2/U3, Studless U2/U3',
        validFrom: new Date('2023-01-01'),
        validTo: new Date('2026-12-31'),
        status: 'active'
      },
      {
        classBody: 'ABS',
        certCode: `ABS-${manufacturer.id.slice(-6)}`,
        scope: 'Anchor Chain U2/U3',
        validFrom: new Date('2023-06-01'),
        validTo: new Date('2025-05-31'),
        status: 'active'
      }
    ]

    for (const certData of certifications) {
      await prisma.certification.create({
        data: {
          ...certData,
          manufacturerId: manufacturer.id
        }
      })
    }

    // 为每个厂商创建产品
    const products = [
      {
        category: 'stud',
        grade: 'U2',
        diameterMin: 16,
        diameterMax: 122,
        treatment: ['bitumen'],
        standards: ['ISO 1704', 'OCIMF']
      },
      {
        category: 'studless',
        grade: 'U3',
        diameterMin: 20,
        diameterMax: 120,
        treatment: ['galvanized'],
        standards: ['ISO 1704', 'EN 1704']
      },
      {
        category: 'anchor_fittings',
        grade: 'U2',
        diameterMin: 16,
        diameterMax: 100,
        treatment: ['galvanized'],
        standards: ['ISO 1704']
      }
    ]

    for (const productData of products) {
      await prisma.product.create({
        data: {
          ...productData,
          manufacturerId: manufacturer.id
        }
      })
    }

    // 为每个厂商创建厂区
    await prisma.facility.create({
      data: {
        manufacturerId: manufacturer.id,
        name: 'Main Production Facility',
        address: manufacturerData.address,
        geo: manufacturerData.geo,
        annualCapacity: Math.floor(Math.random() * 50000) + 10000, // 10k-60k tons
        productionLines: ['Stud Link', 'Studless', 'Fittings']
      }
    })

    // 创建一些新闻条目
    const newsItems = [
      {
        sourceId: 'news-001',
        publisher: 'Maritime News',
        title: `${manufacturer.brand} Expands Production Capacity`,
        publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // 最近30天内
        lang: 'en',
        summary: `${manufacturer.brand} announces expansion of their production facility to meet growing demand.`,
        url: `https://example.com/news/${manufacturer.id}`,
        status: 'active'
      }
    ]

    for (const newsData of newsItems) {
      await prisma.newsItem.create({
        data: {
          ...newsData,
          manufacturerId: manufacturer.id
        }
      })
    }
  }

  // 创建一些招投标项目
  const bidProjects = [
    {
      title: 'Large Vessel Anchor Chain Supply',
      location: 'Singapore',
      description: 'Supply of stud link anchor chain for newbuild container vessel',
      specifications: {
        grade: 'U3',
        diameter: '76mm',
        length: '275m',
        treatment: 'galvanized'
      },
      quantity: 275,
      unit: 'meters',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
      status: 'open',
      source: 'Maritime Procurement Portal'
    },
    {
      title: 'Offshore Platform Mooring Chain',
      location: 'North Sea',
      description: 'Supply of studless chain for offshore platform mooring system',
      specifications: {
        grade: 'R4',
        diameter: '120mm',
        length: '1000m',
        treatment: 'bitumen'
      },
      quantity: 1000,
      unit: 'meters',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45天后
      status: 'open',
      source: 'Offshore Industry News'
    }
  ]

  for (const bidData of bidProjects) {
    await prisma.bidProject.create({
      data: bidData
    })
  }

  // 创建数据源目录
  const sources = [
    {
      name: 'Maritime News RSS',
      url: 'https://example.com/maritime-news.rss',
      type: 'rss',
      crawlerType: 'rss',
      robotsStatus: 'allowed',
      crawlFrequency: 60, // 每小时
      isActive: true
    },
    {
      name: 'Lloyd\'s Register Certificates',
      url: 'https://www.lr.org/en/certificates',
      type: 'scraper',
      crawlerType: 'playwright',
      robotsStatus: 'allowed',
      crawlFrequency: 1440, // 每天
      isActive: true
    }
  ]

  for (const sourceData of sources) {
    await prisma.sourceCatalog.create({
      data: sourceData
    })
  }

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
