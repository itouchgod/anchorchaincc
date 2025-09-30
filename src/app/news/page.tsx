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
  Search, 
  Filter, 
  Calendar,
  ExternalLink,
  TrendingUp,
  Shield,
  Factory,
  Globe
} from 'lucide-react'
import Link from 'next/link'

// Mock data - 在实际应用中这些数据会从数据库获取
const newsItems = [
  {
    id: '1',
    title: 'New LR Certification for Jiangsu Anchor Chain',
    summary: 'Lloyd\'s Register approves new stud link chain production line with U3 grade certification.',
    publishedAt: new Date('2024-01-20'),
    category: 'certification',
    manufacturer: 'Jiangsu Anchor Chain Co., Ltd.',
    manufacturerId: '1',
    url: 'https://example.com/news/lr-certification-jac',
    tags: ['LR', 'U3', 'Certification']
  },
  {
    id: '2',
    title: 'Global Anchor Chain Market Growth',
    summary: 'Industry report shows 15% growth in demand for high-grade anchor chains in offshore sector.',
    publishedAt: new Date('2024-01-18'),
    category: 'market',
    manufacturer: null,
    manufacturerId: null,
    url: 'https://example.com/news/market-growth',
    tags: ['Market', 'Growth', 'Offshore']
  },
  {
    id: '3',
    title: 'New Coating Technology for Marine Chains',
    summary: 'Innovative galvanizing process extends chain life by 30% in harsh marine environments.',
    publishedAt: new Date('2024-01-15'),
    category: 'technology',
    manufacturer: 'CMP Group',
    manufacturerId: '3',
    url: 'https://example.com/news/coating-technology',
    tags: ['Technology', 'Galvanizing', 'Innovation']
  },
  {
    id: '4',
    title: 'Ramnäs Bruk Expands European Operations',
    summary: 'Swedish manufacturer announces new facility in Germany to serve growing European market.',
    publishedAt: new Date('2024-01-12'),
    category: 'expansion',
    manufacturer: 'Ramnäs Bruk AB',
    manufacturerId: '2',
    url: 'https://example.com/news/ramnas-expansion',
    tags: ['Expansion', 'Europe', 'Germany']
  },
  {
    id: '5',
    title: 'ABS Updates Chain Testing Standards',
    summary: 'American Bureau of Shipping releases updated testing requirements for marine anchor chains.',
    publishedAt: new Date('2024-01-10'),
    category: 'standards',
    manufacturer: null,
    manufacturerId: null,
    url: 'https://example.com/news/abs-standards',
    tags: ['ABS', 'Standards', 'Testing']
  },
  {
    id: '6',
    title: 'Daido Steel Launches New R4 Grade Chain',
    summary: 'Japanese manufacturer introduces new R4 grade studless chain for deep-sea applications.',
    publishedAt: new Date('2024-01-08'),
    category: 'product',
    manufacturer: 'Daido Steel Co., Ltd.',
    manufacturerId: '5',
    url: 'https://example.com/news/daido-r4',
    tags: ['R4', 'Studless', 'Deep-sea']
  }
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'certification', label: 'Certification' },
  { value: 'market', label: 'Market News' },
  { value: 'technology', label: 'Technology' },
  { value: 'expansion', label: 'Expansion' },
  { value: 'standards', label: 'Standards' },
  { value: 'product', label: 'Product Launch' }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'certification':
      return <Shield className="h-4 w-4" />
    case 'market':
      return <TrendingUp className="h-4 w-4" />
    case 'technology':
      return <Globe className="h-4 w-4" />
    case 'expansion':
      return <Factory className="h-4 w-4" />
    case 'standards':
      return <Shield className="h-4 w-4" />
    case 'product':
      return <Factory className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'certification':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'market':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'technology':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'expansion':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'standards':
      return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
    case 'product':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Industry News & Updates
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Stay informed with the latest developments in the anchor chain industry
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search news..." 
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="week">Past week</SelectItem>
                  <SelectItem value="month">Past month</SelectItem>
                  <SelectItem value="quarter">Past quarter</SelectItem>
                  <SelectItem value="year">Past year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <Card key={news.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(news.category)}>
                  {getCategoryIcon(news.category)}
                  <span className="ml-1 capitalize">{news.category}</span>
                </Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {news.publishedAt.toLocaleDateString()}
                </span>
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {news.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-3">
                {news.summary}
              </CardDescription>
              
              {news.manufacturer && (
                <div className="mb-4">
                  <Link 
                    href={`/manufacturers/${news.manufacturerId}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {news.manufacturer}
                  </Link>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {news.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" size="sm" asChild className="w-full">
                <a href={news.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read More
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" disabled>Previous</Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <Card className="mt-12">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest industry news, certification updates, and market insights 
            delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
