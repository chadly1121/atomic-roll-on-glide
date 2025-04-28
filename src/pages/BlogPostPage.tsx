
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';
import { useToast } from '@/components/ui/use-toast';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState(blogPosts.find(post => post.id === Number(id)));
  const { toast } = useToast();
  
  useEffect(() => {
    if (!post) {
      toast({
        title: "Blog Post Not Found",
        description: "Sorry, we couldn't find the blog post you're looking for.",
        variant: "destructive",
      });
    } else {
      // Scroll to top when post loads
      window.scrollTo(0, 0);
    }
  }, [post, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection="blog" />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {post ? (
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-atomic-turquoise mb-6 hover:text-atomic-orange transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Blog
              </Link>
              
              <div className="prose prose-lg max-w-none">
                <div className="mb-4 flex items-center text-sm text-gray-500 space-x-4">
                  <span>{post.date}</span>
                  <span className="px-2 py-1 rounded-full bg-atomic-turquoise/10 text-atomic-turquoise">
                    {post.category}
                  </span>
                </div>
                
                <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                
                <div className="rounded-xl overflow-hidden mb-8">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <p className="text-lg mb-4">
                  {post.excerpt}
                </p>
                
                {/* Full blog post content - This would normally come from a CMS */}
                <div className="mt-8">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna. Nulla facilisi. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna.
                  </p>
                  <p className="mt-4">
                    Nulla facilisi. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna. 
                  </p>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Key Considerations</h2>
                  <p>
                    Nulla facilisi. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nisi consectetur purus, eget porttitor nisl nisl sit amet magna.
                  </p>
                  <ul className="list-disc pl-6 mt-4">
                    <li className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li className="mb-2">Nullam euismod, nisi vel consectetur interdum</li>
                    <li className="mb-2">Nisl nisi consectetur purus, eget porttitor nisl</li>
                    <li>Nulla facilisi</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold mb-6">Related Posts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter(relatedPost => relatedPost.id !== post.id)
                    .slice(0, 2)
                    .map(relatedPost => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                        <div className="flex items-start space-x-4">
                          <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold group-hover:text-atomic-turquoise transition-colors">{relatedPost.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold">Blog Post Not Found</h2>
              <p className="mt-4">The post you're looking for doesn't exist or has been removed.</p>
              <Link 
                to="/blog" 
                className="mt-8 inline-block atomic-button-secondary"
              >
                <span className="relative z-10">Return to Blog</span>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
