import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  "AI in Healthcare",
  "Speech Tips",
  "Technology",
  "Success Stories",
  "Research",
]

const recentPosts = [
  "The Future of Voice Therapy",
  "Understanding Speech Disorders",
  "Euphonia's Latest Features",
  "Voice Exercises for Beginners",
]

export function BlogSidebar() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="outline">{category}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post} className="text-sm text-muted-foreground hover:text-foreground">
                <a href="#">{post}</a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

