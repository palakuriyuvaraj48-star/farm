import { ActionButton } from '@/components/shared/ActionButton';

export default function Transport() {
  const routes = [
    { id: 1, routeNo: 'R-101', startPoint: 'City Center', endPoint: 'Campus', timing: '08:00 AM', driver: 'Mike Johnson' },
    { id: 2, routeNo: 'R-102', startPoint: 'North Station', endPoint: 'Campus', timing: '07:45 AM', driver: 'Sarah Connor' },
    { id: 3, routeNo: 'R-103', startPoint: 'West Suburbs', endPoint: 'Campus', timing: '08:15 AM', driver: 'David Smith' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Transport Pass</h2>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex justify-between items-center mb-4 border-b border-yellow-200 pb-4">
              <div>
                <p className="text-sm text-yellow-800 font-semibold uppercase">Bus Pass</p>
                <p className="text-2xl font-bold text-gray-900">Valid</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-yellow-800">Pass No</p>
                <p className="font-mono font-bold text-gray-900">BP-2026-892</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Assigned Route:</span> <span className="font-medium text-gray-900">R-101 (City Center)</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Pickup Point:</span> <span className="font-medium text-gray-900">Central Mall Stop</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Valid Until:</span> <span className="font-medium text-gray-900">Dec 31, 2026</span></div>
            </div>
          </div>
          <ActionButton variant="outline" className="mt-4 w-full">Renew Pass</ActionButton>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Live Tracking</h2>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
            {/* Map placeholder */}
            <p className="text-gray-500 flex flex-col items-center">
              <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Google Maps Integration Pending
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-4">Current location of Bus R-101 is 5 mins away from your stop.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Available Bus Routes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Point</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Point</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Morning Timing</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Driver Info</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {routes.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{r.routeNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.startPoint}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.endPoint}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-primary">{r.timing}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{r.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
