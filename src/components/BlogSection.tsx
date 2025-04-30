
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { PenLine } from 'lucide-react';

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-accent/30">
      <div className="atomic-starburst w-60 h-60 -top-10 left-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Blog</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get inspired with the latest painting trends, tips, and insights from our experienced team.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <div key={post.id} className="rounded-xl overflow-hidden bg-white shadow-md group hover:shadow-xl transition-shadow relative">
              <Link 
                to={`/blog/edit/${post.id}`}
                className="absolute right-2 top-2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                title="Edit blog"
              >
                <PenLine size={16} className="text-atomic-turquoise" />
              </Link>
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-2 space-x-4">
                  <span>{post.date}</span>
                  <span className="px-2 py-1 rounded-full bg-atomic-turquoise/10 text-atomic-turquoise">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-atomic-turquoise transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="atomic-button-secondary"
          >
            <span className="relative z-10">View All Blog Posts</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
