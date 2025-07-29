import { pool, type PortfolioProject } from "@/lib/db"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const client = await pool.connect()
  try {
    // First get all projects
    const projectsResult = await client.query(`
      SELECT * FROM portfolio_projects 
      ORDER BY featured DESC, created_at DESC
    `)

    const projects = projectsResult.rows

    // Then get screenshots for each project
    for (const project of projects) {
      const screenshotsResult = await client.query(
        `
        SELECT * FROM project_screenshots 
        WHERE project_id = $1 
        ORDER BY display_order ASC
      `,
        [project.id],
      )

      project.screenshots = screenshotsResult.rows
    }

    return projects
  } catch (error) {
    console.error("Error fetching portfolio projects:", error)
    // Return empty array as fallback
    return []
  } finally {
    client.release()
  }
}

export default async function Portfolio() {
  const projects = await getPortfolioProjects()

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">My Portfolio</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A collection of projects I've built over the years, showcasing my skills in full stack development and
            problem-solving.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No projects found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors"
              >
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="relative h-64 bg-slate-900">
                    <Image
                      src={project.screenshots[0].image_url || "/placeholder.svg?height=256&width=400"}
                      alt={project.screenshots[0].alt_text || project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    {project.featured && (
                      <span className="px-2 py-1 bg-blue-600 text-xs font-medium rounded">Featured</span>
                    )}
                  </div>

                  <p className="text-slate-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack &&
                      project.tech_stack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-700 text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                  </div>

                  <div className="flex gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
