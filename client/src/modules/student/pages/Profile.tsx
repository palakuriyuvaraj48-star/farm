export default function Profile() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold">
          S
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
          <p className="text-gray-500">Roll No: CS2025001</p>
          <p className="text-primary font-medium">B.Tech - Computer Science</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Personal Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-medium text-gray-800">john.doe@student.edu</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Phone:</span> <span className="font-medium text-gray-800">+1 234-567-8901</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date of Birth:</span> <span className="font-medium text-gray-800">2003-05-14</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Blood Group:</span> <span className="font-medium text-gray-800">O+</span></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Academic Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-500">Department:</span> <span className="font-medium text-gray-800">Computer Science</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Batch:</span> <span className="font-medium text-gray-800">2025</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Current Semester:</span> <span className="font-medium text-gray-800">3rd Semester</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Faculty Advisor:</span> <span className="font-medium text-gray-800">Dr. Ada Lovelace</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
