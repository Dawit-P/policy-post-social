
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Eye, Flame } from 'lucide-react';

interface TrendingTopic {
  id: number;
  title: string;
  tag: string;
  likes: number;
  comments: number;
  views: number;
  aiScore: number;
  isHot: boolean;
}

interface TrendingTopicCardProps {
  topic: TrendingTopic;
  onFeature: (id: number) => void;
  onHide: (id: number) => void;
  onModerate: (id: number) => void;
}

const TrendingTopicCard = ({ topic, onFeature, onHide, onModerate }: TrendingTopicCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{topic.title}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              {topic.tag}
            </Badge>
          </div>
          {topic.isHot && (
            <Badge variant="destructive" className="bg-orange-500">
              <Flame className="h-3 w-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Engagement Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            {topic.likes}
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {topic.comments}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {topic.views}
          </div>
        </div>

        {/* AI Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">AI Score</span>
            <span className="font-medium">{topic.aiScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                topic.aiScore > 80 ? 'bg-green-500' : 
                topic.aiScore > 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${topic.aiScore}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onFeature(topic.id)}
          >
            Feature
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onHide(topic.id)}
          >
            Hide
          </Button>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => onModerate(topic.id)}
          >
            Moderate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopicCard;
