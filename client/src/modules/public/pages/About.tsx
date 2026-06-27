export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About EduPlatform</h1>
      <div className="prose lg:prose-lg mx-auto text-gray-600">
        <p className="mb-4">
          Founded in 1995, EduPlatform University has been at the forefront of educational innovation and research excellence. 
          Our mission is to empower students with knowledge, skills, and values to become leaders and innovators in their respective fields.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Vision</h2>
        <p className="mb-4">
          To be a globally recognized institution that nurtures talent, fosters critical thinking, and drives societal progress through education and research.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Core Values</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Excellence:</strong> Striving for the highest standards in teaching and learning.</li>
          <li><strong>Integrity:</strong> Upholding ethical principles in all our endeavors.</li>
          <li><strong>Inclusivity:</strong> Creating a welcoming environment for all backgrounds and perspectives.</li>
          <li><strong>Innovation:</strong> Encouraging creative problem-solving and entrepreneurial thinking.</li>
        </ul>
      </div>
    </div>
  );
}
