import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MoveRight, ScanFace, BrainCircuit, UserCog } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <ScanFace className="w-8 h-8 text-primary" />,
      title: "Smart Attendance",
      description: "Automate attendance tracking with our AI-powered facial recognition. Save time and reduce errors.",
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      title: "Personalized Learning",
      description: "Receive AI-driven recommendations tailored to each student's unique learning style and performance.",
    },
    {
      icon: <UserCog className="w-8 h-8 text-primary" />,
      title: "Seamless Management",
      description: "A centralized dashboard for administrators to manage student rosters and broadcast announcements effortlessly.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="font-bold">EduAI</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10"></div>
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/80">
                The Future of Education, Powered by AI
              </h1>
              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground md:text-xl">
                EduAI combines smart attendance with personalized learning to unlock every student's full potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="group" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
                 <Image
                    src="https://picsum.photos/seed/landing-hero/600/400"
                    alt="AI in education"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-2xl mx-auto"
                    data-ai-hint="education technology"
                />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything You Need for a Smarter Classroom</h2>
              <p className="text-muted-foreground md:text-lg">
                From attendance to personalized feedback, EduAI provides the tools to create a more efficient and effective learning environment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                 <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get Started in 3 Simple Steps</h2>
                </div>
                <div className="relative grid gap-10 lg:grid-cols-3 items-start">
                     <div className="absolute top-8 left-0 right-0 h-0.5 bg-border hidden lg:block w-full" />
                    <div className="relative text-center">
                         <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 z-10 relative">1</div>
                        <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                        <p className="text-muted-foreground">Sign up as a teacher, student, or administrator to get access to your dashboard.</p>
                    </div>
                     <div className="relative text-center">
                         <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 z-10 relative">2</div>
                        <h3 className="text-xl font-semibold mb-2">Manage Your Roster</h3>
                        <p className="text-muted-foreground">Admins can easily add student photos and details to create a class roster.</p>
                    </div>
                     <div className="relative text-center">
                         <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 z-10 relative">3</div>
                        <h3 className="text-xl font-semibold mb-2">Take Attendance</h3>
                        <p className="text-muted-foreground">Teachers upload a class photo, and our AI instantly marks who is present.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-24 bg-primary/5">
            <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Transform Your Classroom?</h2>
                <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto mb-8">Join the growing number of educators using EduAI to create a more engaging and personalized learning experience.</p>
                <Button size="lg" className="group" asChild>
                  <Link href="/signup">
                    Sign Up Now
                    <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
            </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-center py-6 text-sm text-muted-foreground md:flex-row">
          <p>&copy; 2024 EduAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
