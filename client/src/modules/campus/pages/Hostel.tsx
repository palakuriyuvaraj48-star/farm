import { ActionButton } from '@/components/shared/ActionButton';
export default function Hostel() {
  const rooms = [
    { block: 'A-Block', roomNo: '101', type: 'Single', occupancy: '1/1', status: 'Full' },
    { block: 'A-Block', roomNo: '102', type: 'Double', occupancy: '1/2', status: 'Available' },
    { block: 'B-Block', roomNo: '201', type: 'Triple', occupancy: '0/3', status: 'Available' },
    { block: 'B-Block', roomNo: '205', type: 'Double', occupancy: '2/2', status: 'Full' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Hostel Details</h2>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Allocation Status:</span>
              <span className="font-bold text-green-700">Allocated</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Block:</span>
              <span className="font-bold text-gray-900">A-Block</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Room No:</span>
              <span className="font-bold text-gray-900">102</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Roommates:</span>
              <span className="font-bold text-gray-900">1</span>
            </div>
          </div>
          <ActionButton className="mt-4 text-primary text-sm font-medium hover:underline">Raise Maintenance Request</ActionButton>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Hostel Mess Menu</h2>
          <ul className="space-y-2">
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Breakfast</span>
              <span className="text-gray-600">Pancakes, Milk, Fruits</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Lunch</span>
              <span className="text-gray-600">Rice, Curry, Salad</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium text-gray-700">Dinner</span>
              <span className="text-gray-600">Pasta, Garlic Bread</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Room Availability (Admin View)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.block}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">{room.roomNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{room.occupancy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {room.status === 'Available' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Available</span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Full</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {room.status === 'Available' ? (
                      <ActionButton className="text-primary hover:text-blue-900">Allocate</ActionButton>
                    ) : (
                      <ActionButton className="text-gray-400 cursor-not-allowed" disabled>View Occupants</ActionButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
