import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  MapPin, 
  Shield, 
  Factory, 
  Globe, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  TrendingUp,
  Award,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Mock data - 在实际应用中这些数据会从数据库获取
const manufacturerData = {
  id: '1',
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
  lastVerifiedAt: new Date('2024-01-15'),
  certifications: [
    {
      id: '1',
      classBody: 'LR',
      certCode: 'LR-QAIC-2024-001',
      scope: 'Stud Link U2/U3, Studless U2/U3',
      validFrom: new Date('2023-01-01'),
      validTo: new Date('2026-12-31'),
      status: 'active'
    },
    {
      id: '2',
      classBody: 'ABS',
      certCode: 'ABS-2024-002',
      scope: 'Anchor Chain U2/U3',
      validFrom: new Date('2023-06-01'),
      validTo: new Date('2025-05-31'),
      status: 'active'
    }
  ],
  products: [
    {
      id: '1',
      category: 'stud',
      grade: 'U2',
      diameterMin: 16,
      diameterMax: 122,
      treatment: ['bitumen'],
      standards: ['ISO 1704', 'OCIMF']
    },
    {
      id: '2',
      category: 'studless',
      grade: 'U3',
      diameterMin: 20,
      diameterMax: 120,
      treatment: ['galvanized'],
      standards: ['ISO 1704', 'EN 1704']
    }
  ],
  facilities: [
    {
      id: '1',
      name: 'Main Production Facility',
      address: 'No. 1 Harbor Road, Nantong, Jiangsu, China',
      annualCapacity: 50000,
      productionLines: ['Stud Link', 'Studless', 'Fittings']
    }
  ],
  newsItems: [
    {
      id: '1',
      title: 'JAC Expands Production Capacity',
      publishedAt: new Date('2024-01-10'),
      summary: 'JAC announces expansion of their production facility to meet growing demand.',
      url: 'https://example.com/news/jac-expansion'
    }
  ]
}

const countryNames: Record<string, string> = {
  CN: 'China',
  SE: 'Sweden',
  IT: 'Italy',
  US: 'United States',
  JP: 'Japan'
}

const classBodies: Record<string, string> = {
  LR: 'Lloyd\'s Register',
  ABS: 'American Bureau of Shipping',
  DNV: 'DNV GL',
  RINA: 'RINA',
  CCS: 'China Classification Society'
}

interface PageProps {
  params: {
    id: string
  }
}

export default function ManufacturerDetailPage({ params }: PageProps) {
  const manufacturer = manufacturerData // 在实际应用中根据params.id从数据库获取

  if (!manufacturer) {
    notFound()
  }

  const getCertificationStatus = (validTo: Date) => {
    const now = new Date()
    const threeMonthsFromNow = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000)
    
    if (validTo < now) return { status: 'expired', color: 'destructive' }
    if (validTo < threeMonthsFromNow) return { status: 'expiring', color: 'secondary' }
    return { status: 'active', color: 'default' }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {manufacturer.brand}
          </h1>
          <Badge variant="secondary">{manufacturer.profileStatus}</Badge>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          {manufacturer.legalName}
        </p>
        <div className="flex items-center text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {countryNames[manufacturer.countryCode]} • {manufacturer.address}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Button asChild>
          <Link href={`/manufacturers/${manufacturer.id}/compare`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Compare
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={manufacturer.siteUrl} target="_blank" rel="noopener noreferrer">
            <Globe className="h-4 w-4 mr-2" />
            Visit Website
          </a>
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="news">News & Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Factory className="h-5 w-5 mr-2" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Founded</label>
                  <p className="text-lg">{manufacturer.foundedYear}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Country</label>
                  <p className="text-lg">{countryNames[manufacturer.countryCode]}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Address</label>
                  <p className="text-lg">{manufacturer.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <a 
                    href={manufacturer.siteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {manufacturer.siteUrl}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Certifications Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {manufacturer.certifications.map((cert) => {
                    const statusInfo = getCertificationStatus(cert.validTo)
                    return (
                      <div key={cert.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{classBodies[cert.classBody]}</p>
                          <p className="text-sm text-gray-500">{cert.certCode}</p>
                        </div>
                        <Badge variant={statusInfo.color as any}>
                          {statusInfo.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                All current and historical certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Society</TableHead>
                    <TableHead>Certificate Code</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Valid From</TableHead>
                    <TableHead>Valid To</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manufacturer.certifications.map((cert) => {
                    const statusInfo = getCertificationStatus(cert.validTo)
                    return (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">
                          {classBodies[cert.classBody]}
                        </TableCell>
                        <TableCell>{cert.certCode}</TableCell>
                        <TableCell>{cert.scope}</TableCell>
                        <TableCell>{cert.validFrom.toLocaleDateString()}</TableCell>
                        <TableCell>{cert.validTo.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.color as any}>
                            {statusInfo.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Specifications</CardTitle>
              <CardDescription>
                Available product categories and specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Diameter Range (mm)</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Standards</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {manufacturer.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium capitalize">
                        {product.category.replace('_', ' ')}
                      </TableCell>
                      <TableCell>{product.grade}</TableCell>
                      <TableCell>
                        {product.diameterMin} - {product.diameterMax}
                      </TableCell>
                      <TableCell>
                        {product.treatment.join(', ')}
                      </TableCell>
                      <TableCell>
                        {product.standards.join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Facilities</CardTitle>
              <CardDescription>
                Manufacturing locations and capacity information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manufacturer.facilities.map((facility) => (
                  <div key={facility.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p>{facility.address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Annual Capacity</label>
                        <p>{facility.annualCapacity.toLocaleString()} tons</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Production Lines</label>
                        <p>{facility.productionLines.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent News & Updates</CardTitle>
              <CardDescription>
                Latest news and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manufacturer.newsItems.map((news) => (
                  <div key={news.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{news.title}</h3>
                      <span className="text-sm text-gray-500">
                        {news.publishedAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {news.summary}
                    </p>
                    <a 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Read more →
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
