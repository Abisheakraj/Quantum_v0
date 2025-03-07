"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Database, Plus, Upload } from "lucide-react"
import { Navbar } from "@/components/navbar"

// API integration points for backend developers
const API_ENDPOINTS = {
  GET_DATA_SOURCES: "/api/data-sources",
  UPDATE_DATA_SOURCE: (id: string) => `/api/data-sources/${id}`,
  DELETE_DATA_SOURCE: (id: string) => `/api/data-sources/${id}`,
  TEST_CONNECTION: "/api/data-sources/test-connection",
}

interface DataSource {
  id: string
  name: string
  type: string
  host: string
  port: string
  database: string
  username: string
  status: "active" | "warning" | "error"
}

export default function DataSourcesPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "PostgreSQL Database",
      type: "postgres",
      host: "db.example.com",
      port: "5432",
      database: "main",
      username: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "MySQL Database",
      type: "mysql",
      host: "mysql.example.com",
      port: "3306",
      database: "main",
      username: "admin",
      status: "active",
    },
    {
      id: "3",
      name: "MongoDB Database",
      type: "mongodb",
      host: "mongo.example.com",
      port: "27017",
      database: "main",
      username: "admin",
      status: "warning",
    },
    {
      id: "4",
      name: "Sales API",
      type: "api",
      host: "api.sales.com",
      port: "",
      database: "",
      username: "",
      status: "active",
    },
    {
      id: "5",
      name: "Marketing API",
      type: "api",
      host: "api.marketing.com",
      port: "",
      database: "",
      username: "",
      status: "error",
    },
    {
      id: "6",
      name: "Sales Data.csv",
      type: "file",
      host: "",
      port: "",
      database: "",
      username: "",
      status: "active",
    },
    {
      id: "7",
      name: "Customer Data.xlsx",
      type: "file",
      host: "",
      port: "",
      database: "",
      username: "",
      status: "active",
    },
    {
      id: "8",
      name: "Product Data.json",
      type: "file",
      host: "",
      port: "",
      database: "",
      username: "",
      status: "active",
    },
  ])

  const [editingSource, setEditingSource] = useState<DataSource | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false)
  const [isUploadFileOpen, setIsUploadFileOpen] = useState(false)
  const [sourceType, setSourceType] = useState<string>("database")
  const [databaseType, setDatabaseType] = useState<string>("postgres")
  const [host, setHost] = useState<string>("")
  const [port, setPort] = useState<string>("")
  const [database, setDatabase] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [apiUrl, setApiUrl] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")

  const handleAddSource = () => {
    // In a real app, you would save the data source to a database
    alert("Data source added successfully!")
    setIsAddSourceOpen(false)
  }

  const handleUploadFile = () => {
    // In a real app, you would process the uploaded file
    alert("File uploaded successfully!")
    setIsUploadFileOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)

    // Read file content for preview
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFileContent(content.slice(0, 1000) + (content.length > 1000 ? "..." : ""))
    }
    reader.readAsText(file)
  }

  const handleEdit = (source: DataSource) => {
    setEditingSource(source)
    setIsEditDialogOpen(true)
  }

  const handleSave = async (source: DataSource) => {
    try {
      // Backend integration point: Update data source
      const response = await fetch(API_ENDPOINTS.UPDATE_DATA_SOURCE(source.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(source),
      })

      if (!response.ok) {
        throw new Error("Failed to update data source")
      }

      // Update local state
      setDataSources((prev) => prev.map((s) => (s.id === source.id ? source : s)))

      setIsEditDialogOpen(false)
      setEditingSource(null)
    } catch (error) {
      console.error("Failed to update data source:", error)
      // Show error message to user
    }
  }

  const handleTestConnection = async (source: DataSource) => {
    try {
      // Backend integration point: Test connection
      const response = await fetch(API_ENDPOINTS.TEST_CONNECTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(source),
      })

      if (!response.ok) {
        throw new Error("Connection test failed")
      }

      // Show success message
    } catch (error) {
      console.error("Connection test failed:", error)
      // Show error message
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Data Sources</h1>
            <div className="flex gap-2">
              <Dialog open={isAddSourceOpen} onOpenChange={setIsAddSourceOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Data Source
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Data Source</DialogTitle>
                    <DialogDescription>Connect to a database, API, or other data source.</DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="database" value={sourceType} onValueChange={setSourceType}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="database">Database</TabsTrigger>
                      <TabsTrigger value="api">API</TabsTrigger>
                      <TabsTrigger value="file">File</TabsTrigger>
                    </TabsList>

                    <TabsContent value="database" className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="database-type">Database Type</Label>
                        <Select value={databaseType} onValueChange={setDatabaseType}>
                          <SelectTrigger id="database-type">
                            <SelectValue placeholder="Select database type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="postgres">PostgreSQL</SelectItem>
                            <SelectItem value="mysql">MySQL</SelectItem>
                            <SelectItem value="mongodb">MongoDB</SelectItem>
                            <SelectItem value="oracle">Oracle</SelectItem>
                            <SelectItem value="sqlserver">SQL Server</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="host">Host</Label>
                          <Input
                            id="host"
                            placeholder="localhost"
                            value={host}
                            onChange={(e) => setHost(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="port">Port</Label>
                          <Input id="port" placeholder="5432" value={port} onChange={(e) => setPort(e.target.value)} />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="database">Database</Label>
                        <Input
                          id="database"
                          placeholder="my_database"
                          value={database}
                          onChange={(e) => setDatabase(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            placeholder="postgres"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="api" className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label htmlFor="api-url">API URL</Label>
                        <Input
                          id="api-url"
                          placeholder="https://api.example.com/data"
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="api-key">API Key (Optional)</Label>
                        <Input
                          id="api-key"
                          placeholder="your-api-key"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="file" className="space-y-4 mt-4">
                      <div className="grid gap-2">
                        <Label>File Upload</Label>
                        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                          <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Drag and drop your files here, or click to browse
                          </p>
                          <Button className="mt-4" onClick={() => setIsUploadFileOpen(true)}>
                            Select Files
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button onClick={handleAddSource}>Add Source</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isUploadFileOpen} onOpenChange={setIsUploadFileOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>Upload a CSV, Excel, or JSON file as a data source.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="file-upload">Select File</Label>
                      <Input id="file-upload" type="file" accept=".csv,.xlsx,.json" onChange={handleFileChange} />
                    </div>
                    {selectedFile && (
                      <div className="grid gap-2">
                        <Label>File Preview</Label>
                        <div className="bg-muted p-2 rounded-md text-xs overflow-auto max-h-40">
                          <pre>{fileContent}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUploadFile} disabled={!selectedFile}>
                      Upload
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Data Source</DialogTitle>
                <DialogDescription>Update your data source connection details.</DialogDescription>
              </DialogHeader>

              {editingSource && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSave(editingSource)
                  }}
                >
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editingSource.name}
                        onChange={(e) =>
                          setEditingSource({
                            ...editingSource,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="host">Host</Label>
                      <Input
                        id="host"
                        value={editingSource.host}
                        onChange={(e) =>
                          setEditingSource({
                            ...editingSource,
                            host: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="port">Port</Label>
                        <Input
                          id="port"
                          value={editingSource.port}
                          onChange={(e) =>
                            setEditingSource({
                              ...editingSource,
                              port: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="database">Database</Label>
                        <Input
                          id="database"
                          value={editingSource.database}
                          onChange={(e) =>
                            setEditingSource({
                              ...editingSource,
                              database: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={editingSource.username}
                        onChange={(e) =>
                          setEditingSource({
                            ...editingSource,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <Button type="button" variant="outline" onClick={() => handleTestConnection(editingSource)}>
                      Test Connection
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Data Sources Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dataSources.map((source) => (
              <Card key={source.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{source.name}</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Connected to {source.host}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div
                      className={`text-xs px-2 py-1 rounded-full
                      ${source.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
                      ${source.status === "warning" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : ""}
                      ${source.status === "error" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" : ""}
                    `}
                    >
                      {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(source)}>
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

