
import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import TrendingTopicCard from '@/components/admin/TrendingTopicCard';
import { useToast } from '@/hooks/use-toast';

interface AdminTrendingProps {
  onLogout: () => void;
}

const AdminTrending = ({ onLogout }: AdminTrendingProps) => {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setTopics([
        {
          id: 1,
          title: "2025 Election Campaign Updates",
          tag: "#election2025",
          likes: 1205,
          comments: 89,
          views: 5420,
          aiScore: 92,
          isHot: true
        },
        {
          id: 2,
          title: "Healthcare Reform Discussions",
          tag: "#healthcare",
          likes: 856,
          comments: 156,
          views: 3210,
          aiScore: 78,
          isHot: false
        },
        {
          id: 3,
          title: "Climate Policy Debates",
          tag: "#climate",
          likes: 642,
          comments: 94,
          views: 2890,
          aiScore: 85,
          isHot: true
        },
        {
          id: 4,
          title: "Economic Recovery Plans",
          tag: "#economy",
          likes: 534,
          comments: 67,
          views: 2156,
          aiScore: 71,
          isHot: false
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFeature = (id: number) => {
    toast({
      title: "Topic Featured",
      description: "Topic has been featured on the homepage.",
    });
  };

  const handleHide = (id: number) => {
    setTopics(topics.filter(topic => topic.id !== id));
    toast({
      title: "Topic Hidden",
      description: "Topic has been hidden from trending.",
    });
  };

  const handleModerate = (id: number) => {
    toast({
      title: "Moderation Panel",
      description: "Opening moderation panel for this topic.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Trending Topics</h1>
            <p className="text-gray-600 mt-2">
              Manage and moderate trending political discussions.
            </p>
          </div>

          {/* Topics Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <TrendingTopicCard
                  key={topic.id}
                  topic={topic}
                  onFeature={handleFeature}
                  onHide={handleHide}
                  onModerate={handleModerate}
                />
              ))}
            </div>
          )}

          {topics.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No trending topics found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminTrending;
