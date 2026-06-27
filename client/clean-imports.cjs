const fs = require('fs');
const path = require('path');

const filesToClean = [
  "src/layouts/AdminERPLayout.tsx",
  "src/layouts/FacultyPortalLayout.tsx",
  "src/modules/admin/pages/Admissions.tsx",
  "src/modules/admin/pages/DepartmentCourse.tsx",
  "src/modules/admin/pages/Financials.tsx",
  "src/modules/admin/pages/UserManagement.tsx",
  "src/modules/alumni/pages/Dashboard.tsx",
  "src/modules/alumni/pages/Directory.tsx",
  "src/modules/campus/pages/Library.tsx",
  "src/modules/campus/pages/Placements.tsx",
  "src/modules/campus/pages/Transport.tsx",
  "src/modules/faculty/pages/AttendanceMarking.tsx",
  "src/modules/faculty/pages/GradeEntry.tsx",
  "src/modules/faculty/pages/Research.tsx",
  "src/modules/faculty/pages/StudentAnalytics.tsx",
  "src/modules/parent/pages/Dashboard.tsx",
  "src/modules/public/pages/Admissions.tsx",
  "src/modules/public/pages/Contact.tsx",
  "src/modules/public/pages/Home.tsx",
  "src/modules/student/pages/Assignments.tsx",
  "src/modules/student/pages/Attendance.tsx",
  "src/modules/student/pages/Dashboard.tsx",
  "src/modules/student/pages/Fees.tsx",
  "src/pages/home/Departments.tsx",
  "src/pages/home/HeroSection.tsx",
  "src/pages/home/NewsAndEvents.tsx",
  "src/pages/home/OtherSections.tsx"
];

filesToClean.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove Button import if <Button is not used
    if (!content.includes('<Button ') && !content.includes('<Button>')) {
      content = content.replace(/import { Button } from '@\/components\/ui\/Button';\n/g, '');
    }

    // specific cleanups
    if (file === 'src/layouts/AdminERPLayout.tsx') {
      content = content.replace(/, useLocation /g, ' ');
    }
    if (file === 'src/layouts/FacultyPortalLayout.tsx') {
      content = content.replace(/BookOpen, /g, '');
    }

    fs.writeFileSync(fullPath, content, 'utf8');
  }
});

console.log('Cleaned unused imports.');
