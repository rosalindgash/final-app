import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sage-900">What Our Users Say</h2>
            <p className="max-w-[900px] text-sage-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from people who have found peace of mind with Final.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-sage-50 border-sage-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full overflow-hidden w-12 h-12 bg-sage-200 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-sage-900">Michael R.</p>
                  <p className="text-sm text-sage-600">Estate Planner</p>
                </div>
              </div>
              <p className="text-sage-700 italic">
                "As an estate planner, I recommend Final to all my clients. It makes the process so much easier and
                ensures nothing is overlooked."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sage-50 border-sage-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full overflow-hidden w-12 h-12 bg-sage-200 flex items-center justify-center">
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
                  <p className="text-sm text-sage-600">Parent of Three</p>
                </div>
              </div>
              <p className="text-sage-700 italic">
                "After my husband's unexpected passing, I realized how important it is to be prepared. Final has given
                me peace knowing my children will be taken care of."
              </p>
            </CardContent>
          </Card>

          <Card className="bg-sage-50 border-sage-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full overflow-hidden w-12 h-12 bg-sage-200 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-medium text-sage-900">Robert T.</p>
                  <p className="text-sm text-sage-600">Retiree</p>
                </div>
              </div>
              <p className="text-sage-700 italic">
                "The platform is incredibly easy to use, even for someone like me who isn't tech-savvy. I've documented
                everything my family will need."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
