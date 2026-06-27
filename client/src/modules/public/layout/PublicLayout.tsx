import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <header className="bg-surface shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary">EduPlatform</Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-primary">About</Link>
              <Link to="/academics" className="text-gray-600 hover:text-primary">Academics</Link>
              <Link to="/admissions" className="text-gray-600 hover:text-primary">Admissions</Link>
              <Link to="/faculty" className="text-gray-600 hover:text-primary">Faculty</Link>
              <Link to="/placements" className="text-gray-600 hover:text-primary">Placements</Link>
              <Link to="/research" className="text-gray-600 hover:text-primary">Research</Link>
              <Link to="/gallery" className="text-gray-600 hover:text-primary">Gallery</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
            </nav>
            <div className="flex items-center">
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Portal Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EduPlatform</h3>
            <p className="text-gray-400">Empowering the next generation of leaders through excellence in education and research.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-white">Admissions</Link></li>
              <li><Link to="/academics" className="hover:text-white">Academics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/placements" className="hover:text-white">Placement Cell</Link></li>
              <li><Link to="/research" className="hover:text-white">Research Grants</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Campus Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">123 University Avenue<br/>Tech City, TC 12345<br/>Phone: (555) 123-4567<br/>Email: info@eduplatform.edu</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
