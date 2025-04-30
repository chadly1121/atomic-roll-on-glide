
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts, BlogPost } from '../data/blogData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const BlogEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== undefined;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize with empty blog or existing blog if editing
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    image: '',
    category: 'Design Trends'
  });

  // Categories from existing blogs
  const categories = [...new Set(blogPosts.map(post => post.category))];

  useEffect(() => {
    // If editing, populate form with existing blog data
    if (isEditing && id) {
      const existingPost = blogPosts.find(post => post.id === Number(id));
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          date: existingPost.date,
          image: existingPost.image,
          category: existingPost.category
        });
      } else {
        toast({
          title: "Blog not found",
          description: "The blog post you're trying to edit doesn't exist.",
          variant: "destructive"
        });
        navigate('/blog');
      }
    }
  }, [id, isEditing, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.image.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate current date for new posts
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    // Show the blog data that would be added (in a real app, this would go to a database)
    console.log("Blog post data:", isEditing ? { id: Number(id), ...formData } : { 
      id: Math.max(...blogPosts.map(post => post.id)) + 1,
      ...formData,
      date: isEditing ? formData.date : currentDate
    });
    
    toast({
      title: isEditing ? "Blog updated" : "Blog created",
      description: `Your blog "${formData.title}" has been ${isEditing ? 'updated' : 'created'} successfully.`,
    });
    
    // In a real implementation with state management/backend, we'd save the data here
    // For now, we'll just navigate back to the blog page
    navigate('/blog');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection="blog" />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="section-heading mb-8">{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                  Excerpt/Summary *
                </label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief summary of your blog"
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image URL *
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
                {formData.image && (
                  <div className="mt-2 rounded-md overflow-hidden h-40">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="New Category">Add New Category</option>
                </select>
                {formData.category === 'New Category' && (
                  <Input
                    className="mt-2"
                    name="category"
                    placeholder="Enter new category name"
                    onChange={handleInputChange}
                    required
                  />
                )}
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/blog')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogEditorPage;
