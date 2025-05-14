"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      // In a real app, you would handle the password reset request here
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-sage-50 justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-sage-900">Final</h1>
          </Link>
          <p className="mt-2 text-sage-600">Peace of Mind, Planned Ahead</p>
        </div>

        <Card className="border-sage-200">
          <CardHeader className="space-y-1">
            <Link href="/login" className="flex items-center text-sage-600 hover:text-sage-800 mb-2">
              <ArrowLeft size={16} className="mr-1" />
              <span className="text-sm">Back to login</span>
            </Link>
            <CardTitle className="text-2xl font-bold text-sage-900">Reset your password</CardTitle>
            <CardDescription className="text-sage-600">
              {!isSubmitted
                ? "Enter your email and we'll send you instructions to reset your password"
                : "Check your email for reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset instructions"}
                </Button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-sage-600" />
                </div>
                <p className="text-sage-700 mb-6">
                  We've sent password reset instructions to <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-sage-600 mb-4">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sage-600 hover:text-sage-800 underline font-medium"
                  >
                    try again
                  </button>
                </p>
                <Link href="/login">
                  <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50">
                    Return to login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
