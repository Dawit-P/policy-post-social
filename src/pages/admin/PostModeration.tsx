
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ModerationTable from '@/components/admin/ModerationTable';

interface Post {
  id: string;
  title: string;
  author: string;
  status: 'visible' | 'hidden' | 'flagged';
  createdAt: string;
}

interface PostModerationProps {
  onLogout: () => void;
}

const PostModeration = ({ onLogout }: PostModerationProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call for posts
    const fetchPosts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockPosts: Post[] = [
        {
          id: '1',
          title: 'Breaking: New Election Poll Results',
          author: 'John Doe',
          status: 'visible',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Controversial Statement About Policy',
          author: 'Jane Smith',
          status: 'flagged',
          createdAt: '2024-01-14'
        },
        {
          id: '3',
          title: 'Climate Change Discussion Thread',
          author: 'Mike Johnson',
          status: 'visible',
          createdAt: '2024-01-13'
        },
        {
          id: '4',
          title: 'Inappropriate Political Comment',
          author: 'Sarah Wilson',
          status: 'hidden',
          createdAt: '2024-01-12'
        },
        {
          id: '5',
          title: 'Healthcare Policy Analysis',
          author: 'David Brown',
          status: 'visible',
          createdAt: '2024-01-11'
        }
      ];
      
      setPosts(mockPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const handlePostAction = (action: string, postId: string) => {
    console.log(`${action} post ${postId}`);
    // In real app, make API call here
    
    // Update local state for demo
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          if (action === 'approve') return { ...post, status: 'visible' as const };
          if (action === 'hide') return { ...post, status: 'hidden' as const };
          if (action === 'delete') return null;
        }
        return post;
      }).filter(Boolean) as Post[]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <AdminSidebar onLogout={onLogout} />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Post Moderation</h1>
            <p className="text-gray-600 mt-2">
              Review and moderate user posts across the platform
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-96 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ) : (
            <ModerationTable posts={posts} onAction={handlePostAction} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModeration;
