import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Search, 
  Filter, 
  MapPin, 
  Shield, 
  Factory, 
  ExternalLink,
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
    certifications: ['LR', 'ABS', 'DNV'],
    products: ['Stud Link U2/U3', 'Studless U2/U3', 'Anchor Fittings'],
    status: 'verified',
    lastVerifiedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    legalName: 'Ramnäs Bruk AB',
    brand: 'Ramnäs',
    countryCode: 'SE',
    address: 'Ramnäs, Sweden',
    certifications: ['LR', 'ABS', 'RINA'],
    products: ['Stud Link U2/U3', 'Studless U2/U3'],
    status: 'verified',
    lastVerifiedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    legalName: 'CMP Group',
    brand: 'CMP',
    countryCode: 'IT',
    address: 'Isorella, Italy',
    certifications: ['LR', 'ABS', 'DNV', 'RINA'],
    products: ['Stud Link U2/U3', 'Studless U2/U3', 'Anchor Fittings'],
    status: 'verified',
    lastVerifiedAt: new Date('2024-01-12')
  },
  {
    id: '4',
    legalName: 'Peerless Chain Company',
    brand: 'Peerless',
    countryCode: 'US',
    address: 'Winona, MN, USA',
    certifications: ['ABS', 'DNV'],
    products: ['Stud Link U2/U3', 'Studless U2/U3'],
    status: 'verified',
    lastVerifiedAt: new Date('2024-01-08')
  },
  {
    id: '5',
    legalName: 'Daido Steel Co., Ltd.',
    brand: 'Daido',
    countryCode: 'JP',
    address: 'Nagoya, Japan',
    certifications: ['LR', 'ABS', 'DNV', 'CCS'],
    products: ['Stud Link U2/U3', 'Studless U2/U3', 'Anchor Fittings'],
    status: 'verified',
    lastVerifiedAt: new Date('2024-01-14')
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

export default function ManufacturersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Anchor Chain Manufacturers
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Browse verified manufacturers by location, certification, and product specifications
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search manufacturers..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All countries</SelectItem>
                  <SelectItem value="CN">China</SelectItem>
                  <SelectItem value="SE">Sweden</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Certification</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All certifications" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All certifications</SelectItem>
                  <SelectItem value="LR">Lloyd's Register</SelectItem>
                  <SelectItem value="ABS">American Bureau of Shipping</SelectItem>
                  <SelectItem value="DNV">DNV GL</SelectItem>
                  <SelectItem value="RINA">RINA</SelectItem>
                  <SelectItem value="CCS">China Classification Society</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Product Grade</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All grades</SelectItem>
                  <SelectItem value="U2">U2</SelectItem>
                  <SelectItem value="U3">U3</SelectItem>
                  <SelectItem value="R3">R3</SelectItem>
                  <SelectItem value="R4">R4</SelectItem>
                  <SelectItem value="R5">R5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {manufacturers.map((manufacturer) => (
          <Card key={manufacturer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {manufacturer.brand}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {manufacturer.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {manufacturer.legalName}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {countryNames[manufacturer.countryCode]} • {manufacturer.address}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {manufacturer.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Products:</span> {manufacturer.products.join(', ')}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                  <Button asChild>
                    <Link href={`/manufacturers/${manufacturer.id}`}>
                      <Factory className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/manufacturers/${manufacturer.id}/compare`}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Compare
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}
