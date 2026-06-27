import { ActionButton } from '@/components/shared/ActionButton';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function ParentLayout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navigation = [
    { name: 'Dashboard', href: '/parent' },
    { name: 'Academic Progress', href: '#' },
    { name: 'Fee Status', href: '#' },
    { name: 'Attendance Record', href: '#' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-indigo-900 text-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-indigo-800">
          <Link to="/" className="text-xl font-bold text-white">Parent Portal</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/parent' && location.pathname === '/parent/');
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <ActionButton 
            onClick={logout} 
            className="w-full text-left px-4 py-2 text-pink-300 hover:bg-indigo-800 hover:text-pink-200 rounded-md transition-colors font-medium"
          >
            Logout
          </ActionButton>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => n.href === location.pathname)?.name || 'Portal'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-indigo-900 rounded-full flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-gray-700 font-medium">Mr. Robert Doe</span>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
