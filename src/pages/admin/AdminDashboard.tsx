
import { useState, useEffect } from 'react';
import { Users, FileText, TrendingUp, Activity } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import StatsCard from '@/components/admin/StatsCard';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    activeTrending: 0,
    engagement: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setStats({
        totalUsers: 1234,
        totalPosts: 856,
        activeTrending: 12,
        engagement: 89
      });
      setLoading(false);
    }, 1000);
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user.name || 'Admin'}
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening on your platform today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              // Loading placeholders
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              ))
            ) : (
              <>
                <StatsCard
                  title="Total Users"
                  value={stats.totalUsers.toLocaleString()}
                  icon={Users}
                  change="+12% from last month"
                  changeType="positive"
                />
                <StatsCard
                  title="Total Posts"
                  value={stats.totalPosts.toLocaleString()}
                  icon={FileText}
                  change="+8% from last month"
                  changeType="positive"
                />
                <StatsCard
                  title="Active Trending Topics"
                  value={stats.activeTrending}
                  icon={TrendingUp}
                  change="2 new this week"
                  changeType="neutral"
                />
                <StatsCard
                  title="Engagement Rate"
                  value={`${stats.engagement}%`}
                  icon={Activity}
                  change="+5% from last month"
                  changeType="positive"
                />
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">Recent Activity</h3>
                <p className="text-sm text-gray-600">
                  5 new posts pending moderation
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">System Health</h3>
                <p className="text-sm text-green-600">
                  All systems operational
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <h3 className="font-medium text-gray-900 mb-2">Notifications</h3>
                <p className="text-sm text-gray-600">
                  3 users reported content
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
