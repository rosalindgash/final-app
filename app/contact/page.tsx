"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would handle form submission here
    setFormSubmitted(true)
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-sage-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">Get in Touch</h1>
              <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're here to answer your questions and provide support on your end-of-life planning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-sage-900 mb-6">Contact Us</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-sage-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sage-900">Email</h3>
                    <p className="text-sage-700">support@finalplanning.com</p>
                    <p className="text-sage-600 text-sm mt-1">We aim to respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sage-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sage-900">Phone</h3>
                    <p className="text-sage-700">(555) 123-4567</p>
                    <p className="text-sage-600 text-sm mt-1">Monday-Friday, 9am-5pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-sage-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-sage-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-sage-900">Office</h3>
                    <p className="text-sage-700">123 Peace Street</p>
                    <p className="text-sage-700">Suite 456</p>
                    <p className="text-sage-700">Boston, MA 02108</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-sage-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-sage-100 p-2 rounded-full hover:bg-sage-200 transition-colors">
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
                      className="h-5 w-5 text-sage-600"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="bg-sage-100 p-2 rounded-full hover:bg-sage-200 transition-colors">
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
                      className="h-5 w-5 text-sage-600"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="bg-sage-100 p-2 rounded-full hover:bg-sage-200 transition-colors">
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
                      className="h-5 w-5 text-sage-600"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="bg-sage-100 p-2 rounded-full hover:bg-sage-200 transition-colors">
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
                      className="h-5 w-5 text-sage-600"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-sage-900">Send Us a Message</CardTitle>
                <CardDescription className="text-sage-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-4">
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
                        className="h-8 w-8 text-sage-600"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-sage-900 mb-2">Thank You!</h3>
                    <p className="text-sage-700">
                      Your message has been sent successfully. We'll get back to you shortly.
                    </p>
                    <Button
                      className="mt-6 bg-sage-600 hover:bg-sage-700 text-white"
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name" className="text-sage-700">
                          First name
                        </Label>
                        <Input id="first-name" placeholder="John" required className="border-sage-300" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name" className="text-sage-700">
                          Last name
                        </Label>
                        <Input id="last-name" placeholder="Doe" required className="border-sage-300" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sage-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        required
                        className="border-sage-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sage-700">
                        Phone (optional)
                      </Label>
                      <Input id="phone" type="tel" placeholder="(555) 123-4567" className="border-sage-300" />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sage-700">I am a:</Label>
                      <RadioGroup defaultValue="individual" className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="individual" id="individual" />
                          <Label htmlFor="individual" className="text-sage-700">
                            Individual planning for myself
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="family" id="family" />
                          <Label htmlFor="family" className="text-sage-700">
                            Planning for my family
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="professional" id="professional" />
                          <Label htmlFor="professional" className="text-sage-700">
                            Professional (Attorney, Financial Advisor, etc.)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic" className="text-sage-700">
                        Topic
                      </Label>
                      <Select>
                        <SelectTrigger className="border-sage-300">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sage-700">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        required
                        className="min-h-[120px] border-sage-300"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
