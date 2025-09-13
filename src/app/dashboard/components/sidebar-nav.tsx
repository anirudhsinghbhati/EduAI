import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, User, GraduationCap, Shield, LogOut, Settings, HelpCircle } from "lucide-react";

const studentNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

const teacherNav = [
  { name: "Teacher Dashboard", href: "/dashboard/teacher", icon: GraduationCap },
];

const adminNav = [
  { name: "Admin Dashboard", href: "/dashboard/admin", icon: Shield },
];

export function SidebarNav() {
  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
           <h1 className="text-lg font-semibold">EduAI</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <p className="px-2 py-1 text-xs text-muted-foreground">Student</p>
        <SidebarMenu>
          {studentNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href={item.href}><item.icon /> <span>{item.name}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <p className="px-2 py-1 mt-4 text-xs text-muted-foreground">Teacher</p>
        <SidebarMenu>
          {teacherNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href={item.href}><item.icon /> <span>{item.name}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <p className="px-2 py-1 mt-4 text-xs text-muted-foreground">Admin</p>
        <SidebarMenu>
          {adminNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href={item.href}><item.icon /> <span>{item.name}</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href="#"><Settings /> <span>Settings</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href="#"><HelpCircle /> <span>Help</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href="/"><LogOut /> <span>Logout</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
