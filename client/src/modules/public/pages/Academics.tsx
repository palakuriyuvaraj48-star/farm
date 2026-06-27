export default function Academics() {
  const departments = [
    { name: 'Computer Science & Engineering', programs: ['B.Tech', 'M.Tech', 'Ph.D'] },
    { name: 'Electrical Engineering', programs: ['B.Tech', 'M.Tech', 'Ph.D'] },
    { name: 'Mechanical Engineering', programs: ['B.Tech', 'M.Tech'] },
    { name: 'Business Administration', programs: ['BBA', 'MBA'] },
    { name: 'Applied Sciences', programs: ['B.Sc', 'M.Sc'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Academic Programs</h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        We offer a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines, tailored to meet industry demands.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-4">{dept.name}</h3>
            <h4 className="font-semibold text-gray-700 mb-2">Programs Offered:</h4>
            <div className="flex flex-wrap gap-2">
              {dept.programs.map((prog, pidx) => (
                <span key={pidx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {prog}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
