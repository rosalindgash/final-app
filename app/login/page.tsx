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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, you would handle authentication here
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
              <CardTitle className="text-2xl font-bold text-center text-sage-900">Welcome back</CardTitle>
              <CardDescription className="text-center text-sage-600">
                Log in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sage-700">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-sage-600 hover:text-sage-800 underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-sage-300 focus:border-sage-500 focus:ring-sage-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-sage-700">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </form>

              <div className="mt-4 text-center text-sm">
                <p className="text-sage-600">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-sage-600 hover:text-sage-800 font-medium underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Image and testimonial */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-sage-100 px-12">
        <div className="max-w-md">
          <div className="mb-8 flex justify-center">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Peace of mind illustration"
              width={300}
              height={300}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-sage-200">
            <p className="text-sage-700 italic mb-4">
              "Final has given me peace of mind knowing that my family won't have to struggle with difficult decisions
              during an already emotional time. The process was simple and comprehensive."
            </p>
            <div className="flex items-center">
              <div className="mr-4 w-12 h-12 rounded-full overflow-hidden bg-sage-200">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="User avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-medium text-sage-900">Jennifer L.</p>
                <p className="text-sm text-sage-600">Final User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
