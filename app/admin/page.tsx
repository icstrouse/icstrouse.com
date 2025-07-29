import Link from "next/link"
import { PenTool, FolderOpen, Plus } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-slate-400">Manage your blog posts and portfolio projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Management */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
            <div className="flex items-center mb-6">
              <PenTool className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold">Blog Posts</h2>
            </div>
            <p className="text-slate-300 mb-6">Create and manage your blog posts with the rich text editor.</p>
            <div className="space-y-3">
              <Link
                href="/admin/blog/new"
                className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Blog Post
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center justify-center w-full px-4 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                Manage Posts
              </Link>
            </div>
          </div>

          {/* Portfolio Management */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8">
            <div className="flex items-center mb-6">
              <FolderOpen className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold">Portfolio</h2>
            </div>
            <p className="text-slate-300 mb-6">Add and update your portfolio projects with screenshots.</p>
            <div className="space-y-3">
              <Link
                href="/admin/portfolio/new"
                className="flex items-center justify-center w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Link>
              <Link
                href="/admin/portfolio"
                className="flex items-center justify-center w-full px-4 py-3 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                Manage Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
