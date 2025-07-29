import { pool, type BlogPost } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

async function getBlogPosts(): Promise<BlogPost[]> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC")
    return result.rows
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Return empty array as fallback
    return []
  } finally {
    client.release()
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function Blog() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Thoughts on web development, technology trends, and lessons learned from building scalable applications.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                {post.hero_image_url && (
                  <div className="relative h-64 bg-slate-900">
                    <Image
                      src={post.hero_image_url || "/placeholder.svg?height=256&width=800"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.created_at)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {estimateReadingTime(post.content)} min read
                    </div>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  {post.excerpt && <p className="text-slate-300 text-lg mb-6 leading-relaxed">{post.excerpt}</p>}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
