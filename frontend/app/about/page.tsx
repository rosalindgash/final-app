import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900 mb-6">
                Our Mission: Peace of Mind for Everyone
              </h1>
              <p className="text-sage-700 text-lg mb-6">
                At Final, we believe that end-of-life planning shouldn't be stressful or overwhelming. Our mission is to
                provide a compassionate, comprehensive platform that makes it easy for everyone to plan ahead and
                protect their loved ones.
              </p>
              <Button className="bg-sage-600 hover:bg-sage-700 text-white">Learn More About Our Story</Button>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Our Mission"
                width={500}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Our Story</h2>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                How Final came to be and why we're passionate about what we do.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Our Story"
                width={500}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-sage-700 mb-4">
                Final was born from personal experience. Our founder, after losing a loved one unexpectedly, experienced
                firsthand the challenges of navigating end-of-life arrangements without guidance.
              </p>
              <p className="text-sage-700 mb-4">
                The process was overwhelming: finding important documents, understanding their wishes, and making
                difficult decisions during a time of grief. This experience highlighted the need for a better way to
                plan ahead.
              </p>
              <p className="text-sage-700 mb-4">
                In 2020, Final was created with a simple goal: to help people organize their end-of-life plans in a
                thoughtful, comprehensive way that brings peace of mind to them and their loved ones.
              </p>
              <p className="text-sage-700">
                Today, we're proud to have helped thousands of individuals and families prepare for the future with
                confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Our Values</h2>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The principles that guide everything we do at Final.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z" />
                    <circle cx="12" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Compassion</h3>
                <p className="text-sage-700">
                  We approach end-of-life planning with empathy and understanding, recognizing the emotional nature of
                  these decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Security</h3>
                <p className="text-sage-700">
                  We protect your sensitive information with the highest standards of security and privacy, giving you
                  confidence in our platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Clarity</h3>
                <p className="text-sage-700">
                  We make complex topics simple and accessible, providing clear guidance throughout the planning
                  process.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m16.24 7.76-4.24 4.24-4.24-4.24" />
                    <path d="m16.24 16.24-4.24-4.24-4.24 4.24" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Thoroughness</h3>
                <p className="text-sage-700">
                  We believe in comprehensive planning that covers all aspects of end-of-life arrangements, leaving
                  nothing to chance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Respect</h3>
                <p className="text-sage-700">
                  We honor the personal nature of end-of-life decisions and respect each individual's unique wishes and
                  values.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-sage-200 shadow-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-sage-600"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-sage-900">Accessibility</h3>
                <p className="text-sage-700">
                  We strive to make end-of-life planning accessible to everyone, regardless of background or experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Meet Our Team</h2>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The passionate people behind Final.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-sage-900">Sarah Johnson</h3>
              <p className="text-sage-600 mb-2">Founder & CEO</p>
              <p className="text-sage-700 max-w-xs">
                With a background in estate planning and personal experience with loss, Sarah founded Final to help
                others navigate end-of-life planning with ease.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-sage-900">Michael Chen</h3>
              <p className="text-sage-600 mb-2">CTO</p>
              <p className="text-sage-700 max-w-xs">
                Michael leads our technology team, ensuring our platform is secure, reliable, and user-friendly for all
                our customers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Team Member"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-sage-900">Emily Rodriguez</h3>
              <p className="text-sage-600 mb-2">Head of Customer Experience</p>
              <p className="text-sage-700 max-w-xs">
                Emily ensures that every interaction with Final is compassionate, helpful, and supportive during
                sensitive planning processes.
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Join Us in Our Mission</h2>
              <p className="max-w-[900px] text-sage-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Help us bring peace of mind to more families through thoughtful planning.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button className="bg-white text-sage-700 hover:bg-sage-100" size="lg">
                Start Your Plan
              </Button>
              <Link href="/careers">
                <Button variant="outline" className="border-white text-white hover:bg-sage-600" size="lg">
                  Join Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
