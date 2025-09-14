
'use client';

import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, GraduationCap, Shield, LogOut, Settings, HelpCircle } from "lucide-react";
import { useSearchParams } from 'next/navigation';

const navLinks = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  ],
  teacher: [
    { name: "Teacher Dashboard", href: "/dashboard/teacher", icon: GraduationCap },
  ],
  admin: [
    { name: "Admin Dashboard", href: "/dashboard/admin", icon: Shield },
  ],
};

type Role = 'student' | 'teacher' | 'admin';

export function SidebarNav() {
  const searchParams = useSearchParams();
  const role = (searchParams.get('role') as Role) || 'student';

  const currentNav = navLinks[role] || navLinks.student;
  const currentRoleName = role.charAt(0).toUpperCase() + role.slice(1);
  
  const createHref = (href: string) => {
    const params = new URLSearchParams(searchParams);
    return `${href}?${params.toString()}`;
  }

  return (
    <>
      <SidebarHeader>
        <Link href={createHref("/dashboard")} className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
           <h1 className="text-lg font-semibold">EduAI</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <p className="px-2 py-1 text-xs text-muted-foreground">{currentRoleName}</p>
        <SidebarMenu>
          {currentNav.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild variant="default" size="default">
                <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
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
