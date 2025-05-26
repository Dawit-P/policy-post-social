
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  joinedAt: string;
}

interface UserCardProps {
  user: User;
  onAction: (action: string, userId: string) => void;
}

const UserCard = ({ user, onAction }: UserCardProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    onAction(action, user.id);
    toast({
      title: "Action completed",
      description: `User ${action} successfully`,
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            <p>Joined: {user.joinedAt}</p>
            <p>Status: <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>{user.status}</span></p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {user.role !== 'admin' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction('promote')}
            >
              Promote to Admin
            </Button>
          )}
          <Button
            size="sm"
            variant={user.status === 'blocked' ? 'default' : 'outline'}
            onClick={() => handleAction(user.status === 'blocked' ? 'unblock' : 'block')}
          >
            {user.status === 'blocked' ? 'Unblock' : 'Block'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction('view-activity')}
          >
            View Activity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
