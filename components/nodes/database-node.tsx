import { Handle, Position } from "reactflow"
import { Database } from "lucide-react"

export function DatabaseNode({ data }: { data: any }) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2 mb-2">
        <Database className="h-5 w-5 text-blue-500" />
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="grid grid-cols-2 gap-1">
          <span className="font-medium">Type:</span>
          <span>{data.type || "Unknown"}</span>

          {data.details && (
            <>
              <span className="font-medium">Host:</span>
              <span>{data.details.host || "N/A"}</span>

              <span className="font-medium">Port:</span>
              <span>{data.details.port || "N/A"}</span>

              <span className="font-medium">Database:</span>
              <span>{data.details.database || "N/A"}</span>
            </>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

