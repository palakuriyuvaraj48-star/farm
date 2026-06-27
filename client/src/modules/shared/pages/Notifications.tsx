import { ActionButton } from '@/components/shared/ActionButton';
export default function Notifications() {
  const notifications = [
    { id: 1, type: 'alert', title: 'Fee Deadline Approaching', message: 'Your tuition fee for Semester 3 is due on Oct 15th.', date: '2 hours ago', read: false },
    { id: 2, type: 'info', title: 'New Course Material', message: 'Prof. Turing uploaded new slides for CS101.', date: '1 day ago', read: false },
    { id: 3, type: 'success', title: 'Grade Published', message: 'Your grades for the mid-term exam are now available.', date: '3 days ago', read: true },
    { id: 4, type: 'info', title: 'Holiday Notice', message: 'The campus will remain closed on Friday due to a public holiday.', date: '1 week ago', read: true },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Global Notifications</h1>
        <ActionButton className="text-primary font-medium hover:underline text-sm">Mark all as read</ActionButton>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notifications.map((n) => (
            <li key={n.id} className={`p-5 hover:bg-gray-50 transition flex items-start ${!n.read ? 'bg-blue-50/30' : ''}`}>
              <div className="mt-1 mr-4">
                {n.type === 'alert' && <div className="w-3 h-3 bg-red-500 rounded-full"></div>}
                {n.type === 'info' && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
                {n.type === 'success' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-semibold ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{n.date}</span>
                </div>
                <p className={`text-sm ${!n.read ? 'text-gray-800' : 'text-gray-600'}`}>{n.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
