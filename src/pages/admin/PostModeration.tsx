
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminModal from '@/components/admin/AdminModal';
import PostForm from '@/components/admin/PostForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  author: string;
  content?: string;
  status: 'visible' | 'hidden' | 'flagged';
  createdAt: string;
}

interface PostModerationProps {
  onLogout: () => void;
}

const PostModeration = ({ onLogout }: PostModerationProps) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          content: 'Latest polling data shows significant shifts in voter preferences...',
          status: 'visible',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'Controversial Statement About Policy',
          author: 'Jane Smith',
          content: 'This post contains controversial political opinions...',
          status: 'flagged',
          createdAt: '2024-01-14'
        },
        {
          id: '3',
          title: 'Climate Change Discussion Thread',
          author: 'Mike Johnson',
          content: 'An in-depth analysis of climate policy proposals...',
          status: 'visible',
          createdAt: '2024-01-13'
        },
        {
          id: '4',
          title: 'Inappropriate Political Comment',
          author: 'Sarah Wilson',
          content: 'This post was hidden due to inappropriate content...',
          status: 'hidden',
          createdAt: '2024-01-12'
        },
        {
          id: '5',
          title: 'Healthcare Policy Analysis',
          author: 'David Brown',
          content: 'A comprehensive review of proposed healthcare reforms...',
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
    
    if (action === 'edit') {
      const postToEdit = posts.find(post => post.id === postId);
      setEditingPost(postToEdit);
      setIsModalOpen(true);
      return;
    }

    if (action === 'delete') {
      if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        toast({
          title: "Post deleted",
          description: "Post has been successfully deleted",
        });
      }
      return;
    }
    
    // Update local state for demo
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          if (action === 'approve') return { ...post, status: 'visible' as const };
          if (action === 'hide') return { ...post, status: 'hidden' as const };
          if (action === 'flag') return { ...post, status: 'flagged' as const };
        }
        return post;
      })
    );

    toast({
      title: "Action completed",
      description: `Post ${action} successfully`,
    });
  };

  const handleCreatePost = () => {
    setEditingPost(undefined);
    setIsModalOpen(true);
  };

  const handleSubmitPost = async (postData: Post) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingPost) {
      // Update existing post
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === editingPost.id ? { ...postData, id: editingPost.id } : post
        )
      );
      toast({
        title: "Post updated",
        description: "Post has been successfully updated",
      });
    } else {
      // Create new post
      const newPost = {
        ...postData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPosts(prevPosts => [...prevPosts, newPost]);
      toast({
        title: "Post created",
        description: "New post has been successfully created",
      });
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingPost(undefined);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      visible: 'default',
      hidden: 'secondary',
      flagged: 'destructive'
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:block">
        <AdminSidebar onLogout={onLogout} />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post Moderation</h1>
              <p className="text-gray-600 mt-2">
                Review and moderate user posts across the platform
              </p>
            </div>
            <Button onClick={handleCreatePost} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Post</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="visible">Visible</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-96 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-xs truncate">{post.title}</div>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>{post.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePostAction('edit', post.id)}
                            className="p-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          
                          {post.status !== 'visible' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePostAction('approve', post.id)}
                              className="p-2"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          
                          {post.status !== 'hidden' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePostAction('hide', post.id)}
                              className="p-2"
                            >
                              <EyeOff className="h-3 w-3" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePostAction('delete', post.id)}
                            className="p-2 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(undefined);
        }}
        title={editingPost ? 'Edit Post' : 'Create New Post'}
        description={editingPost ? 'Update post information' : 'Add a new post to the platform'}
      >
        <PostForm
          post={editingPost}
          onSubmit={handleSubmitPost}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingPost(undefined);
          }}
          isLoading={isSubmitting}
        />
      </AdminModal>
    </div>
  );
};

export default PostModeration;
