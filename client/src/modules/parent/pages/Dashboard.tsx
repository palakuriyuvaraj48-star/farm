import { ActionButton } from '@/components/shared/ActionButton';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Student Overview: John Doe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800 font-semibold mb-1">Current CGPA</p>
            <p className="text-3xl font-bold text-blue-900">3.8</p>
            <p className="text-xs text-blue-700 mt-2">Excellent standing</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
            <p className="text-sm text-green-800 font-semibold mb-1">Overall Attendance</p>
            <p className="text-3xl font-bold text-green-900">85%</p>
            <p className="text-xs text-green-700 mt-2">Above 75% requirement</p>
          </div>
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm text-red-800 font-semibold mb-1">Pending Fees</p>
            <p className="text-3xl font-bold text-red-900">$1,200</p>
            <ActionButton size="sm" className="mt-2 bg-red-600 hover:bg-red-700 w-full border-none text-white">Pay Now</ActionButton>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Academic Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Structures</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Mid-Term</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-green-600">A</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Basic Circuits</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">Mid-Term</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-blue-600">B+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
