import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="w-full text-center text-sm text-muted-foreground mb-2">
            For prototype purposes, login as:
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
             <Button asChild>
                <Link href="/dashboard?role=student">Student</Link>
             </Button>
             <Button asChild>
                <Link href="/dashboard?role=teacher">Teacher</Link>
             </Button>
             <Button asChild>
                <Link href="/dashboard?role=admin">Admin</Link>
             </Button>
             <Button asChild>
                <Link href="/dashboard">Other</Link>
             </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
