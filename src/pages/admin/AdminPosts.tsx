
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AdminPostsProps {
  onLogout: () => void;
}

const AdminPosts = ({ onLogout }: AdminPostsProps) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Discussion on Healthcare Reform",
          author: "John Smith",
          status: "Visible",
          createdAt: "2024-01-15",
          flagCount: 0
        },
        {
          id: 2,
          title: "Election Campaign Analysis",
          author: "Sarah Johnson",
          status: "Flagged",
          createdAt: "2024-01-14",
          flagCount: 3
        },
        {
          id: 3,
          title: "Climate Policy Debate",
          author: "Mike Davis",
          status: "Hidden",
          createdAt: "2024-01-13",
          flagCount: 5
        },
        {
          id: 4,
          title: "Economic Recovery Strategies",
          author: "Emily Chen",
          status: "Visible",
          createdAt: "2024-01-12",
          flagCount: 1
        },
        {
          id: 5,
          title: "Social Security Updates",
          author: "Robert Wilson",
          status: "Visible",
          createdAt: "2024-01-11",
          flagCount: 0
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      Visible: "default",
      Flagged: "secondary",
      Hidden: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const handleApprove = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "Visible", flagCount: 0 } : post
    ));
    toast({
      title: "Post Approved",
      description: "Post has been approved and is now visible.",
    });
  };

  const handleHide = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: "Hidden" } : post
    ));
    toast({
      title: "Post Hidden",
      description: "Post has been hidden from public view.",
    });
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "Post has been permanently deleted.",
      variant: "destructive"
    });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Post Moderation</h1>
            <p className="text-gray-600 mt-2">
              Review and moderate user posts across the platform.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search posts by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-lg border overflow-hidden">
            {loading ? (
              <div className="p-8 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>{post.createdAt}</TableCell>
                      <TableCell>
                        {post.flagCount > 0 && (
                          <Badge variant="destructive">{post.flagCount}</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(post.id)}
                            disabled={post.status === "Visible"}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleHide(post.id)}
                            disabled={post.status === "Hidden"}
                          >
                            Hide
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPosts;
