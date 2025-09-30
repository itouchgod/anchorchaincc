'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Menu, Globe, Search, MapPin } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">AC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">AnchorChain</span>
            <span className="text-xs text-muted-foreground">Industry Intelligence</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/manufacturers" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Manufacturers
          </Link>
          <Link 
            href="/news" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            News & Updates
          </Link>
          <Link 
            href="/compare" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Compare
          </Link>
          <Link 
            href="/standards" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Standards
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>中文</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/manufacturers">Manufacturers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/news">News & Updates</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/compare">Compare</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/standards">Standards</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
