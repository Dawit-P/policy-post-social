
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  Users, 
  Menu, 
  X,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Trending Topics', path: '/admin/trending', icon: TrendingUp },
    { name: 'Post Moderation', path: '/admin/posts', icon: FileText },
    { name: 'User Management', path: '/admin/users', icon: Users },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/admin'}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
