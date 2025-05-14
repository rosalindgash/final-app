import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="py-12 md:py-24 bg-sage-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about Final.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                Is my information secure on Final?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                Yes, security is our top priority. We use bank-level encryption to protect all your data. Your
                information is encrypted end-to-end, meaning only you and those you explicitly grant access can view
                your documents. We also offer two-factor authentication for additional security.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                Do I need legal knowledge to use Final?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                No legal expertise is required. Our platform is designed to be user-friendly and guides you through each
                step with clear instructions and templates. However, for complex legal matters, we always recommend
                consulting with a legal professional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                How do I share my plan with loved ones?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                Final makes sharing simple and secure. You can invite trusted contacts via email and set specific
                permissions for what they can access. You can choose to grant immediate access or set up emergency
                access that only becomes available under certain conditions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                Can I update my plan after creating it?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                Life changes, and so can your plans. You can update your information, documents, and preferences at any
                time. We also send regular reminders to review your plan to ensure it stays current with your wishes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                What happens to my account if something happens to me?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                Final includes an inactivity protocol that can be customized to your preferences. If you don't log in
                for a specified period, the system can automatically notify your designated contacts and provide them
                with the access you've pre-approved.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-sage-200">
              <AccordionTrigger className="text-sage-900 hover:text-sage-700">
                Is Final a substitute for a legal will?
              </AccordionTrigger>
              <AccordionContent className="text-sage-700">
                While Final helps you organize your wishes and important information, it's not a substitute for legally
                binding documents. We provide templates and guidance, but recommend working with a legal professional to
                ensure your will and other legal documents meet all requirements in your jurisdiction.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
