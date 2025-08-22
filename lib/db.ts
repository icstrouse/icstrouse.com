import { Pool } from "pg"

// Try multiple database URLs in order of preference
const getDatabaseUrl = () => {
  const urls = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NON_POOLING,
  ]

  return urls.find(Boolean) || undefined
}

const databaseUrl = getDatabaseUrl()

if (!databaseUrl) {
  console.error("No database URL found in environment variables")
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export { pool }

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  hero_image_url?: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface PortfolioProject {
  id: number
  title: string
  slug: string
  description?: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  featured: boolean
  created_at: string
  updated_at: string
  screenshots?: ProjectScreenshot[]
}

export interface ProjectScreenshot {
  id: number
  project_id: number
  image_url: string
  alt_text?: string
  display_order: number
}

// Helper function to safely execute queries
export async function executeQuery(query: string, params: any[] = []) {
  if (!databaseUrl) {
    throw new Error("No database URL configured")
  }

  const client = await pool.connect()
  try {
    const result = await client.query(query, params)
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  } finally {
    client.release()
  }
}
