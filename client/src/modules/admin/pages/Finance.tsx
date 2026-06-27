export default function Finance() {
  const transactions = [
    { id: 'TXN1001', student: 'John Doe', type: 'Tuition Fee', amount: 1200, date: '2026-08-15', status: 'Completed' },
    { id: 'TXN1002', student: 'Jane Smith', type: 'Hostel Fee', amount: 800, date: '2026-08-14', status: 'Completed' },
    { id: 'TXN1003', student: 'Alice Johnson', type: 'Tuition Fee', amount: 1200, date: '2026-08-10', status: 'Failed' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-green-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Collected (This Month)</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900">$245,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-red-500">
          <h3 className="text-gray-500 text-sm font-medium">Total Pending Dues</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900">$85,200</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-500">
          <h3 className="text-gray-500 text-sm font-medium">Refunds Processed</h3>
          <p className="text-3xl font-bold mt-2 text-gray-900">$4,500</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.student}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">${txn.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{txn.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {txn.status === 'Completed' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Failed</span>
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
