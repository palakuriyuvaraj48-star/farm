export default function Results() {
  const semesters = [
    {
      name: 'Semester 3 (Current)',
      cgpa: '3.8',
      results: [
        { subject: 'Data Structures', grade: 'A', points: 4.0 },
        { subject: 'Basic Circuits', grade: 'B+', points: 3.5 },
      ]
    },
    {
      name: 'Semester 2',
      cgpa: '3.9',
      results: [
        { subject: 'Programming in C', grade: 'A+', points: 4.0 },
        { subject: 'Engineering Maths', grade: 'A', points: 4.0 },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {semesters.map((sem, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">{sem.name}</h2>
            <span className="px-4 py-1 bg-blue-50 text-primary font-bold rounded-full">SGPA: {sem.cgpa}</span>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sem.results.map((res, ridx) => (
                <tr key={ridx}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{res.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{res.grade}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{res.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
