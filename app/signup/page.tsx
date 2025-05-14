"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would handle the signup process here
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-sage-50">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-sage-900">Final</h1>
            </Link>
            <p className="mt-2 text-sage-600">Peace of Mind, Planned Ahead</p>
          </div>

          <Card className="border-sage-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-sage-900">Create an account</CardTitle>
              <CardDescription className="text-center text-sage-600">
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sage-700">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="border-sage-300 focus:border-sage-500 focus:ring-sage-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sage-700">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="border-sage-300 focus:border-sage-500 focus:ring-sage-500"
                    />
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
                    className="border-sage-300 focus:border-sage-500 focus:ring-sage-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sage-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-sage-300 focus:border-sage-500 focus:ring-sage-500 pr-10"
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-sage-500">Must be at least 8 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sage-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-sage-300 focus:border-sage-500 focus:ring-sage-500 pr-10"
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-sage-700">
                    I agree to the{" "}
                    <Link href="/terms" className="text-sage-600 hover:text-sage-800 underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-sage-600 hover:text-sage-800 underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <p className="text-sage-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-sage-600 hover:text-sage-800 font-medium underline">
                    Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image and text */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-sage-100 px-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Peace of mind illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-sage-900 mb-4">Plan ahead with confidence</h2>
          <p className="text-sage-700 mb-6">
            Join thousands of others who have found peace of mind by organizing their end-of-life plans with Final.
          </p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
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
                className="mr-2 h-5 w-5 text-sage-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sage-700">Secure document storage</span>
            </div>
            <div className="flex items-center">
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
                className="mr-2 h-5 w-5 text-sage-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sage-700">Guided planning templates</span>
            </div>
            <div className="flex items-center">
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
                className="mr-2 h-5 w-5 text-sage-600"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-sage-700">Share with loved ones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
