import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-sage-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-sage-800">Final</span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          <Link href="/features" className="text-sm font-medium text-sage-700 hover:text-sage-900">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-sage-700 hover:text-sage-900">
            Pricing
          </Link>
          <Link href="/about" className="text-sm font-medium text-sage-700 hover:text-sage-900">
            About
          </Link>
          <Link href="/resources" className="text-sm font-medium text-sage-700 hover:text-sage-900">
            Resources
          </Link>
          <Link href="/contact" className="text-sm font-medium text-sage-700 hover:text-sage-900">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/login">
              <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-sage-600 text-white hover:bg-sage-700">Sign Up</Button>
            </Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-sage-300">
                <Menu className="h-5 w-5 text-sage-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/features" className="text-lg font-medium text-sage-700 hover:text-sage-900">
                  Features
                </Link>
                <Link href="/pricing" className="text-lg font-medium text-sage-700 hover:text-sage-900">
                  Pricing
                </Link>
                <Link href="/about" className="text-lg font-medium text-sage-700 hover:text-sage-900">
                  About
                </Link>
                <Link href="/resources" className="text-lg font-medium text-sage-700 hover:text-sage-900">
                  Resources
                </Link>
                <Link href="/contact" className="text-lg font-medium text-sage-700 hover:text-sage-900">
                  Contact
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-700 hover:bg-sage-50">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-sage-600 text-white hover:bg-sage-700">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
