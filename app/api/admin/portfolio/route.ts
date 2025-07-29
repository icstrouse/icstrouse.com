import { type NextRequest, NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, description, tech_stack, github_url, live_url, featured, screenshots } = body

    const client = await pool.connect()
    try {
      await client.query("BEGIN")

      // Insert the portfolio project
      const projectResult = await client.query(
        `INSERT INTO portfolio_projects (title, slug, description, tech_stack, github_url, live_url, featured, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
         RETURNING *`,
        [title, slug, description, tech_stack, github_url || null, live_url || null, featured],
      )

      const project = projectResult.rows[0]

      // Insert screenshots if provided
      if (screenshots && screenshots.length > 0) {
        for (let i = 0; i < screenshots.length; i++) {
          const screenshot = screenshots[i]
          await client.query(
            `INSERT INTO project_screenshots (project_id, image_url, alt_text, display_order)
             VALUES ($1, $2, $3, $4)`,
            [project.id, screenshot.image_url, screenshot.alt_text || null, i + 1],
          )
        }
      }

      await client.query("COMMIT")
      return NextResponse.json(project, { status: 201 })
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Error creating portfolio project:", error)
    return NextResponse.json({ error: "Failed to create portfolio project" }, { status: 500 })
  }
}
