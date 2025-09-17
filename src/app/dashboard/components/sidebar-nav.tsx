

'use client';

import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import Link from "next/link";
import { LayoutDashboard, GraduationCap, Shield, LogOut, Settings, HelpCircle, Users, Briefcase, CreditCard, BookCopy, CalendarDays } from "lucide-react";
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
    { name: "Staff Management", href: "/dashboard/admin/staff", icon: Briefcase },
    { name: "Course Management", href: "/dashboard/admin/courses", icon: BookCopy },
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

  const isSubActive = (basePath: string) => pathname.startsWith(basePath);

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
            let active = pathname === item.href;
            if (item.href === '/dashboard/admin/students') {
              active = isSubActive('/dashboard/admin/students') || isSubActive('/dashboard/admin/roster') || isSubActive('/dashboard/admin/enrollment') || isSubActive('/dashboard/admin/performance');
            }
             if (item.href === '/dashboard/admin/staff') {
              active = isSubActive('/dashboard/admin/staff');
            }
            if (item.href === '/dashboard/admin/courses') {
              active = isSubActive('/dashboard/admin/courses') || isSubActive('/dashboard/admin/timetable');
            }

            // Student Management Sub-menu
            if (item.href === "/dashboard/admin/students") {
                 return (
                    <SidebarMenuItem key={item.name} className="flex flex-col items-start">
                        <SidebarMenuButton asChild variant="default" size="default" isActive={active}>
                            <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
                        </SidebarMenuButton>
                        {active && (
                            <div className="pl-6 pt-1 w-full">
                                <SidebarMenu>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/roster')}><Link href={createHref('/dashboard/admin/roster')}>Records</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/enrollment')}><Link href={createHref('/dashboard/admin/enrollment')}>Enrollment</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/performance')}><Link href={createHref('/dashboard/admin/performance')}>Performance</Link></SidebarMenuButton></SidebarMenuItem>
                                </SidebarMenu>
                            </div>
                        )}
                    </SidebarMenuItem>
                )
            }

            // Staff Management Sub-menu
            if (item.href === "/dashboard/admin/staff") {
                 return (
                    <SidebarMenuItem key={item.name} className="flex flex-col items-start">
                        <SidebarMenuButton asChild variant="default" size="default" isActive={active}>
                            <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
                        </SidebarMenuButton>
                        {active && (
                            <div className="pl-6 pt-1 w-full">
                                <SidebarMenu>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/staff/records')}><Link href={createHref('/dashboard/admin/staff/records')}>Records</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/staff/leave')}><Link href={createHref('/dashboard/admin/staff/leave')}>Leave</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/staff/appraisals')}><Link href={createHref('/dashboard/admin/staff/appraisals')}>Appraisals</Link></SidebarMenuButton></SidebarMenuItem>
                                </SidebarMenu>
                            </div>
                        )}
                    </SidebarMenuItem>
                )
            }

            // Course Management Sub-menu
            if (item.href === "/dashboard/admin/courses") {
                 return (
                    <SidebarMenuItem key={item.name} className="flex flex-col items-start">
                        <SidebarMenuButton asChild variant="default" size="default" isActive={active}>
                            <Link href={createHref(item.href)}><item.icon /> <span>{item.name}</span></Link>
                        </SidebarMenuButton>
                        {active && (
                            <div className="pl-6 pt-1 w-full">
                                <SidebarMenu>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/courses/subjects')}><Link href={createHref('/dashboard/admin/courses/subjects')}>Subjects</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/courses/syllabus')}><Link href={createHref('/dashboard/admin/courses/syllabus')}>Syllabus</Link></SidebarMenuButton></SidebarMenuItem>
                                    <SidebarMenuItem><SidebarMenuButton asChild variant="default" size="sm" isActive={pathname.includes('/timetable')}><Link href={createHref('/dashboard/admin/timetable')}>Timetable</Link></SidebarMenuButton></SidebarMenuItem>
                                </SidebarMenu>
                            </div>
                        )}
                    </SidebarMenuItem>
                )
            }

            return (
                <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild variant="default" size="default" isActive={active}>
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
