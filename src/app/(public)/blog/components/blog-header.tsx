import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export function BlogHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <Link href="/" className="text-2xl font-bold">
            Euphonia Blog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/blog" className="hover:underline">Home</Link></li>
              <li><Link href="/blog/categories" className="hover:underline">Categories</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search blog..."
              className="w-full md:w-auto"
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
          <Button variant="secondary">Try Euphonia</Button>
        </div>
      </div>
    </header>
  )
}

