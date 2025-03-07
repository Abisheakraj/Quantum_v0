"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  Panel,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Database, Table, Save, Play, ArrowRight, Settings, Trash2 } from "lucide-react"
import { DatabaseNode } from "@/components/nodes/database-node"
import { TableNode } from "@/components/nodes/table-node"
import { TransformNode } from "@/components/nodes/transform-node"
import { OutputNode } from "@/components/nodes/output-node"

const nodeTypes: NodeTypes = {
  database: DatabaseNode,
  table: TableNode,
  transform: TransformNode,
  output: OutputNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "database",
    position: { x: 100, y: 100 },
    data: {
      label: "PostgreSQL Database",
      type: "postgres",
      details: {
        host: "localhost",
        port: "5432",
        database: "sales",
        user: "postgres",
      },
    },
  },
  {
    id: "2",
    type: "table",
    position: { x: 400, y: 100 },
    data: {
      label: "Customers Table",
      columns: [
        { name: "id", type: "integer", primary: true },
        { name: "name", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "created_at", type: "timestamp" },
      ],
    },
  },
  {
    id: "3",
    type: "transform",
    position: { x: 700, y: 100 },
    data: {
      label: "Data Transformation",
      query: "SELECT id, name, email, created_at FROM customers WHERE created_at > NOW() - INTERVAL '30 days'",
    },
  },
  {
    id: "4",
    type: "output",
    position: { x: 1000, y: 100 },
    data: {
      label: "Analytics Database",
      type: "snowflake",
      details: {
        account: "xy12345",
        warehouse: "compute_wh",
        database: "analytics",
        schema: "public",
      },
    },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-3", source: "2", target: "3", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3-4", source: "3", target: "4", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
]

