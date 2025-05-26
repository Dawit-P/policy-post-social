
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TrendingTopicCard from '@/components/admin/TrendingTopicCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrendingTopic {
  id: string;
  title: string;
  tag: string;
  likes: number;
  comments: number;
  shares: number;
  aiScore: number;
  status: 'featured' | 'active' | 'hidden';
}

interface TrendingManagementProps {
  onLogout: () => void;
}

const TrendingManagement = ({ onLogout }: TrendingManagementProps) => {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('aiScore');

  useEffect(() => {
    // Mock API call for trending topics
    const fetchTrendingTopics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTopics: TrendingTopic[] = [
        {
          id: '1',
          title: 'Presidential Election Updates',
          tag: '#election2025',
          likes: 1234,
          comments: 567,
          shares: 89,
          aiScore: 95,
          status: 'featured'
        },
        {
          id: '2',
          title: 'Climate Policy Debate',
          tag: '#climate',
          likes: 892,
          comments: 234,
          shares: 45,
          aiScore: 87,
          status: 'active'
        },
        {
          id: '3',
          title: 'Healthcare Reform Discussion',
          tag: '#healthcare',
          likes: 756,
          comments: 189,
          shares: 67,
          aiScore: 92,
          status: 'active'
        },
        {
          id: '4',
          title: 'Economic Policy Changes',
          tag: '#economy',
          likes: 543,
          comments: 123,
          shares: 34,
          aiScore: 78,
          status: 'active'
        }
      ];
      
      setTopics(mockTopics);
      setIsLoading(false);
    };

    fetchTrendingTopics();
  }, []);

  const handleTopicAction = (action: string, topicId: string) => {
    console.log(`${action} topic ${topicId}`);
    // In real app, make API call here
  };

  const sortedTopics = [...topics].sort((a, b) => {
    if (sortBy === 'aiScore') return b.aiScore - a.aiScore;
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'comments') return b.comments - a.comments;
    return 0;
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
              <h1 className="text-3xl font-bold text-gray-900">Trending Topics</h1>
              <p className="text-gray-600 mt-2">
                Manage and moderate trending political topics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aiScore">AI Score</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                  <SelectItem value="comments">Most Commented</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                Refresh Data
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTopics.map((topic) => (
                <TrendingTopicCard
                  key={topic.id}
                  topic={topic}
                  onAction={handleTopicAction}
                />
              ))}
            </div>
          )}

          {!isLoading && topics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No trending topics found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingManagement;
