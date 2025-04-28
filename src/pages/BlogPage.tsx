
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogData';

const BlogPage = () => {
  // Group blog posts by category
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection="blog" />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="section-heading">Our Blog</h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Get inspired with the latest painting trends, tips, and insights from our experienced team.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.slice(0, 2).map(post => (
                  <div key={post.id} className="rounded-xl overflow-hidden bg-white shadow-md group hover:shadow-xl transition-shadow">
                    <div className="h-60 overflow-hidden">
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
            </div>
            
            {categories.map(category => (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts
                    .filter(post => post.category === category)
                    .map(post => (
                      <div key={post.id} className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <span>{post.date}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-1 hover:text-atomic-turquoise transition-colors">
                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                          </h3>
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-sm inline-flex items-center text-atomic-turquoise hover:text-atomic-orange font-medium transition-colors mt-2"
                          >
                            Read Article
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
