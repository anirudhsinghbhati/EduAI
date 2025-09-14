import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, BrainCircuit, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="font-bold text-lg">EduAI</span>
          </Link>
          <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  The Future of Education is Here
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  EduAI automates attendance, personalizes learning, and streamlines school administration with the power of artificial intelligence.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild size="lg">
                    <Link href="/signup">Start for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1594665482333-a3b4d1158ea9?q=80&w=1740&auto=format&fit=crop"
                width="600"
                height="400"
                alt="Smiling student in a classroom"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                data-ai-hint="indian student classroom"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need for a Smarter School</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Discover the powerful tools that make EduAI the perfect solution for modern education.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-3">
              <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-4">
                        <Camera className="w-8 h-8"/>
                    </div>
                </div>
                <h3 className="text-xl font-bold">AI Attendance</h3>
                <p className="text-muted-foreground">Automate attendance tracking from a single class photo, saving teachers valuable time.</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-4">
                        <BrainCircuit className="w-8 h-8"/>
                    </div>
                </div>
                <h3 className="text-xl font-bold">Personalized Learning</h3>
                <p className="text-muted-foreground">AI-driven recommendations help students focus on areas needing improvement.</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary rounded-full p-4">
                        <ShieldCheck className="w-8 h-8"/>
                    </div>
                </div>
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
                <p className="text-muted-foreground">Manage student rosters and system-wide announcements with ease from one central place.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get Started in 3 Easy Steps</h2>
                        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                            EduAI is designed to be simple and intuitive to set up.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-3xl gap-10 py-12 md:grid-cols-3 md:gap-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl font-bold text-primary bg-primary/10 rounded-full h-16 w-16 mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                        <p className="text-muted-foreground">Create an account for your role—student, teacher, or admin.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl font-bold text-primary bg-primary/10 rounded-full h-16 w-16 mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Add Students</h3>
                        <p className="text-muted-foreground">Admins can easily add students and their photos to the roster.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center text-4xl font-bold text-primary bg-primary/10 rounded-full h-16 w-16 mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Start Automating</h3>
                        <p className="text-muted-foreground">Use AI to take attendance and provide personalized feedback.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Transform Your School?</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                        Join the growing number of institutions embracing the future of education.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <Button asChild className="w-full" size="lg">
                        <Link href="/signup">Sign Up Now</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container mx-auto flex items-center justify-between">
            <p className="text-xs text-muted-foreground">&copy; 2024 EduAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
