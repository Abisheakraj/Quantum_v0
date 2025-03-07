import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="container mx-auto py-12 px-4 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Ready to Transform Your Data Journey?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Join thousands of data teams who are already using Quantum to streamline their data pipelines and unlock
          insights.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="lg" variant="outline">
              Request a Demo
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
      </div>
    </section>
  )
}

