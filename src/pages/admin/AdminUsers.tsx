
import { useState, useEffect } from 'react';
import { Search, Shield, UserX, Activity } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface AdminUsersProps {
  onLogout: () => void;
}

const AdminUsers = ({ onLogout }: AdminUsersProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@email.com",
          role: "user",
          status: "active",
          joinedAt: "2024-01-15",
          lastActive: "2 hours ago",
          postsCount: 12,
          avatar: null
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.johnson@email.com",
          role: "admin",
          status: "active",
          joinedAt: "2023-12-10",
          lastActive: "1 day ago",
          postsCount: 45,
          avatar: null
        },
        {
          id: 3,
          name: "Mike Davis",
          email: "mike.davis@email.com",
          role: "user",
          status: "blocked",
          joinedAt: "2024-01-08",
          lastActive: "1 week ago",
          postsCount: 8,
          avatar: null
        },
        {
          id: 4,
          name: "Emily Chen",
          email: "emily.chen@email.com",
          role: "user",
          status: "active",
          joinedAt: "2024-01-12",
          lastActive: "30 minutes ago",
          postsCount: 23,
          avatar: null
        },
        {
          id: 5,
          name: "Robert Wilson",
          email: "robert.wilson@email.com",
          role: "user",
          status: "active",
          joinedAt: "2024-01-05",
          lastActive: "3 hours ago",
          postsCount: 16,
          avatar: null
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePromoteToAdmin = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: "admin" } : user
    ));
    toast({
      title: "User Promoted",
      description: "User has been promoted to admin.",
    });
  };

  const handleBlockUser = (id: number) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === "blocked" ? "active" : "blocked" } : user
    ));
    const user = users.find(u => u.id === id);
    toast({
      title: user?.status === "blocked" ? "User Unblocked" : "User Blocked",
      description: user?.status === "blocked" ? "User has been unblocked." : "User has been blocked.",
    });
  };

  const handleViewActivity = (id: number) => {
    toast({
      title: "User Activity",
      description: "Opening user activity panel.",
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    return (
      <Badge variant={role === "admin" ? "default" : "secondary"}>
        {role === "admin" && <Shield className="h-3 w-3 mr-1" />}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "destructive"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">
              Manage user accounts, roles, and access permissions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        <div className="h-8 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Role and Status */}
                      <div className="flex items-center gap-2">
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>

                      {/* User Stats */}
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Joined: {user.joinedAt}</p>
                        <p>Last active: {user.lastActive}</p>
                        <p>Posts: {user.postsCount}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {user.role !== "admin" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePromoteToAdmin(user.id)}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            Promote
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant={user.status === "blocked" ? "default" : "secondary"}
                          onClick={() => handleBlockUser(user.id)}
                        >
                          <UserX className="h-3 w-3 mr-1" />
                          {user.status === "blocked" ? "Unblock" : "Block"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewActivity(user.id)}
                        >
                          <Activity className="h-3 w-3 mr-1" />
                          Activity
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredUsers.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
