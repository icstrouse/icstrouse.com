import DatabaseConnectionTest from "@/lib/db-test"

export default function TestDatabasePage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Database Connection Test</h1>
          <p className="text-slate-400">Use this page to verify your database connection is working properly.</p>
        </div>

        <DatabaseConnectionTest />

        <div className="mt-8 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Setup Instructions</h2>
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Database Connection</h3>
              <p>
                Your environment has several database URLs available. The system will automatically try them in this
                order:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                <li>DATABASE_URL (recommended)</li>
                <li>POSTGRES_URL</li>
                <li>POSTGRES_PRISMA_URL</li>
                <li>DATABASE_URL_UNPOOLED</li>
                <li>POSTGRES_URL_NON_POOLING</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">2. Create Tables</h3>
              <p>If the connection test shows "needsSetup: true", you need to run the SQL scripts:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                <li>Run scripts/01-create-tables.sql</li>
                <li>Run scripts/02-seed-data.sql</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">3. Verify Setup</h3>
              <p>After running the scripts, test the connection again to ensure all tables are created.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
