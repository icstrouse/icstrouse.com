import { pool, type BlogPost } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_posts WHERE slug = $1 AND published = true", [slug])
    return result.rows[0] || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
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

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Ian Strouse`,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article>
          {post.hero_image_url && (
            <div className="relative h-96 bg-slate-900 rounded-xl overflow-hidden mb-8">
              <Image
                src={post.hero_image_url || "/placeholder.svg?height=384&width=800"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <header className="mb-8">
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

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>

            {post.excerpt && <p className="text-xl text-slate-300 leading-relaxed">{post.excerpt}</p>}
          </header>

          <div
            className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
