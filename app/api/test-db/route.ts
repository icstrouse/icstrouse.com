import { NextResponse } from "next/server"
import { Pool } from "pg"

export async function GET() {
  // List of possible database URLs in order of preference
  const dbUrls = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NON_POOLING,
  ]

  const availableUrls = dbUrls.filter(Boolean)

  if (availableUrls.length === 0) {
    return NextResponse.json(
      {
        error: "No database URL found in environment variables",
        availableVars: Object.keys(process.env).filter((key) => key.includes("DATABASE") || key.includes("POSTGRES")),
      },
      { status: 500 },
    )
  }

  // Try each URL until one works
  for (let i = 0; i < availableUrls.length; i++) {
    const url = availableUrls[i]
    const pool = new Pool({
      connectionString: url,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    })

    try {
      const client = await pool.connect()

      // Test basic connection
      const result = await client.query("SELECT NOW() as current_time, version() as postgres_version")

      // Check if our tables exist
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('blog_posts', 'portfolio_projects', 'project_screenshots')
        ORDER BY table_name
      `)

      client.release()
      await pool.end()

      return NextResponse.json({
        success: true,
        connectionString: url?.substring(0, 50) + "...", // Show partial URL for security
        serverTime: result.rows[0].current_time,
        postgresVersion: result.rows[0].postgres_version,
        tablesFound: tablesResult.rows.map((row) => row.table_name),
        tablesExpected: ["blog_posts", "portfolio_projects", "project_screenshots"],
        needsSetup: tablesResult.rows.length === 0,
      })
    } catch (error) {
      await pool.end()

      if (i === availableUrls.length - 1) {
        // Last attempt failed
        return NextResponse.json(
          {
            error: `Database connection failed: ${error}`,
            triedUrls: availableUrls.length,
            lastError: error instanceof Error ? error.message : String(error),
          },
          { status: 500 },
        )
      }
      // Continue to next URL
    }
  }

  return NextResponse.json({ error: "All database connection attempts failed" }, { status: 500 })
}
