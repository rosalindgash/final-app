import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Shield } from "lucide-react"
import Image from "next/image"

export default function FeaturesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
                Comprehensive End-of-Life Planning
              </h1>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore all the features that make Final the most complete platform for planning ahead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="wills" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger
                value="wills"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Wills
              </TabsTrigger>
              <TabsTrigger
                value="medical"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Medical
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="assets"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Assets
              </TabsTrigger>
              <TabsTrigger
                value="memorial"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Memorial
              </TabsTrigger>
              <TabsTrigger
                value="sharing"
                className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
              >
                Sharing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wills" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Digital Wills & Estate Planning</h2>
                  <p className="text-sage-700 mb-6">
                    Create and store your will and estate plans securely. Our guided templates help you document your
                    wishes clearly and comprehensively.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Step-by-step will creation wizard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Asset distribution planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Guardian designation for dependents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Executor appointment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Special bequests and gifts</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Digital Wills & Estate Planning"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Medical Directives</h2>
                  <p className="text-sage-700 mb-6">
                    Document your healthcare wishes and preferences to ensure your medical care aligns with your values,
                    even if you're unable to communicate.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Living will creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Healthcare proxy designation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Treatment preferences documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Organ donation wishes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Medical history record</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Medical Directives"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Secure Document Storage</h2>
                  <p className="text-sage-700 mb-6">
                    Keep all important documents in one protected place with bank-level security and controlled access
                    sharing.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">End-to-end encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Two-factor authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Document organization system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Version history tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Secure document sharing</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Secure Document Storage"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Asset Inventory</h2>
                  <p className="text-sage-700 mb-6">
                    Catalog and manage your financial records, ensuring your loved ones have a complete picture of your
                    assets and accounts.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Property and possession tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Financial account management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Digital asset documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Insurance policy management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Debt and liability tracking</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Asset Inventory"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="memorial" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Memorial Preferences</h2>
                  <p className="text-sage-700 mb-6">
                    Design your perfect memorial service and document your wishes for how you'd like to be remembered.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Funeral arrangement planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Personal message creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Legacy wishes documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Obituary preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Memorial service details</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Memorial Preferences"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sharing" className="p-6 bg-sage-50 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-sage-900">Sharing & Access Control</h2>
                  <p className="text-sage-700 mb-6">
                    Control exactly who has access to your information and when, with granular permission settings and
                    emergency access protocols.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Trusted contact management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Document-level permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Time-based access controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Emergency access protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span className="text-sage-700">Access activity monitoring</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sharing & Access Control"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6 text-sage-900">
                Your Information is Safe with Us
              </h2>
              <p className="text-sage-700 mb-6">
                Security is our top priority. We use bank-level encryption and multiple layers of protection to ensure
                your sensitive information remains private and secure.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sage-900">End-to-End Encryption</h3>
                    <p className="text-sage-700">
                      All your data is encrypted in transit and at rest, ensuring only you and those you explicitly
                      authorize can access your information.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sage-900">Two-Factor Authentication</h3>
                    <p className="text-sage-700">
                      Add an extra layer of security to your account with two-factor authentication, preventing
                      unauthorized access even if your password is compromised.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sage-900">Regular Security Audits</h3>
                    <p className="text-sage-700">
                      Our systems undergo regular security audits and penetration testing to identify and address
                      potential vulnerabilities.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Security Features"
                width={500}
                height={400}
                className="rounded-lg shadow-md"
              />
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
                Join thousands of others who have found peace of mind with Final.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-white text-sage-700 hover:bg-sage-100" size="lg">
                Create Your Plan
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-sage-600" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
