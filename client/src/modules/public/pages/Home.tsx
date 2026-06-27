import { Link } from 'react-router-dom';
import { ActionButton } from '@/components/shared/ActionButton';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-primary">EduPlatform University</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover a world-class education with cutting-edge facilities, renowned faculty, and a vibrant campus life.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/admissions">
                  <ActionButton className="w-full text-lg px-8 py-3">Apply Now</ActionButton>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/about">
                  <ActionButton variant="outline" className="w-full text-lg px-8 py-3 bg-white">Learn More</ActionButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence in Academics</h3>
              <p className="text-gray-600">Offering over 50 undergraduate and postgraduate programs designed for the future.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">World-Class Research</h3>
              <p className="text-gray-600">State-of-the-art laboratories and funding opportunities for groundbreaking research.</p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stellar Placements</h3>
              <p className="text-gray-600">100% placement assistance with top global companies visiting campus every year.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
