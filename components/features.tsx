import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Database,
  FileText,
  GitBranch,
  Globe,
  LineChart,
  RefreshCw,
  Server,
  Settings,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

export function Features() {
  return (
    <section className="container mx-auto py-12 px-4 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features for Data Teams</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Quantum provides a comprehensive suite of tools to help you manage your data pipeline from start to finish.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Clean, enrich, and prepare your data for analysis with our intuitive transformation tools and SQL editor.
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
              Implement data quality checks, access controls, and audit trails to ensure compliance with regulations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Server className="h-6 w-6 mb-2 text-primary" />
            <CardTitle>Data Warehousing</CardTitle>
            <CardDescription>Store and manage your data in a centralized warehouse.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create a single source of truth for your organization's data with our data warehousing solutions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Globe className="h-6 w-6 mb-2 text-primary" />
            <CardTitle>Data Sharing</CardTitle>
            <CardDescription>Share data securely with internal and external stakeholders.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create data sharing workflows that maintain security and compliance while enabling collaboration.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Settings className="h-6 w-6 mb-2 text-primary" />
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Customize your data pipeline with advanced settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Fine-tune your data pipeline with advanced settings and configurations to meet your specific needs.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Link href="/features">
          <Button variant="outline" className="gap-2">
            View all features <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

