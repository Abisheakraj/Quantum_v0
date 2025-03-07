import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="container mx-auto py-12 px-4 md:py-24 bg-muted/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about Quantum and our ETL solutions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Quantum?</AccordionTrigger>
            <AccordionContent>
              Quantum is a powerful ETL (Extract, Transform, Load) platform that helps businesses manage their data
              pipelines. It provides tools for data integration, transformation, and analysis, making it easier to
              extract insights from your data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How does the 14-day free trial work?</AccordionTrigger>
            <AccordionContent>
              Our 14-day free trial gives you full access to all features of the platform. You don't need to provide a
              credit card to start the trial, and you can cancel at any time. At the end of the trial, you can choose to
              upgrade to a paid plan or your account will be automatically downgraded to a limited free version.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What data sources can I connect to?</AccordionTrigger>
            <AccordionContent>
              Quantum supports a wide range of data sources, including databases (MySQL, PostgreSQL, SQL Server,
              Oracle), cloud storage (S3, Google Cloud Storage, Azure Blob Storage), APIs, and file formats (CSV, JSON,
              Excel). We're constantly adding new connectors based on customer feedback.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, data security is our top priority. We use industry-standard encryption for data in transit and at
              rest. Our platform is SOC 2 Type II compliant, and we offer features like role-based access control and
              audit logs to help you maintain compliance with regulations like GDPR and CCPA.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Can I schedule automated data pipelines?</AccordionTrigger>
            <AccordionContent>
              Yes, Quantum allows you to schedule your data pipelines to run automatically at specified intervals. You
              can set up hourly, daily, weekly, or custom schedules. You can also trigger pipelines based on events or
              run them on-demand.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Do you offer custom solutions?</AccordionTrigger>
            <AccordionContent>
              Yes, our Enterprise plan includes custom solutions tailored to your specific needs. Our team will work
              with you to understand your requirements and develop a solution that meets your unique data challenges.
              Contact our sales team to learn more.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

