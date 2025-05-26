
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Flame } from 'lucide-react';
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

interface TrendingTopicCardProps {
  topic: TrendingTopic;
  onAction: (action: string, topicId: string) => void;
}

const TrendingTopicCard = ({ topic, onAction }: TrendingTopicCardProps) => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    onAction(action, topic.id);
    toast({
      title: "Action completed",
      description: `Topic ${action} successfully`,
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{topic.title}</CardTitle>
          {topic.aiScore > 90 && (
            <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
              <Flame className="h-3 w-3" />
              <span>Hot</span>
            </div>
          )}
        </div>
        <p className="text-blue-600 font-medium">{topic.tag}</p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{topic.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{topic.comments}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share className="h-4 w-4" />
            <span>{topic.shares}</span>
          </div>
          <div className="ml-auto">
            <span className="text-xs">AI Score: {topic.aiScore}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={topic.status === 'featured' ? 'default' : 'outline'}
            onClick={() => handleAction('feature')}
          >
            Feature
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction('hide')}
          >
            Hide
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction('moderate')}
          >
            Moderate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopicCard;
