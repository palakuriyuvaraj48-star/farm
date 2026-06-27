import { ActionButton } from '@/components/shared/ActionButton';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function FacultyLayout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navigation = [
    { name: 'Dashboard', href: '/faculty' },
    { name: 'Attendance Marking', href: '/faculty/attendance' },
    { name: 'Grade Entry', href: '/faculty/grades' },
    { name: 'My Schedule', href: '/faculty/schedule' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-700">
          <Link to="/" className="text-xl font-bold text-white">Faculty Portal</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/faculty' && location.pathname === '/faculty/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <ActionButton 
            onClick={logout} 
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-700 hover:text-red-300 rounded-md transition-colors font-medium"
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
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="text-gray-700 font-medium">Dr. Alan Turing</span>
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
