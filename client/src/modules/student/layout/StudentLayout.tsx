import { ActionButton } from '@/components/shared/ActionButton';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function StudentLayout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navigation = [
    { name: 'Dashboard', href: '/student' },
    { name: 'Attendance', href: '/student/attendance' },
    { name: 'Results', href: '/student/results' },
    { name: 'Fees', href: '/student/fees' },
    { name: 'Profile', href: '/student/profile' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-primary">Student Portal</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/student' && location.pathname === '/student/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <ActionButton 
            onClick={logout} 
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
          >
            Logout
          </ActionButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => n.href === location.pathname)?.name || 'Portal'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-gray-700 font-medium">Student Name</span>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
