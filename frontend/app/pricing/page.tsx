import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
                Simple, Transparent Pricing
              </h1>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that's right for you and your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <Card className="border-sage-200 shadow-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl text-sage-900">Basic</CardTitle>
                <div className="mt-4 flex items-baseline text-sage-900">
                  <span className="text-4xl font-bold tracking-tight">$5</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <CardDescription className="mt-4 text-sage-600">Essential planning for individuals</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Basic will creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Medical directives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">1GB document storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Share with 2 trusted contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Plus Plan */}
            <Card className="border-sage-600 shadow-lg relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 bg-sage-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                Most Popular
              </div>
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl text-sage-900">Plus</CardTitle>
                <div className="mt-4 flex items-baseline text-sage-900">
                  <span className="text-4xl font-bold tracking-tight">$10</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <CardDescription className="mt-4 text-sage-600">Comprehensive planning for individuals</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Advanced will creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Medical directives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">5GB document storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Share with 5 trusted contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Asset inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Memorial preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Priority email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>

            {/* Family Plan */}
            <Card className="border-sage-200 shadow-sm">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl text-sage-900">Family</CardTitle>
                <div className="mt-4 flex items-baseline text-sage-900">
                  <span className="text-4xl font-bold tracking-tight">$20</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </div>
                <CardDescription className="mt-4 text-sage-600">Complete planning for families</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Everything in Plus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Up to 5 family members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">20GB shared document storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Share with 10 trusted contacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Family document sharing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Priority phone support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                    <span className="text-sage-700">Annual planning review</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white">Get Started</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-sage-900">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our pricing and plans.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">Can I switch plans later?</h3>
              <p className="text-sage-700">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to
                new features. When downgrading, changes will take effect at the end of your current billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">Is there a free trial?</h3>
              <p className="text-sage-700">
                Yes, we offer a 14-day free trial on all plans so you can explore the features and ensure Final is the
                right fit for your needs before committing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">What payment methods do you accept?</h3>
              <p className="text-sage-700">
                We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also
                support payment through PayPal.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">Is there an annual payment option?</h3>
              <p className="text-sage-700">
                Yes, we offer annual payment options for all plans with a 20% discount compared to monthly payments. You
                can select this option during checkout.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">What happens to my data if I cancel?</h3>
              <p className="text-sage-700">
                If you cancel your subscription, you'll have 30 days to download your data before it's removed from our
                systems. We provide export tools to help you save all your important information.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2 text-sage-900">
                Do you offer discounts for non-profits or seniors?
              </h3>
              <p className="text-sage-700">
                Yes, we offer special pricing for non-profit organizations and seniors aged 65+. Please contact our
                support team for more information about these discount programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-sage-700">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-sage-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Try Final free for 14 days. No credit card required.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-white text-sage-700 hover:bg-sage-100" size="lg">
                Start Free Trial
              </Button>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-sage-600" size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
