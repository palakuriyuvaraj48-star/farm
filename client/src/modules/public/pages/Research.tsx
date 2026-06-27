export default function Research() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Research & Innovation</h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        We are committed to advancing knowledge through impactful research. Our state-of-the-art labs and global collaborations drive innovation across disciplines.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Centers of Excellence</h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600">
            <li>Center for Artificial Intelligence & Robotics</li>
            <li>Advanced Materials Research Lab</li>
            <li>Renewable Energy Systems Center</li>
            <li>Data Science & Analytics Institute</li>
          </ul>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Projects</h2>
          <ul className="space-y-4 text-gray-600">
            <li>
              <strong>Autonomous Drone Navigation:</strong> Funded by National Science Foundation.
            </li>
            <li>
              <strong>Next-Gen Battery Tech:</strong> Collaboration with Tesla Energy.
            </li>
            <li>
              <strong>AI in Healthcare:</strong> Developing predictive models for early disease detection.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
