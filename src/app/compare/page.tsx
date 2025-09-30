import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Plus, 
  X, 
  Download, 
  BarChart3,
  Shield,
  Factory,
  MapPin,
  Globe
} from 'lucide-react'
import Link from 'next/link'

// Mock data - 在实际应用中这些数据会从数据库获取
const manufacturers = [
  {
    id: '1',
    legalName: 'Jiangsu Anchor Chain Co., Ltd.',
    brand: 'JAC',
    countryCode: 'CN',
    address: 'Nantong, Jiangsu, China',
    foundedYear: 1985,
    certifications: ['LR', 'ABS', 'DNV'],
    products: [
      { category: 'stud', grade: 'U2', diameterMin: 16, diameterMax: 122 },
      { category: 'studless', grade: 'U3', diameterMin: 20, diameterMax: 120 }
    ],
    annualCapacity: 50000,
    siteUrl: 'https://www.jacchain.com'
  },
  {
    id: '2',
    legalName: 'Ramnäs Bruk AB',
    brand: 'Ramnäs',
    countryCode: 'SE',
    address: 'Ramnäs, Sweden',
    foundedYear: 1920,
    certifications: ['LR', 'ABS', 'RINA'],
    products: [
      { category: 'stud', grade: 'U2', diameterMin: 16, diameterMax: 100 },
      { category: 'studless', grade: 'U3', diameterMin: 20, diameterMax: 100 }
    ],
    annualCapacity: 25000,
    siteUrl: 'https://www.ramnas.se'
  },
  {
    id: '3',
    legalName: 'CMP Group',
    brand: 'CMP',
    countryCode: 'IT',
    address: 'Isorella, Italy',
    foundedYear: 1970,
    certifications: ['LR', 'ABS', 'DNV', 'RINA'],
    products: [
      { category: 'stud', grade: 'U2', diameterMin: 16, diameterMax: 130 },
      { category: 'studless', grade: 'U3', diameterMin: 20, diameterMax: 130 }
    ],
    annualCapacity: 40000,
    siteUrl: 'https://www.cmpgroup.it'
  }
]

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

export default function ComparePage() {
  // 在实际应用中，这里会从URL参数或状态管理中获取选中的厂商
  const selectedManufacturers = manufacturers.slice(0, 2) // 示例：选择前两个厂商

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Compare Manufacturers
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Compare specifications, certifications, and capabilities across multiple manufacturers
        </p>
      </div>

      {/* Manufacturer Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Select Manufacturers to Compare
          </CardTitle>
          <CardDescription>
            Choose up to 4 manufacturers to compare side by side
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((slot) => (
              <div key={slot} className="space-y-2">
                <label className="text-sm font-medium">
                  Manufacturer {slot}
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.brand} - {countryNames[manufacturer.countryCode]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add to Comparison
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Comparison
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedManufacturers.length > 0 && (
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Attribute</TableHead>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableHead key={manufacturer.id} className="text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">{manufacturer.brand}</span>
                            <span className="text-sm text-gray-500">
                              {countryNames[manufacturer.countryCode]}
                            </span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Legal Name</TableCell>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableCell key={manufacturer.id}>
                          {manufacturer.legalName}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Founded</TableCell>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableCell key={manufacturer.id}>
                          {manufacturer.foundedYear}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableCell key={manufacturer.id}>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {manufacturer.address}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Annual Capacity</TableCell>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableCell key={manufacturer.id}>
                          {manufacturer.annualCapacity.toLocaleString()} tons
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Website</TableCell>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableCell key={manufacturer.id}>
                          <a 
                            href={manufacturer.siteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            Visit Site
                          </a>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Society</TableHead>
                      {selectedManufacturers.map((manufacturer) => (
                        <TableHead key={manufacturer.id} className="text-center">
                          {manufacturer.brand}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(classBodies).map(([code, name]) => (
                      <TableRow key={code}>
                        <TableCell className="font-medium">{name}</TableCell>
                        {selectedManufacturers.map((manufacturer) => (
                          <TableCell key={manufacturer.id} className="text-center">
                            {manufacturer.certifications.includes(code) ? (
                              <Badge variant="default">✓</Badge>
                            ) : (
                              <Badge variant="outline">✗</Badge>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Product Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Factory className="mr-2 h-5 w-5" />
                Product Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['stud', 'studless'].map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-4 capitalize">
                      {category.replace('_', ' ')} Chain
                    </h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Grade</TableHead>
                            <TableHead>Diameter Range (mm)</TableHead>
                            {selectedManufacturers.map((manufacturer) => (
                              <TableHead key={manufacturer.id} className="text-center">
                                {manufacturer.brand}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {['U2', 'U3', 'R3', 'R4', 'R5'].map((grade) => (
                            <TableRow key={grade}>
                              <TableCell className="font-medium">{grade}</TableCell>
                              <TableCell>
                                {selectedManufacturers
                                  .flatMap(m => m.products)
                                  .filter(p => p.category === category && p.grade === grade)
                                  .map(p => `${p.diameterMin}-${p.diameterMax}`)
                                  .join(', ') || '-'}
                              </TableCell>
                              {selectedManufacturers.map((manufacturer) => {
                                const product = manufacturer.products.find(
                                  p => p.category === category && p.grade === grade
                                )
                                return (
                                  <TableCell key={manufacturer.id} className="text-center">
                                    {product ? (
                                      <Badge variant="default">
                                        {product.diameterMin}-{product.diameterMax}mm
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline">Not Available</Badge>
                                    )}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Request Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/manufacturers">
                    Browse All Manufacturers
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Comparison
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {selectedManufacturers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Manufacturers Selected</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Select manufacturers from the dropdown above to start comparing
            </p>
            <Button asChild>
              <Link href="/manufacturers">
                Browse Manufacturers
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
