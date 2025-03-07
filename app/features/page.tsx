import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Database,
  FileText,
  GitBranch,
  Globe,
  LineChart,
  RefreshCw,
  Server,
  Settings,
  Shield,
  Zap,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Powerful Features for Data Teams
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover all the tools and capabilities that make Quantum the leading ETL solution.
            </p>
          </div>

          <Tabs defaultValue="data-integration" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data-integration">Data Integration</TabsTrigger>
              <TabsTrigger value="transformation">Transformation</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="data-integration" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Integration</CardTitle>
                  <CardDescription>Connect to any data source with our pre-built connectors.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <Database className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Database Connectors</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to MySQL, PostgreSQL, SQL Server, Oracle, and more.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Globe className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">API Connectors</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to REST APIs, GraphQL, and SOAP services.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <FileText className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">File Connectors</h3>
                        <p className="text-sm text-muted-foreground">
                          Import data from CSV, JSON, Excel, XML, and more.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Server className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Cloud Storage</h3>
                        <p className="text-sm text-muted-foreground">
                          Connect to S3, Google Cloud Storage, Azure Blob Storage.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transformation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Transformation</CardTitle>
                  <CardDescription>Transform your data with powerful tools and workflows.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <Settings className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">SQL Editor</h3>
                        <p className="text-sm text-muted-foreground">
                          Write custom SQL queries to transform your data.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <RefreshCw className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Visual Transformer</h3>
                        <p className="text-sm text-muted-foreground">Transform data with a no-code visual interface.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <GitBranch className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Data Mapping</h3>
                        <p className="text-sm text-muted-foreground">
                          Map fields between different data sources and formats.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Shield className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Data Validation</h3>
                        <p className="text-sm text-muted-foreground">Validate data quality with customizable rules.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Analytics</CardTitle>
                  <CardDescription>Analyze your data to uncover insights and patterns.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                      <LineChart className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Visualization</h3>
                        <p className="text-sm text-muted-foreground">
                          Create charts, graphs, and dashboards to visualize your data.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <BarChart3 className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Reporting</h3>
                        <p className="text-sm text-muted-foreground">
                          Generate automated reports and share them with your team.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Zap className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">AI-Powered Insights</h3>
                        <p className="text-sm text-muted-foreground">
                          Leverage AI to automatically discover patterns and anomalies.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Server className="h-6 w-6 text-primary shrink-0" />
                      <div>
                        <h3 className="font-semibold">Data Warehousing</h3>
                        <p className="text-sm text-muted-foreground">
                          Store and analyze large volumes of data efficiently.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <Card>
              <CardHeader>
                <Database className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Data Connectors</CardTitle>
                <CardDescription>Connect to any data source with our pre-built connectors.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Easily connect to databases, APIs, files, and more. Our platform supports all major data sources and
                  formats.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <RefreshCw className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Automated Workflows</CardTitle>
                <CardDescription>Create automated data workflows with our visual builder.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Design complex data pipelines without code. Schedule, monitor, and manage your workflows from a single
                  interface.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Data Transformation</CardTitle>
                <CardDescription>Transform your data with powerful tools and workflows.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Clean, enrich, and prepare your data for analysis with our intuitive transformation tools and SQL
                  editor.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <LineChart className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Data Visualization</CardTitle>
                <CardDescription>Create beautiful visualizations to understand your data.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Build dashboards and reports to visualize your data and share insights with your team.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GitBranch className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Version Control</CardTitle>
                <CardDescription>Track changes to your data pipelines with version control.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Keep track of changes to your data pipelines and roll back to previous versions when needed.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-6 w-6 mb-2 text-primary" />
                <CardTitle>Data Governance</CardTitle>
                <CardDescription>Ensure data quality and compliance with our governance tools.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Implement data quality checks, access controls, and audit trails to ensure compliance with
                  regulations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

