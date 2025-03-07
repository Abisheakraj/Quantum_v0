import { Handle, Position } from "reactflow"
import { Settings } from "lucide-react"

export function TransformNode({ data }: { data: any }) {
  return (
    <div className="p-4 border rounded-md bg-white shadow-sm min-w-[200px]">
      <Handle type="target" position={Position.Left} />
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5 text-orange-500" />
        <div className="font-medium">{data.label}</div>
      </div>
      {data.query && (
        <div className="text-xs border-t pt-2 mt-2">
          <div className="font-medium mb-1">Query:</div>
          <div className="bg-muted p-2 rounded-sm max-h-32 overflow-y-auto">
            <code>{data.query}</code>
          </div>
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  )
}

