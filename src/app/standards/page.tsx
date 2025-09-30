import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  FileText, 
  Shield, 
  Globe,
  Download,
  ExternalLink,
  BookOpen,
  Award
} from 'lucide-react'

// Mock data - 在实际应用中这些数据会从数据库获取
const standards = [
  {
    id: '1',
    code: 'ISO 1704',
    title: 'Shipbuilding - Stud link anchor chains',
    description: 'International standard for stud link anchor chains used in marine applications.',
    category: 'International',
    organization: 'ISO',
    status: 'Current',
    lastUpdated: new Date('2020-01-01'),
    scope: 'Stud link anchor chains for ships and marine structures',
    grades: ['U2', 'U3'],
    diameterRange: '16-122mm',
    url: 'https://www.iso.org/standard/12345.html'
  },
  {
    id: '2',
    code: 'EN 1704',
    title: 'Shipbuilding - Stud link anchor chains',
    description: 'European standard for stud link anchor chains, harmonized with ISO 1704.',
    category: 'European',
    organization: 'CEN',
    status: 'Current',
    lastUpdated: new Date('2020-01-01'),
    scope: 'Stud link anchor chains for ships and marine structures',
    grades: ['U2', 'U3'],
    diameterRange: '16-122mm',
    url: 'https://www.cen.eu/standard/12345'
  },
  {
    id: '3',
    code: 'OCIMF Guidelines',
    title: 'Guidelines for the Selection of Anchor Chain',
    description: 'Industry guidelines for anchor chain selection and inspection.',
    category: 'Industry',
    organization: 'OCIMF',
    status: 'Current',
    lastUpdated: new Date('2019-06-01'),
    scope: 'Anchor chain selection, inspection, and maintenance',
    grades: ['U2', 'U3', 'R3', 'R4'],
    diameterRange: '16-150mm',
    url: 'https://www.ocimf.org/guidelines'
  },
  {
    id: '4',
    code: 'ABS Rules',
    title: 'Rules for Building and Classing Steel Vessels',
    description: 'American Bureau of Shipping rules for anchor chain requirements.',
    category: 'Classification',
    organization: 'ABS',
    status: 'Current',
    lastUpdated: new Date('2024-01-01'),
    scope: 'Anchor chain requirements for ABS classed vessels',
    grades: ['U2', 'U3', 'R3', 'R4'],
    diameterRange: '16-150mm',
    url: 'https://www.eagle.org/rules'
  },
  {
    id: '5',
    code: 'LR Rules',
    title: 'Rules and Regulations for the Classification of Ships',
    description: 'Lloyd\'s Register rules for anchor chain certification and requirements.',
    category: 'Classification',
    organization: 'LR',
    status: 'Current',
    lastUpdated: new Date('2024-01-01'),
    scope: 'Anchor chain certification and requirements for LR classed vessels',
    grades: ['U2', 'U3', 'R3', 'R4'],
    diameterRange: '16-150mm',
    url: 'https://www.lr.org/rules'
  },
  {
    id: '6',
    code: 'DNV Rules',
    title: 'Rules for Classification of Ships',
    description: 'DNV GL rules for anchor chain requirements and certification.',
    category: 'Classification',
    organization: 'DNV',
    status: 'Current',
    lastUpdated: new Date('2024-01-01'),
    scope: 'Anchor chain requirements for DNV classed vessels',
    grades: ['U2', 'U3', 'R3', 'R4'],
    diameterRange: '16-150mm',
    url: 'https://www.dnv.com/rules'
  }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'International', label: 'International' },
  { value: 'European', label: 'European' },
  { value: 'Industry', label: 'Industry' },
  { value: 'Classification', label: 'Classification' }
]

const organizations = [
  { value: 'all', label: 'All Organizations' },
  { value: 'ISO', label: 'ISO' },
  { value: 'CEN', label: 'CEN' },
  { value: 'OCIMF', label: 'OCIMF' },
  { value: 'ABS', label: 'ABS' },
  { value: 'LR', label: 'LR' },
  { value: 'DNV', label: 'DNV' }
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'International':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'European':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Industry':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'Classification':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getOrganizationIcon = (organization: string) => {
  switch (organization) {
    case 'ISO':
    case 'CEN':
      return <Globe className="h-4 w-4" />
    case 'OCIMF':
      return <BookOpen className="h-4 w-4" />
    case 'ABS':
    case 'LR':
    case 'DNV':
      return <Shield className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

export default function StandardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Standards & Certifications
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Comprehensive reference for anchor chain standards, certifications, and requirements
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Standards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search standards..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select className="w-full p-2 border rounded-md">
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Organization</label>
              <select className="w-full p-2 border rounded-md">
                {organizations.map((org) => (
                  <option key={org.value} value={org.value}>
                    {org.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standards.map((standard) => (
          <Card key={standard.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(standard.category)}>
                  {getOrganizationIcon(standard.organization)}
                  <span className="ml-1">{standard.category}</span>
                </Badge>
                <Badge variant="outline">{standard.status}</Badge>
              </div>
              <CardTitle className="text-lg">
                {standard.code}
              </CardTitle>
              <CardDescription className="text-sm">
                {standard.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {standard.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Organization:</span>
                  <span className="font-medium">{standard.organization}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>{standard.lastUpdated.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Grades:</span>
                  <span>{standard.grades.join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Diameter Range:</span>
                  <span>{standard.diameterRange}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a href={standard.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Standard
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Reference */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Quick Reference
          </CardTitle>
          <CardDescription>
            Common anchor chain grades and their applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">U2</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                General purpose anchor chain for small to medium vessels
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">U3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                High-strength chain for larger vessels and harsh conditions
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">R3</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Offshore mooring chains for oil and gas platforms
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">R4</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ultra-high strength for deep water applications
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">R5</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Maximum strength for extreme deep water conditions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="mt-8">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Understanding Standards?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Our team of maritime experts can help you understand which standards apply to your project 
            and ensure compliance with all relevant requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="/contact">
                Contact Our Experts
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/manufacturers">
                Find Certified Suppliers
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
