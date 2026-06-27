import { Routes, Route } from 'react-router-dom';

// New Pages & Layouts
import { Home } from '@/pages/Home';
import { StudentPortalLayout } from '@/layouts/StudentPortalLayout';
import { FacultyPortalLayout } from '@/layouts/FacultyPortalLayout';
import { AdminERPLayout } from '@/layouts/AdminERPLayout';

// Admin Inner Pages
import { Admissions } from '@/modules/admin/pages/Admissions';
import { Financials } from '@/modules/admin/pages/Financials';
import { DepartmentsPerformance } from '@/modules/admin/pages/DepartmentCourse';

// Student Inner Pages
import { StudentDashboard } from '@/modules/student/pages/Dashboard';
import { Assignments } from '@/modules/student/pages/Assignments';
import { Attendance as StudentAttendance } from '@/modules/student/pages/Attendance';
import { Fees } from '@/modules/student/pages/Fees';

// Faculty Inner Pages
import { GradeEntry } from '@/modules/faculty/pages/GradeEntry';
import { AttendanceMarking } from '@/modules/faculty/pages/AttendanceMarking';
import { ResearchManagement } from '@/modules/faculty/pages/Research';
import { StudentAnalytics } from '@/modules/faculty/pages/StudentAnalytics';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route path="/" element={<Home />} />
      
      {/* Student Portal Routes */}
      <Route path="/student" element={<StudentPortalLayout><StudentDashboard /></StudentPortalLayout>} />
      <Route path="/student/assignments" element={<StudentPortalLayout><Assignments /></StudentPortalLayout>} />
      <Route path="/student/attendance" element={<StudentPortalLayout><StudentAttendance /></StudentPortalLayout>} />
      <Route path="/student/fees" element={<StudentPortalLayout><Fees /></StudentPortalLayout>} />

      {/* Faculty Portal Routes */}
      <Route path="/faculty" element={<FacultyPortalLayout><GradeEntry /></FacultyPortalLayout>} />
      <Route path="/faculty/attendance" element={<FacultyPortalLayout><AttendanceMarking /></FacultyPortalLayout>} />
      <Route path="/faculty/research" element={<FacultyPortalLayout><ResearchManagement /></FacultyPortalLayout>} />
      <Route path="/faculty/analytics" element={<FacultyPortalLayout><StudentAnalytics /></FacultyPortalLayout>} />

      {/* Admin ERP Routes */}
      <Route path="/admin" element={<AdminERPLayout><Financials /></AdminERPLayout>} />
      <Route path="/admin/admissions" element={<AdminERPLayout><Admissions /></AdminERPLayout>} />
      <Route path="/admin/departments" element={<AdminERPLayout><DepartmentsPerformance /></AdminERPLayout>} />

    </Routes>
  );
}
