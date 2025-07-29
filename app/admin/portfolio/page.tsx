import { pool, type PortfolioProject } from "@/lib/db"
import Link from "next/link"
import { Edit, Trash2, Plus, Eye, Star } from "lucide-react"

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const client = await pool.connect()
  try {
    const result = await client.query("SELECT * FROM portfolio_projects ORDER BY featured DESC, created_at DESC")
    return result.rows
  } catch (error) {
    console.error("Error fetching portfolio projects:", error)
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

export default async function AdminPortfolioList() {
  const projects = await getPortfolioProjects()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Portfolio Projects</h1>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">No portfolio projects found. Create your first project!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Tech Stack</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-slate-300">Created</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-700/25">
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-white">{project.title}</div>
                            {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                          </div>
                          {project.description && (
                            <div className="text-sm text-slate-400 mt-1 truncate max-w-md">{project.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack &&
                            project.tech_stack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          {project.tech_stack && project.tech_stack.length > 3 && (
                            <span className="text-xs text-slate-400">+{project.tech_stack.length - 3} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {project.github_url && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded">
                              GitHub
                            </span>
                          )}
                          {project.live_url && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded">
                              Live
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{formatDate(project.created_at)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/portfolio`}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                            title="View Portfolio"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/portfolio/edit/${project.id}`}
                            className="p-2 text-slate-400 hover:text-purple-400 transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete Project"
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
