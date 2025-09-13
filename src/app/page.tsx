import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, User, Shield, Briefcase, Heart, MoveRight } from "lucide-react";

const roles = [
  { name: "Teacher", icon: GraduationCap, href: "/login?role=teacher" },
  { name: "Student", icon: User, href: "/login?role=student" },
  { name: "Admin", icon: Shield, href: "/login?role=admin" },
  { name: "Counselor", icon: Briefcase, href: "/login?role=counselor" },
  { name: "Parent", icon: Heart, href: "/login?role=parent" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="font-bold">EduAI</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background -z-10"></div>
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground/80">
                The Future of Learning is Here
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                EduAI combines smart attendance with personalized learning to unlock every student's full potential.
              </p>
              <div className="flex justify-center">
                <Button size="lg" className="group" asChild>
                  <Link href="#role-selection">
                    Get Started
                    <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="role-selection" className="w-full py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Choose Your Role</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Select your role to access a tailored experience designed just for you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {roles.map((role) => (
                <Link href={role.href} key={role.name}>
                  <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
                    <CardHeader className="flex flex-col items-center justify-center text-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <role.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>{role.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
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
