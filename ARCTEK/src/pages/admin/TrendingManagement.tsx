
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TrendingTopicCard from '@/components/admin/TrendingTopicCard';
import AdminModal from '@/components/admin/AdminModal';
import TrendingTopicForm from '@/components/admin/TrendingTopicForm';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('aiScore');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TrendingTopic | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    if (action === 'edit') {
      const topicToEdit = topics.find(topic => topic.id === topicId);
      setEditingTopic(topicToEdit);
      setIsModalOpen(true);
      return;
    }

    if (action === 'delete') {
      if (confirm('Are you sure you want to delete this trending topic?')) {
        setTopics(prevTopics => prevTopics.filter(topic => topic.id !== topicId));
        toast({
          title: "Topic deleted",
          description: "Trending topic has been successfully deleted",
        });
      }
      return;
    }
    
    // Update local state for demo
    setTopics(prevTopics => 
      prevTopics.map(topic => {
        if (topic.id === topicId) {
          if (action === 'feature') return { ...topic, status: 'featured' as const };
          if (action === 'hide') return { ...topic, status: 'hidden' as const };
          if (action === 'activate') return { ...topic, status: 'active' as const };
        }
        return topic;
      })
    );

    toast({
      title: "Action completed",
      description: `Topic ${action} successfully`,
    });
  };

  const handleCreateTopic = () => {
    setEditingTopic(undefined);
    setIsModalOpen(true);
  };

  const handleSubmitTopic = async (topicData: TrendingTopic) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingTopic) {
      // Update existing topic
      setTopics(prevTopics =>
        prevTopics.map(topic =>
          topic.id === editingTopic.id ? { ...topicData, id: editingTopic.id } : topic
        )
      );
      toast({
        title: "Topic updated",
        description: "Trending topic has been successfully updated",
      });
    } else {
      // Create new topic
      const newTopic = {
        ...topicData,
        id: Date.now().toString()
      };
      setTopics(prevTopics => [...prevTopics, newTopic]);
      toast({
        title: "Topic created",
        description: "New trending topic has been successfully created",
      });
    }
    
    setIsSubmitting(false);
    setIsModalOpen(false);
    setEditingTopic(undefined);
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
              
              <Button onClick={handleCreateTopic} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Topic</span>
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

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTopic(undefined);
        }}
        title={editingTopic ? 'Edit Trending Topic' : 'Create New Trending Topic'}
        description={editingTopic ? 'Update trending topic information' : 'Add a new trending topic'}
      >
        <TrendingTopicForm
          topic={editingTopic}
          onSubmit={handleSubmitTopic}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTopic(undefined);
          }}
          isLoading={isSubmitting}
        />
      </AdminModal>
    </div>
  );
};

export default TrendingManagement;
