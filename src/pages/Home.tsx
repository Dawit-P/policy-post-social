
import { useState } from "react";
import NavBar from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TrendingUp, Plus } from "lucide-react";

interface HomeProps {
  onLogout: () => void;
}

const Home = ({ onLogout }: HomeProps) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Healthcare Reform: A Bipartisan Approach",
      body: "We need to work together to ensure affordable healthcare for all Americans. This is not a partisan issue, but a human one. Let's find common ground and move forward with practical solutions.",
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
        party: "Democratic"
      },
      likes: 142,
      comments: [
        {
          id: 1,
          author: {
            name: "Mike Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          },
          content: "Great points! We definitely need more collaboration on this issue.",
          timestamp: "2 hours ago"
        }
      ],
      tags: ["healthcare", "bipartisan", "reform"],
      timestamp: "4 hours ago",
      isLiked: false
    },
    {
      id: 2,
      title: "Infrastructure Investment: Building for the Future",
      body: "Our infrastructure is crumbling. We need immediate action to rebuild our roads, bridges, and digital networks. This investment will create jobs and position America for economic growth in the 21st century.",
      author: {
        name: "Robert Williams",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        party: "Republican"
      },
      likes: 89,
      comments: [],
      tags: ["infrastructure", "economy", "jobs"],
      timestamp: "6 hours ago",
      isLiked: true
    }
  ]);

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", tags: "" });

  const trendingTopics = [
    { tag: "election2025", posts: 1247 },
    { tag: "healthcare", posts: 892 },
    { tag: "climate", posts: 756 },
    { tag: "economy", posts: 634 },
    { tag: "education", posts: 521 }
  ];

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked
            }
          : post
      )
    );
  };

  const handleComment = async (postId: number, content: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const newComment = {
      id: Date.now(),
      author: {
        name: user.name,
        avatar: user.avatar
      },
      content,
      timestamp: "Just now"
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const post = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body,
      author: {
        name: user.name,
        avatar: user.avatar,
        party: "Independent" // Default party
      },
      likes: 0,
      comments: [],
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      timestamp: "Just now",
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", body: "", tags: "" });
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="p-6">
                {!showCreatePost ? (
                  <Button
                    onClick={() => setShowCreatePost(true)}
                    className="w-full justify-start text-left"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Share your political thoughts...
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.body}
                      onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                      rows={4}
                    />
                    <Input
                      placeholder="Tags (comma separated)..."
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleCreatePost}>Post</Button>
                      <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      #{topic.tag}
                    </Badge>
                    <span className="text-sm text-gray-500">{topic.posts} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Debates Active</span>
                  <span className="font-semibold">28</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
