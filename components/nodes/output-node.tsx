import { Handle, Position } from "reactflow"
import { ArrowRight } from "lucide-react"

export function OutputNode({ data }: { data: any }) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2 mb-2">
        <ArrowRight className="h-5 w-5 text-purple-500" />
        <div className="font-medium">{data.label}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        <div className="grid grid-cols-2 gap-1">
          <span className="font-medium">Type:</span>
          <span>{data.type || "Unknown"}</span>

          {data.details && (
            <>
              <span className="font-medium">Account:</span>
              <span>{data.details.account || "N/A"}</span>

              <span className="font-medium">Database:</span>
              <span>{data.details.database || "N/A"}</span>

              <span className="font-medium">Schema:</span>
              <span>{data.details.schema || "N/A"}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

