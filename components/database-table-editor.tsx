"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Column {
  id: number
  name: string
  dataType: string
  isNullable: boolean
  isPrimaryKey: boolean
}

interface DatabaseTableEditorProps {
  tableId: number
  tableName: string
  initialColumns?: Column[]
}

export function DatabaseTableEditor({ tableId, tableName, initialColumns = [] }: DatabaseTableEditorProps) {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)
  const [newColumn, setNewColumn] = useState<Partial<Column>>({
    name: "",
    dataType: "varchar",
    isNullable: true,
    isPrimaryKey: false,
  })

  const handleAddColumn = async () => {
    try {
      // This would be replaced with your actual API endpoint
      const response = await fetch(`/api/tables/${tableId}/columns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newColumn),
      })

      if (response.ok) {
        const column = await response.json()
        setColumns([...columns, column])
        setIsAddColumnOpen(false)
        setNewColumn({
          name: "",
          dataType: "varchar",
          isNullable: true,
          isPrimaryKey: false,
        })
      } else {
        throw new Error("Failed to add column")
      }
    } catch (error) {
      console.error("Error adding column:", error)
      // Handle error (show error message to user)
    }
  }

  const handleDeleteColumn = async (columnId: number) => {
    if (!confirm("Are you sure you want to delete this column?")) return

    try {
      // This would be replaced with your actual API endpoint
      const response = await fetch(`/api/tables/${tableId}/columns/${columnId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setColumns(columns.filter((col) => col.id !== columnId))
      } else {
        throw new Error("Failed to delete column")
      }
    } catch (error) {
      console.error("Error deleting column:", error)
      // Handle error (show error message to user)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{tableName}</h3>
          <p className="text-sm text-muted-foreground">Manage columns and their properties</p>
        </div>
        <Dialog open={isAddColumnOpen} onOpenChange={setIsAddColumnOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Column
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Column</DialogTitle>
              <DialogDescription>
                Add a new column to the table. Choose the data type and constraints.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="column-name">Column Name</Label>
                <Input
                  id="column-name"
                  value={newColumn.name}
                  onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
                  placeholder="e.g., first_name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="data-type">Data Type</Label>
                <Select
                  value={newColumn.dataType}
                  onValueChange={(value) => setNewColumn({ ...newColumn, dataType: value })}
                >
                  <SelectTrigger id="data-type">
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="varchar">VARCHAR</SelectItem>
                    <SelectItem value="integer">INTEGER</SelectItem>
                    <SelectItem value="boolean">BOOLEAN</SelectItem>
                    <SelectItem value="timestamp">TIMESTAMP</SelectItem>
                    <SelectItem value="numeric">NUMERIC</SelectItem>
                    <SelectItem value="jsonb">JSONB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="nullable"
                    checked={newColumn.isNullable}
                    onCheckedChange={(checked) =>
                      setNewColumn({
                        ...newColumn,
                        isNullable: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="nullable">Nullable</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="primary-key"
                    checked={newColumn.isPrimaryKey}
                    onCheckedChange={(checked) =>
                      setNewColumn({
                        ...newColumn,
                        isPrimaryKey: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="primary-key">Primary Key</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddColumn}>Add Column</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Nullable</TableHead>
              <TableHead>Primary Key</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {columns.map((column) => (
              <TableRow key={column.id}>
                <TableCell>{column.name}</TableCell>
                <TableCell className="uppercase">{column.dataType}</TableCell>
                <TableCell>
                  {column.isNullable ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </TableCell>
                <TableCell>
                  {column.isPrimaryKey ? <span className="text-blue-600">Yes</span> : <span>No</span>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        // Implement edit functionality
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteColumn(column.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

