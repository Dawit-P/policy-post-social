
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface TrendingTopic {
  id?: string;
  title: string;
  tag: string;
  likes: number;
  comments: number;
  shares: number;
  aiScore: number;
  status: 'featured' | 'active' | 'hidden';
}

interface TrendingTopicFormProps {
  topic?: TrendingTopic;
  onSubmit: (topic: TrendingTopic) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TrendingTopicForm = ({ topic, onSubmit, onCancel, isLoading }: TrendingTopicFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<TrendingTopic>({
    title: '',
    tag: '',
    likes: 0,
    comments: 0,
    shares: 0,
    aiScore: 50,
    status: 'active',
    ...topic
  });

  useEffect(() => {
    if (topic) {
      setFormData(topic);
    }
  }, [topic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.tag) {
      toast({
        title: "Validation Error",
        description: "Title and tag are required",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof TrendingTopic, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter topic title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tag">Tag</Label>
        <Input
          id="tag"
          value={formData.tag}
          onChange={(e) => handleChange('tag', e.target.value)}
          placeholder="Enter hashtag (e.g., #election2025)"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="likes">Likes</Label>
          <Input
            id="likes"
            type="number"
            value={formData.likes}
            onChange={(e) => handleChange('likes', parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">Comments</Label>
          <Input
            id="comments"
            type="number"
            value={formData.comments}
            onChange={(e) => handleChange('comments', parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shares">Shares</Label>
          <Input
            id="shares"
            type="number"
            value={formData.shares}
            onChange={(e) => handleChange('shares', parseInt(e.target.value) || 0)}
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="aiScore">AI Score (0-100)</Label>
        <Input
          id="aiScore"
          type="number"
          value={formData.aiScore}
          onChange={(e) => handleChange('aiScore', parseInt(e.target.value) || 0)}
          min="0"
          max="100"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : topic ? 'Update Topic' : 'Create Topic'}
        </Button>
      </div>
    </form>
  );
};

export default TrendingTopicForm;
