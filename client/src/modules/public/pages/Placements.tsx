export default function Placements() {
  const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'TCS', 'Infosys', 'Wipro', 'IBM', 'Intel'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Training & Placements</h1>
      
      <div className="bg-primary text-white rounded-lg p-8 mb-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl font-extrabold mb-2">95%</div>
            <div className="text-blue-100">Placement Rate</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">500+</div>
            <div className="text-blue-100">Recruiters</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold mb-2">$120k</div>
            <div className="text-blue-100">Highest Package</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Recruiters</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {companies.map((company, idx) => (
          <div key={idx} className="px-6 py-4 bg-white border border-gray-200 rounded-md shadow-sm font-semibold text-gray-700">
            {company}
          </div>
        ))}
      </div>

      <div className="mt-16 prose lg:prose-lg mx-auto text-gray-600">
        <h2 className="text-center text-gray-900 font-bold">Placement Cell</h2>
        <p className="text-center">
          The dedicated placement cell works year-round to build relationships with industry leaders and provide students with internship and full-time job opportunities. We conduct regular mock interviews, aptitude tests, and resume-building workshops.
        </p>
      </div>
    </div>
  );
}
