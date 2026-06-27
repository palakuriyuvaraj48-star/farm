import { ActionButton } from '@/components/shared/ActionButton';

export default function Placements() {
  const drives = [
    { id: 1, company: 'Google', role: 'Software Engineer', ctc: '$120,000', deadline: '2026-09-01', status: 'Open' },
    { id: 2, company: 'Microsoft', role: 'Data Scientist', ctc: '$110,000', deadline: '2026-09-05', status: 'Open' },
    { id: 3, company: 'Amazon', role: 'SDE-1', ctc: '$115,000', deadline: '2026-08-15', status: 'Closed' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-lg text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Campus Placement Drive 2026</h1>
        <p className="text-blue-100 mb-6">Your gateway to the best tech companies. Complete your profile to apply.</p>
        <div className="flex space-x-4">
          <ActionButton variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 border-none">Update Resume</ActionButton>
          <ActionButton className="bg-indigo-900 text-white hover:bg-indigo-800 border-none">View My Applications</ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Placement Drives</h2>
            <div className="space-y-4">
              {drives.map(drive => (
                <div key={drive.id} className="border border-gray-200 p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition-shadow">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-gray-900">{drive.company}</h3>
                    <p className="text-gray-600 font-medium">{drive.role}</p>
                    <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>{drive.ctc}</span>
                      <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>Apply By: {drive.deadline}</span>
                    </div>
                  </div>
                  <div>
                    {drive.status === 'Open' ? (
                      <ActionButton className="w-full md:w-auto">Apply Now</ActionButton>
                    ) : (
                      <ActionButton variant="outline" className="w-full md:w-auto opacity-50 cursor-not-allowed" disabled>Closed</ActionButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Placement Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Students Placed</span>
                  <span className="font-bold text-gray-900">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Highest Package</p>
                <p className="text-xl font-bold text-primary">$150,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Package</p>
                <p className="text-xl font-bold text-primary">$85,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 bg-blue-50">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Need Preparation Help?</h3>
            <p className="text-sm text-blue-800 mb-4">Register for mock interviews and aptitude training sessions happening this weekend.</p>
            <ActionButton variant="outline" className="w-full border-blue-600 text-blue-700 bg-white hover:bg-blue-100">Register for Training</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
