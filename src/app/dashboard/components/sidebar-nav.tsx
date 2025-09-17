
'use client';

import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, GraduationCap, Shield, LogOut, Settings, HelpCircle, Users, UserCheck, CalendarDays, CreditCard, FileText, BarChart2 } from "lucide-react";
import { useSearchParams, usePathname } from 'next/navigation';

const navLinks = {
  student: [
    { name: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  ],
  teacher: [
    { name: "Teacher Dashboard", href: "/dashboard/teacher", icon: GraduationCap },
  ],
  admin: [
    { name: "Admin Dashboard", href: "/dashboard/admin", icon: Shield },
    { name: "Student Management", href: "/dashboard/admin/students", icon: Users },
    { name: "Student Records", href: "/dashboard/admin/roster", icon: Users, isSubItem: true },
    { name: "Enrollment", href: "/dashboard/admin/enrollment", icon: FileText, isSubItem: true },
    { name: "Performance", href: "/dashboard/admin/performance", icon: BarChart2, isSubItem: true },
    { name: "Teacher Management", href: "/dashboard/admin/teachers", icon: UserCheck },
    { name: "Timetable", href: "/dashboard/admin/timetable", icon: CalendarDays },
    { name: "Fee Management", href: "/dashboard/admin/fees", icon: CreditCard },
  ],
};

type Role = 'student' | 'teacher' | 'admin';

export function SidebarNav() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const queryRole = searchParams.get('role') as Role;
  
  const deriveRoleFromPath = (): Role => {
    if (pathname.startsWith('/dashboard/teacher')) return 'teacher';
    if (pathname.startsWith('/dashboard/admin')) return 'admin';
    if (pathname.startsWith('/dashboard/student')) return 'student';
    return 'student'; // Default fallback
  };

  const role = queryRole || deriveRoleFromPath();

  const currentNav = navLinks[role] || navLinks.student;
  const currentRoleName = role.charAt(0).toUpperCase() + role.slice(1);
  
  const createHref = (href: string) => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('role') || params.get('role') !== role) {
      params.set('role', role);
    }
    return `${href}?${params.toString()}`;
  }

  return (
    <>
      <SidebarHeader>
        <Link href={createHref("/dashboard")} className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
           <h1 className="text-lg font-semibold">EduTrack</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <p className="px-2 py-1 text-xs text-muted-foreground">{currentRoleName}</p>
        <SidebarMenu>
          {currentNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));
            const isSubActive = pathname.startsWith('/dashboard/admin/roster') || pathname.startsWith('/dashboard/admin/enrollment') || pathname.startsWith('/dashboard/admin/performance');
            
            if (item.href === "/dashboard/admin/students") {
                 return (
                    <SidebarMenuItem key={item.name} className="flex flex-col items-start">
                        <SidebarMenuButton asChild variant="default" size="default" isActive={isActive || isSubActive}>
                            <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
                        </SidebarMenuButton>
                        {(isActive || isSubActive) && (
                            <div className="pl-6 pt-1 w-full">
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.startsWith('/dashboard/admin/roster')}>
                                            <Link href={createHref('/dashboard/admin/roster')}>Student Records</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.startsWith('/dashboard/admin/enrollment')}>
                                            <Link href={createHref('/dashboard/admin/enrollment')}>Enrollment</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.startsWith('/dashboard/admin/performance')}>
                                            <Link href={createHref('/dashboard/admin/performance')}>Performance</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </div>
                        )}
                    </SidebarMenuItem>
                )
            }

            if (item.isSubItem) return null;

            return (
                <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild variant="default" size="default" isActive={isActive}>
                    <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            )
          })}
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
