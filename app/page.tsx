import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, FileText, Heart, Shield, Users, Bookmark, Calendar } from "lucide-react"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />

        {/* Features Section */}
        <section className="py-12 md:py-24 bg-sage-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">
                  Plan Ahead with Confidence
                </h2>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive platform helps you organize every aspect of your end-of-life planning, giving you
                  and your loved ones peace of mind.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 md:gap-12 mt-12 md:grid-cols-2 lg:grid-cols-3 items-start">
              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Digital Wills & Estate Planning</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">
                    Create and store your will and estate plans securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Guided will creation templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Asset distribution planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Legal document storage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Medical Directives</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">
                    Document your healthcare wishes and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Advance care planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Healthcare proxy designation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Medical preferences record</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Secure Document Storage</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">
                    Keep all important documents in one protected place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>End-to-end encryption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Controlled access sharing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Document organization system</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Bookmark className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Asset Inventory</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">Catalog and manage your financial records</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Property and possession tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Financial account management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Digital asset documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Memorial Preferences</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">Design your perfect memorial service</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Funeral arrangement planning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Personal message creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Legacy wishes documentation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-6 w-6 text-sage-600" />
                    <CardTitle className="text-xl text-sage-900">Reminders & Notifications</CardTitle>
                  </div>
                  <CardDescription className="text-sage-600">
                    Stay on top of important updates and reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sage-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Document review reminders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Important date alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                      <span>Customizable notification settings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">How Final Works</h2>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our simple process helps you create a comprehensive end-of-life plan in just a few steps.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger
                    value="create"
                    className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
                  >
                    Create
                  </TabsTrigger>
                  <TabsTrigger
                    value="store"
                    className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
                  >
                    Store
                  </TabsTrigger>
                  <TabsTrigger
                    value="share"
                    className="text-sage-700 data-[state=active]:text-sage-900 data-[state=active]:bg-sage-100"
                  >
                    Share
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="p-6 bg-sage-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-sage-900">Create Your Plan</h3>
                      <p className="text-sage-700 mb-6">
                        Use our guided templates to document your wishes, preferences, and important information. Our
                        step-by-step process makes it easy to create a comprehensive plan.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Answer simple questions about your preferences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Fill out only what matters to you</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Update anytime as your wishes change</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Create your plan"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="store" className="p-6 bg-sage-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-sage-900">Store Securely</h3>
                      <p className="text-sage-700 mb-6">
                        All your important documents and information are stored with bank-level security and encryption,
                        ensuring your sensitive data remains protected.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">End-to-end encryption for all documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Two-factor authentication protection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Regular backups and data redundancy</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Store securely"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="share" className="p-6 bg-sage-50 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-sage-900">Share With Loved Ones</h3>
                      <p className="text-sage-700 mb-6">
                        Control exactly who has access to your information and when. Share specific documents with
                        family members, executors, or legal representatives.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Granular permission controls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Time-based access options</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-sage-500 shrink-0 mt-0.5" />
                          <span className="text-sage-700">Emergency access protocols</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Share with loved ones"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-24 bg-sage-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Why Choose Final</h2>
                <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Planning ahead provides peace of mind for you and your loved ones.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Reduce Family Stress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    By planning ahead, you spare your loved ones from making difficult decisions during an emotional
                    time, reducing conflict and uncertainty.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Ensure Your Wishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    Document exactly how you want to be remembered and what should happen with your belongings, ensuring
                    your wishes are respected.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Simplify the Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    Provide your loved ones with a clear roadmap of what needs to be done, saving them time and
                    confusion during a difficult period.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Protect Digital Legacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    Manage your digital assets and online accounts, ensuring your digital presence is handled according
                    to your preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Financial Clarity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    Organize your financial information in one place, making it easier for your executor to manage your
                    estate efficiently.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-sage-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sage-900">Peace of Mind</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sage-700">
                    Rest easy knowing that you've taken care of the important details and your loved ones will be
                    prepared when the time comes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-sage-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Start Planning Today</h2>
                <p className="max-w-[900px] text-sage-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Give yourself and your loved ones the gift of peace of mind.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="bg-white text-sage-700 hover:bg-sage-100" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-sage-600" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
