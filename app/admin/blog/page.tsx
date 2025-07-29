import { pool, type BlogPost } from "@/lib/db"
import Link from "next/link"
import { Edit, Trash2, Plus, Eye } from "lucide-react"

async function getBlogPosts(): Promise<BlogPost[]> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM blog_posts ORDER BY created_at DESC")
    return result.rows
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  } finally {
    client.release()
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default async function AdminBlogList() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">No blog posts found. Create your first post!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-700/25">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{post.title}</div>
                          {post.excerpt && (
                            <div className="text-sm text-slate-400 mt-1 truncate max-w-md">{post.excerpt}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            post.published ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{formatDate(post.created_at)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {post.published && (
                            <Link
                              href={`/blog/${post.slug}`}
                              className="p-2 text-slate-400 hover:text-white transition-colors"
                              title="View Post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                            title="Edit Post"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
