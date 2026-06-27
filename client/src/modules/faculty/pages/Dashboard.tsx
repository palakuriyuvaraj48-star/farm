import { ActionButton } from '@/components/shared/ActionButton';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const summary = [
    { label: 'Classes Today', value: '3', color: 'text-blue-600', link: '/faculty/schedule' },
    { label: 'Pending Grades', value: '45', color: 'text-orange-600', link: '/faculty/grades' },
    { label: 'Advisees', value: '12', color: 'text-green-600', link: '#' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summary.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">{item.label}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
            <Link to={item.link} className="text-primary text-sm mt-4 inline-block hover:underline">
              View Details &rarr;
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Schedule</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-800">CS101 - Data Structures</p>
                <p className="text-sm text-gray-500">Room 304 • Semester 3</p>
              </div>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">10:00 AM</span>
            </li>
            <li className="flex justify-between items-center pb-3 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-800">CS305 - Operating Systems</p>
                <p className="text-sm text-gray-500">Lab 1 • Semester 5</p>
              </div>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-3 rounded-full">02:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/faculty/attendance" className="p-4 bg-blue-50 text-primary rounded-lg text-center font-medium hover:bg-blue-100 transition">
              Mark Attendance
            </Link>
            <Link to="/faculty/grades" className="p-4 bg-orange-50 text-orange-600 rounded-lg text-center font-medium hover:bg-orange-100 transition">
              Upload Grades
            </Link>
            <ActionButton className="p-4 bg-green-50 text-green-600 rounded-lg text-center font-medium hover:bg-green-100 transition">
              Request Leave
            </ActionButton>
            <ActionButton className="p-4 bg-purple-50 text-purple-600 rounded-lg text-center font-medium hover:bg-purple-100 transition">
              View Syllabus
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
