"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Database } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DashboardPage() {
  const router = useRouter()
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")

  const handleCreateProject = () => {
    // In a real app, you would save the project to a database
    router.push("/workspace")
    setIsCreateProjectOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Projects</h1>
            <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>Create a new ETL project to start transforming your data.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="My ETL Project"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project-description">Description (Optional)</Label>
                    <Input
                      id="project-description"
                      placeholder="A brief description of your project"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/workspace")}
            >
              <CardHeader>
                <CardTitle>Sales Data Pipeline</CardTitle>
                <CardDescription>Created 2 days ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  ETL pipeline for processing sales data from multiple sources.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Database className="h-4 w-4 mr-1" />
                  <span>3 data sources</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push("/workspace")}
            >
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Created 1 week ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Data transformation for customer behavior analysis.
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Database className="h-4 w-4 mr-1" />
                  <span>2 data sources</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-dashed cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setIsCreateProjectOpen(true)}
            >
              <CardHeader className="flex items-center justify-center h-full py-8">
                <div className="text-center">
                  <div className="mx-auto bg-muted rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-muted-foreground">Create New Project</CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <p className="font-medium">Data sync completed</p>
                  <p className="text-sm text-muted-foreground">Sales data pipeline completed successfully</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="font-medium">New data source added</p>
                  <p className="text-sm text-muted-foreground">You connected to PostgreSQL database</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 4:30 PM</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                <div>
                  <p className="font-medium">Workflow warning</p>
                  <p className="text-sm text-muted-foreground">Customer data transformation has high latency</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

