
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UserCard from '@/components/admin/UserCard';
import AdminModal from '@/components/admin/AdminModal';
import UserForm from '@/components/admin/UserForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  joinedAt: string;
}

interface UserManagementProps {
  onLogout: () => void;
}

const UserManagement = ({ onLogout }: UserManagementProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock API call for users
    const fetchUsers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'user',
          status: 'active',
          joinedAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'admin',
          status: 'active',
          joinedAt: '2023-12-10'
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          role: 'user',
          status: 'blocked',
          joinedAt: '2024-01-08'
        },
        {
          id: '4',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          role: 'user',
          status: 'active',
          joinedAt: '2024-01-12'
        },
        {
          id: '5',
          name: 'David Brown',
          email: 'david.brown@example.com',
          role: 'user',
          status: 'active',
          joinedAt: '2024-01-05'
        }
      ];
      
      setUsers(mockUsers);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user ${userId}`);
    
    if (action === 'edit') {
      const userToEdit = users.find(user => user.id === userId);
      setEditingUser(userToEdit);
      setIsModalOpen(true);
      return;
    }

    if (action === 'delete') {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast({
        title: "User deleted",
        description: "User has been successfully deleted",
      });
      return;
    }
    
    // Update local state for demo
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          if (action === 'promote') return { ...user, role: 'admin' as const };
          if (action === 'block') return { ...user, status: 'blocked' as const };
          if (action === 'unblock') return { ...user, status: 'active' as const };
        }
        return user;
      })
    );

    toast({
      title: "Action completed",
      description: `User ${action} successfully`,
    });
  };

  const handleCreateUser = () => {
    setEditingUser(undefined);
    setIsModalOpen(true);
  };

  const handleSubmitUser = async (userData: User) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingUser) {
      // Update existing user
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
        )
      );
      toast({
        title: "User updated",
        description: "User has been successfully updated",
      });
    } else {
      // Create new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
      toast({
        title: "User created",
        description: "New user has been successfully created",
      });
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingUser(undefined);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <AdminSidebar onLogout={onLogout} />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-2">
                Manage platform users and their permissions
              </p>
            </div>
            <Button onClick={handleCreateUser} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onAction={handleUserAction}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(undefined);
        }}
        title={editingUser ? 'Edit User' : 'Create New User'}
        description={editingUser ? 'Update user information' : 'Add a new user to the platform'}
      >
        <UserForm
          user={editingUser}
          onSubmit={handleSubmitUser}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingUser(undefined);
          }}
          isLoading={isSubmitting}
        />
      </AdminModal>
    </div>
  );
};

export default UserManagement;
