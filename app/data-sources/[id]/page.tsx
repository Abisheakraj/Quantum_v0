"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { DatabaseTableEditor } from "@/components/database-table-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface Table {
  id: number
  name: string
  columns: any[]
}

export default function DataSourcePage() {
  const params = useParams()
  const [tables, setTables] = useState<Table[]>([])
  const [isAddTableOpen, setIsAddTableOpen] = useState(false)
  const [newTableName, setNewTableName] = useState("")
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  useEffect(() => {
    // Fetch tables for this data source
    // This would be replaced with your actual API endpoint
    const fetchTables = async () => {
      try {
        const response = await fetch(`/api/data-sources/${params.id}/tables`)
        if (response.ok) {
          const data = await response.json()
          setTables(data)
          if (data.length > 0) {
            setSelectedTable(data[0])
          }
        }
      } catch (error) {
        console.error("Error fetching tables:", error)
      }
    }

    fetchTables()
  }, [params.id])

  const handleAddTable = async () => {
    try {
      // This would be replaced with your actual API endpoint
      const response = await fetch(`/api/data-sources/${params.id}/tables`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTableName }),
      })

      if (response.ok) {
        const table = await response.json()
        setTables([...tables, table])
        setIsAddTableOpen(false)
        setNewTableName("")
        setSelectedTable(table)
      }
    } catch (error) {
      console.error("Error adding table:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Database Tables</h1>
            <Dialog open={isAddTableOpen} onOpenChange={setIsAddTableOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Table
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Table</DialogTitle>
                  <DialogDescription>Create a new table in your database.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="table-name">Table Name</Label>
                    <Input
                      id="table-name"
                      value={newTableName}
                      onChange={(e) => setNewTableName(e.target.value)}
                      placeholder="e.g., customers"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddTable}>Add Table</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Left sidebar - Table list */}
            <div className="space-y-4">
              <div className="font-medium text-sm text-muted-foreground mb-2">Tables</div>
              <div className="space-y-1">
                {tables.map((table) => (
                  <Button
                    key={table.id}
                    variant={selectedTable?.id === table.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedTable(table)}
                  >
                    {table.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right side - Table editor */}
            <div className="col-span-3">
              {selectedTable ? (
                <DatabaseTableEditor
                  tableId={selectedTable.id}
                  tableName={selectedTable.name}
                  initialColumns={selectedTable.columns}
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">Select a table to view and edit its columns</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