export default function WorkspacePage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [isAddNodeOpen, setIsAddNodeOpen] = useState(false)
  const [isAddConnectionOpen, setIsAddConnectionOpen] = useState(false)
  const [isDataSourceOpen, setIsDataSourceOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodeType, setNodeType] = useState<string>("database")
  const [nodeName, setNodeName] = useState<string>("")
  const [sourceNode, setSourceNode] = useState<string>("")
  const [targetNode, setTargetNode] = useState<string>("")
  const [databaseType, setDatabaseType] = useState<string>("postgres")
  const [host, setHost] = useState<string>("")
  const [port, setPort] = useState<string>("")
  const [database, setDatabase] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [sqlQuery, setSqlQuery] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSaved, setIsSaved] = useState(true)

  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds,
        ),
      )
      setIsSaved(false)
    },
    [setEdges],
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const handleAddNode = () => {
    if (!nodeName) return

    let newNodeData = { label: nodeName }

    if (nodeType === "database") {
      newNodeData = {
        ...newNodeData,
        type: databaseType,
        details: {
          host,
          port,
          database,
          user: username,
        },
      }
    } else if (nodeType === "transform") {
      newNodeData = {
        ...newNodeData,
        query: sqlQuery,
      }
    }

    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
      data: newNodeData,
    }

    setNodes((nds) => nds.concat(newNode))
    setIsAddNodeOpen(false)
    setNodeName("")
    setSqlQuery("")
    setIsSaved(false)
  }

  const handleAddConnection = () => {
    if (!sourceNode || !targetNode) return

    const newEdge: Edge = {
      id: `e${sourceNode}-${targetNode}`,
      source: sourceNode,
      target: targetNode,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
    }

    setEdges((eds) => eds.concat(newEdge))
    setIsAddConnectionOpen(false)
    setSourceNode("")
    setTargetNode("")
    setIsSaved(false)
  }

  const handleDeleteNode = () => {
    if (!selectedNode) return

    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
    setSelectedNode(null)
    setIsSaved(false)
  }

  const handleSaveWorkflow = () => {
    // In a real app, you would save the workflow to a database
    setIsSaved(true)
    alert("Workflow saved successfully!")
  }

  const handleRunWorkflow = () => {
    setIsRunning(true)

    // Simulate workflow execution
    setTimeout(() => {
      setIsRunning(false)
      alert("Workflow executed successfully!")
    }, 2000)
  }

  const handleConnectDatabase = () => {
    // In a real app, you would test the database connection
    alert(`Successfully connected to ${databaseType} database at ${host}:${port}`)
    setIsDataSourceOpen(false)
  }

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData("application/reactflow/type")
      const name = event.dataTransfer.getData("application/reactflow/name")

      if (!type || !reactFlowInstance || !reactFlowWrapper.current) {
        return
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      let newNodeData = { label: name || `New ${type}` }

      if (type === "database") {
        newNodeData = {
          ...newNodeData,
          type: "postgres",
          details: {
            host: "",
            port: "",
            database: "",
            user: "",
          },
        }
      } else if (type === "transform") {
        newNodeData = {
          ...newNodeData,
          query: "",
        }
      }

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: newNodeData,
      }

      setNodes((nds) => nds.concat(newNode))
      setIsSaved(false)
    },
    [reactFlowInstance, nodes.length, setNodes],
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex">
        <div className="w-64 border-r bg-background p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-foreground">Components</h2>
          <div className="space-y-2">
            <div
              className="flex items-center gap-2 p-2 border rounded-md cursor-move bg-card hover:bg-accent text-card-foreground"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/reactflow/type", "database")
                event.dataTransfer.setData("application/reactflow/name", "Database Source")
                event.dataTransfer.effectAllowed = "move"
              }}
            >
              <Database className="h-4 w-4" />
              <span>Database Source</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 border rounded-md cursor-move bg-card hover:bg-accent text-card-foreground"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/reactflow/type", "table")
                event.dataTransfer.setData("application/reactflow/name", "Data Table")
                event.dataTransfer.effectAllowed = "move"
              }}
            >
              <Table className="h-4 w-4" />
              <span>Data Table</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 border rounded-md cursor-move bg-card hover:bg-accent text-card-foreground"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/reactflow/type", "transform")
                event.dataTransfer.setData("application/reactflow/name", "Transformation")
                event.dataTransfer.effectAllowed = "move"
              }}
            >
              <Settings className="h-4 w-4" />
              <span>Transformation</span>
            </div>
            <div
              className="flex items-center gap-2 p-2 border rounded-md cursor-move bg-card hover:bg-accent text-card-foreground"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("application/reactflow/type", "output")
                event.dataTransfer.setData("application/reactflow/name", "Output Destination")
                event.dataTransfer.effectAllowed = "move"
              }}
            >
              <ArrowRight className="h-4 w-4" />
              <span>Output Destination</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-semibold mb-4 text-foreground">Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsAddNodeOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Node
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsAddConnectionOpen(true)}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Add Connection
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setIsDataSourceOpen(true)}>
                <Database className="mr-2 h-4 w-4" />
                Connect Database
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleSaveWorkflow}
                disabled={isSaved}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Workflow
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleRunWorkflow}
                disabled={isRunning}
              >
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run Workflow"}
              </Button>
            </div>
          </div>

          {selectedNode && (
            <div className="mt-8 border-t pt-4">
              <h2 className="font-semibold mb-4 text-foreground">Selected Node</h2>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">ID:</span> {selectedNode.id}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {selectedNode.type}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Label:</span> {selectedNode.data.label}
                </p>
                <Button variant="destructive" size="sm" className="w-full mt-2" onClick={handleDeleteNode}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Node
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onNodeClick={onNodeClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
            <Panel position="top-right">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSaveWorkflow} disabled={isSaved}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleRunWorkflow} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </main>

      {/* Add Node Dialog */}
      <Dialog open={isAddNodeOpen} onOpenChange={setIsAddNodeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Node</DialogTitle>
            <DialogDescription>Create a new node in your workflow.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="node-type">Node Type</Label>
              <Select value={nodeType} onValueChange={setNodeType}>
                <SelectTrigger id="node-type">
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="database">Database Source</SelectItem>
                  <SelectItem value="table">Data Table</SelectItem>
                  <SelectItem value="transform">Transformation</SelectItem>
                  <SelectItem value="output">Output Destination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="node-name">Node Name</Label>
              <Input
                id="node-name"
                placeholder="Enter node name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>

            {nodeType === "database" && (
              <>
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
                    <Input id="host" placeholder="localhost" value={host} onChange={(e) => setHost(e.target.value)} />
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
              </>
            )}

            {nodeType === "transform" && (
              <div className="grid gap-2">
                <Label htmlFor="sql-query">SQL Query</Label>
                <Textarea
                  id="sql-query"
                  placeholder="SELECT * FROM table"
                  className="h-32"
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleAddNode}>Add Node</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Connection Dialog */}
      <Dialog open={isAddConnectionOpen} onOpenChange={setIsAddConnectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Connection</DialogTitle>
            <DialogDescription>Create a connection between two nodes.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="source-node">Source Node</Label>
              <Select value={sourceNode} onValueChange={setSourceNode}>
                <SelectTrigger id="source-node">
                  <SelectValue placeholder="Select source node" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.data.label} (ID: {node.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target-node">Target Node</Label>
              <Select value={targetNode} onValueChange={setTargetNode}>
                <SelectTrigger id="target-node">
                  <SelectValue placeholder="Select target node" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.data.label} (ID: {node.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddConnection}>Add Connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Connect Database Dialog */}
      <Dialog open={isDataSourceOpen} onOpenChange={setIsDataSourceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to Database</DialogTitle>
            <DialogDescription>Enter your database connection details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="connect-database-type">Database Type</Label>
              <Select value={databaseType} onValueChange={setDatabaseType}>
                <SelectTrigger id="connect-database-type">
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
                <Label htmlFor="connect-host">Host</Label>
                <Input
                  id="connect-host"
                  placeholder="localhost"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="connect-port">Port</Label>
                <Input id="connect-port" placeholder="5432" value={port} onChange={(e) => setPort(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="connect-database">Database</Label>
              <Input
                id="connect-database"
                placeholder="my_database"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="connect-username">Username</Label>
                <Input
                  id="connect-username"
                  placeholder="postgres"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="connect-password">Password</Label>
                <Input
                  id="connect-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConnectDatabase}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

