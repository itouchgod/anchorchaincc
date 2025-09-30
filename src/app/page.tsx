import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Users, 
  FileText,
  Globe,
  Award,
  Factory,
  BarChart3
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Global Anchor Chain
              <span className="text-blue-600 dark:text-blue-400"> Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              The world's most comprehensive directory of anchor chain manufacturers, 
              certifications, and industry intelligence. Find, compare, and connect with 
              certified suppliers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/manufacturers">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Manufacturers
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/compare">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Compare Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Manufacturers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive manufacturer profiles, real-time certification tracking, 
              and industry intelligence in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Factory className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Manufacturer Directory</CardTitle>
                <CardDescription>
                  Browse verified manufacturers by location, certification, 
                  and product specifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Certification Tracking</CardTitle>
                <CardDescription>
                  Monitor certification status, expiration dates, and 
                  compliance across all major class societies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Industry Intelligence</CardTitle>
                <CardDescription>
                  Stay updated with the latest news, market trends, 
                  and industry developments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle>Product Comparison</CardTitle>
                <CardDescription>
                  Compare specifications, certifications, and capabilities 
                  across multiple manufacturers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-red-600 mb-2" />
                <CardTitle>Global Coverage</CardTitle>
                <CardDescription>
                  Access manufacturers and suppliers from every major 
                  maritime region worldwide.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>Documentation</CardTitle>
                <CardDescription>
                  Access product catalogs, test reports, and technical 
                  specifications in one place.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Updates Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Industry Updates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest news, certification updates, and market developments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Certification</Badge>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <CardTitle className="text-lg">
                  New LR Certification for Jiangsu Anchor Chain
                </CardTitle>
                <CardDescription>
                  Lloyd's Register approves new stud link chain production line 
                  with U3 grade certification.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Market News</Badge>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <CardTitle className="text-lg">
                  Global Anchor Chain Market Growth
                </CardTitle>
                <CardDescription>
                  Industry report shows 15% growth in demand for high-grade 
                  anchor chains in offshore sector.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Technology</Badge>
                  <span className="text-sm text-gray-500">2 weeks ago</span>
                </div>
                <CardTitle className="text-lg">
                  New Coating Technology for Marine Chains
                </CardTitle>
                <CardDescription>
                  Innovative galvanizing process extends chain life by 30% 
                  in harsh marine environments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/news">
                View All Updates
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Supplier?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of maritime professionals who trust our platform 
            for their anchor chain sourcing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/manufacturers">
                <Search className="mr-2 h-5 w-5" />
                Start Searching
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/submit">
                <Users className="mr-2 h-5 w-5" />
                Submit Your Company
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
