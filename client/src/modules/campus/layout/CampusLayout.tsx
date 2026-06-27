import { ActionButton } from '@/components/shared/ActionButton';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export default function CampusLayout() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navigation = [
    { name: 'Library', href: '/campus/library' },
    { name: 'Hostels', href: '/campus/hostel' },
    { name: 'Transport', href: '/campus/transport' },
    { name: 'Placements', href: '/campus/placements' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-teal-800 text-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-teal-700">
          <Link to="/" className="text-xl font-bold text-white">Campus Facilities</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-teal-100 hover:bg-teal-700 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-teal-700">
          <ActionButton 
            onClick={logout} 
            className="w-full text-left px-4 py-2 text-red-300 hover:bg-teal-700 hover:text-red-200 rounded-md transition-colors font-medium"
          >
            Logout
          </ActionButton>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => location.pathname.startsWith(n.href))?.name || 'Facilities'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Facilities Portal</span>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
