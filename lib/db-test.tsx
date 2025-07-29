"use client"

import { useState } from "react"

export default function DatabaseConnectionTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult("")

    try {
      const response = await fetch("/api/test-db")
      const data = await response.json()

      if (response.ok) {
        setTestResult(`✅ Database connection successful!\n${JSON.stringify(data, null, 2)}`)
      } else {
        setTestResult(`❌ Database connection failed:\n${data.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-800/50 rounded-xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-4">Database Connection Test</h2>

      <button
        onClick={testConnection}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors mb-4"
      >
        {isLoading ? "Testing..." : "Test Database Connection"}
      </button>

      {testResult && (
        <pre className="bg-slate-900 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">{testResult}</pre>
      )}

      <div className="mt-6 text-sm text-slate-400">
        <h3 className="font-semibold mb-2">Available Environment Variables:</h3>
        <ul className="space-y-1">
          <li>• DATABASE_URL</li>
          <li>• POSTGRES_URL</li>
          <li>• POSTGRES_PRISMA_URL</li>
          <li>• DATABASE_URL_UNPOOLED</li>
          <li>• POSTGRES_URL_NON_POOLING</li>
        </ul>
        <p className="mt-2">The connection will try DATABASE_URL first, then fall back to other available URLs.</p>
      </div>
    </div>
  )
}
