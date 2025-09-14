import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="font-bold">EduAI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">Pricing</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Attendance & Personalized Learning System
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    EduAI leverages AI to automate attendance, provide personalized learning paths, and streamline administrative tasks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/hero/600/400"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="education technology"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover the powerful tools that make EduAI the perfect solution for modern education.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="grid gap-1">
                        <h3 className="text-xl font-bold">AI Attendance</h3>
                        <p className="text-muted-foreground">Automated attendance using facial recognition from a single class photo.</p>
                    </div>
                     <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Personalized Learning</h3>
                        <p className="text-muted-foreground">AI-driven recommendations to help students focus on areas needing improvement.</p>
                    </div>
                     <div className="grid gap-1">
                        <h3 className="text-xl font-bold">Admin Dashboard</h3>
                        <p className="text-muted-foreground">Manage student rosters and system-wide announcements with ease.</p>
                    </div>
                </div>
            </div>
        </section>

         <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Choose Your Role</h2>
                    <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Access a dashboard tailored to your needs.
                    </p>
                </div>
                <div className="flex justify-center space-x-4">
                    <Button asChild>
                        <Link href="/dashboard?role=student">Student</Link>
                    </Button>
                     <Button asChild>
                        <Link href="/dashboard?role=teacher">Teacher</Link>
                    </Button>
                     <Button asChild>
                        <Link href="/dashboard?role=admin">Admin</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 EduAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
