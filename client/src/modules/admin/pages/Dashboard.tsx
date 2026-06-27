import { Link } from 'react-router-dom';

export default function Dashboard() {
  const summary = [
    { label: 'Total Students', value: '4,520', color: 'text-blue-600' },
    { label: 'Total Faculty', value: '350', color: 'text-green-600' },
    { label: 'Departments', value: '12', color: 'text-purple-600' },
    { label: 'Revenue (YTD)', value: '$5.2M', color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summary.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">{item.label}</h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/users" className="p-4 bg-gray-50 rounded-lg text-center font-medium hover:bg-gray-100 transition border border-gray-200 text-gray-700">
              Manage Users
            </Link>
            <Link to="/admin/departments" className="p-4 bg-gray-50 rounded-lg text-center font-medium hover:bg-gray-100 transition border border-gray-200 text-gray-700">
              Manage Departments
            </Link>
            <Link to="/admin/finance" className="p-4 bg-gray-50 rounded-lg text-center font-medium hover:bg-gray-100 transition border border-gray-200 text-gray-700">
              Financial Reports
            </Link>
            <Link to="#" className="p-4 bg-gray-50 rounded-lg text-center font-medium hover:bg-gray-100 transition border border-gray-200 text-gray-700">
              System Settings
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">System Alerts</h3>
          <ul className="space-y-3">
            <li className="p-3 bg-red-50 border border-red-100 rounded-md">
              <p className="font-semibold text-red-800">Database Backup Missing</p>
              <p className="text-sm text-red-700">Last daily backup failed. Please check the AWS S3 configuration.</p>
            </li>
            <li className="p-3 bg-yellow-50 border border-yellow-100 rounded-md">
              <p className="font-semibold text-yellow-800">High Server Load</p>
              <p className="text-sm text-yellow-700">Server load averaged 85% over the last hour.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
