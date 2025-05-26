
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id?: string;
  title: string;
  author: string;
  content?: string;
  status: 'visible' | 'hidden' | 'flagged';
  createdAt?: string;
}

interface PostFormProps {
  post?: Post;
  onSubmit: (post: Post) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PostForm = ({ post, onSubmit, onCancel, isLoading }: PostFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Post>({
    title: '',
    author: '',
    content: '',
    status: 'visible',
    ...post
  });

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author) {
      toast({
        title: "Validation Error",
        description: "Title and author are required",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (field: keyof Post, value: string) => {
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
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => handleChange('author', e.target.value)}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content || ''}
          onChange={(e) => handleChange('content', e.target.value)}
          placeholder="Enter post content"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visible">Visible</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
