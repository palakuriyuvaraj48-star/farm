export default function Faculty() {
  const facultyList = [
    { name: 'Dr. Alan Turing', designation: 'Professor & HOD', dept: 'Computer Science', exp: '20 Years' },
    { name: 'Dr. Ada Lovelace', designation: 'Associate Professor', dept: 'Computer Science', exp: '15 Years' },
    { name: 'Dr. Nikola Tesla', designation: 'Professor', dept: 'Electrical Engineering', exp: '25 Years' },
    { name: 'Dr. Marie Curie', designation: 'Professor', dept: 'Applied Sciences', exp: '30 Years' },
    { name: 'Dr. Grace Hopper', designation: 'Assistant Professor', dept: 'Computer Science', exp: '8 Years' },
    { name: 'Dr. Henry Ford', designation: 'Professor & Dean', dept: 'Mechanical Engineering', exp: '22 Years' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Distinguished Faculty</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Learn from industry experts and renowned scholars who are dedicated to academic excellence and student success.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyList.map((faculty, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
              {faculty.name.charAt(4)}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{faculty.name}</h3>
            <p className="text-primary font-medium">{faculty.designation}</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>Department: {faculty.dept}</p>
              <p>Experience: {faculty.exp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
