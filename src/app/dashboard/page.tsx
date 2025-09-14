
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StudentDashboardPage from './student/page';

export default function DashboardRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'student';

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (!searchParams.has('role')) {
        newParams.set('role', 'student');
    }
    
    // Redirect to the role-specific dashboard
    if (role === 'student') {
        router.replace(`/dashboard/student?${newParams.toString()}`);
    } else if (role === 'teacher') {
        router.replace(`/dashboard/teacher?${newParams.toString()}`);
    } else if (role === 'admin') {
        router.replace(`/dashboard/admin?${newParams.toString()}`);
    } else {
        // Fallback to student dashboard if role is unknown
        router.replace(`/dashboard/student?${newParams.toString()}`);
    }

  }, [searchParams, router, role]);

  return (
    <div className="flex items-center justify-center h-full">
        <p>Loading your dashboard...</p>
    </div>
  );
}
