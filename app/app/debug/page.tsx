"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"

export default function DebugPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [errorLogs, setErrorLogs] = useState("")

  const testGemini = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-with-gemini')
      const data = await response.json()
      setResult(data.result || data.error || 'No response')
    } catch (error) {
      setResult(`Error: ${error}`)
    }
    setLoading(false)
  }

  const analyzeDeployment = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-with-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze-deployment',
          errorLogs: errorLogs
        })
      })
      const data = await response.json()
      setResult(data.result || data.error || 'No response')
    } catch (error) {
      setResult(`Error: ${error}`)
    }
    setLoading(false)
  }

  const analyzeStructure = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-with-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze-structure'
        })
      })
      const data = await response.json()
      setResult(data.result || data.error || 'No response')
    } catch (error) {
      setResult(`Error: ${error}`)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Debug with Google Gemini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Vercel Error Logs</h3>
            <Textarea
              placeholder="Paste your Vercel error logs here..."
              value={errorLogs}
              onChange={(e) => setErrorLogs(e.target.value)}
              rows={6}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={testGemini} disabled={loading}>
              {loading ? "Testing..." : "Test Gemini Connection"}
            </Button>
            <Button onClick={analyzeStructure} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Code Structure"}
            </Button>
            <Button onClick={analyzeDeployment} disabled={loading || !errorLogs}>
              {loading ? "Analyzing..." : "Analyze Deployment Issue"}
            </Button>
          </div>

          {result && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Gemini Analysis:</h3>
              <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap text-sm">
                {result}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 