import { Handle, Position } from "reactflow"
import { Table } from "lucide-react"

export function TableNode({ data }: { data: any }) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2 mb-2">
        <Table className="h-5 w-5 text-green-500" />
        <div className="font-medium">{data.label}</div>
      </div>
      {data.columns && data.columns.length > 0 && (
        <div className="text-xs border-t pt-2 mt-2">
          <div className="font-medium mb-1">Columns:</div>
          <div className="max-h-32 overflow-y-auto">
            {data.columns.map((column: any, index: number) => (
              <div key={index} className="flex items-center gap-1">
                <span>{column.name}</span>
                <span className="text-muted-foreground">({column.type})</span>
                {column.primary && <span className="text-xs text-blue-500">PK</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

