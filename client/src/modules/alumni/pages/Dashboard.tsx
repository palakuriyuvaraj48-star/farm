import { ActionButton } from '@/components/shared/ActionButton';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 p-8 rounded-lg text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Alumni!</h1>
        <p className="text-amber-100 mb-6">Stay connected with your alma mater, mentor students, and grow your network.</p>
        <div className="flex space-x-4">
          <ActionButton variant="outline" className="bg-white text-amber-700 hover:bg-gray-100 border-none">Update Profile</ActionButton>
          <ActionButton className="bg-orange-900 text-white hover:bg-orange-800 border-none">Make a Donation</ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="border border-gray-100 p-4 rounded-lg flex items-center bg-gray-50">
              <div className="bg-amber-100 text-amber-800 rounded p-3 text-center min-w-[70px] mr-4">
                <p className="text-sm font-bold">OCT</p>
                <p className="text-xl font-black">15</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Annual Alumni Meet 2026</h3>
                <p className="text-sm text-gray-600">Main Campus Auditorium • 10:00 AM</p>
                <button className="text-primary text-sm mt-2 font-medium">RSVP Now</button>
              </div>
            </div>
            <div className="border border-gray-100 p-4 rounded-lg flex items-center bg-gray-50">
              <div className="bg-amber-100 text-amber-800 rounded p-3 text-center min-w-[70px] mr-4">
                <p className="text-sm font-bold">NOV</p>
                <p className="text-xl font-black">02</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Tech Industry Networking</h3>
                <p className="text-sm text-gray-600">Virtual Event • 06:00 PM</p>
                <button className="text-primary text-sm mt-2 font-medium">Join Link</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Give Back to Campus</h2>
          <p className="text-gray-600 mb-4">Support the next generation of innovators through our active mentorship and scholarship programs.</p>
          <div className="space-y-3">
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-blue-900">Mentorship Program</p>
                <p className="text-sm text-blue-800">Guide a 3rd-year student.</p>
              </div>
              <ActionButton size="sm" variant="outline" className="border-blue-600 text-blue-700 bg-white">Opt-In</ActionButton>
            </div>
            <div className="p-4 border border-green-100 bg-green-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold text-green-900">Scholarship Fund</p>
                <p className="text-sm text-green-800">Contribute to student tuitions.</p>
              </div>
              <ActionButton size="sm" className="bg-green-600 hover:bg-green-700 text-white border-none">Donate</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
