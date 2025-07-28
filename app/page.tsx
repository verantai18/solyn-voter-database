import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Solyn Democratic Party Tools
          </h1>
          <p className="text-xl text-gray-600">
            Access voter data and campaign management tools
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-900">
                Voter Database
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access and manage voter information, search records, and analyze voting patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/the-van">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Open Voter Database
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-green-900">
                CAPES
              </CardTitle>
              <CardDescription className="text-gray-600">
                Campaign management and planning tools for election strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/minivan">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Open CAPES
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
