'use client';

import { ArrowLeft, Calendar, User, ArrowRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface WordPressPost {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  author: number;
  categories: number[];
  featured_media: number;
  _embedded?: {
    author: Array<{
      name: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
          thumbnail?: {
            source_url: string;
          };
          large?: {
            source_url: string;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      name: string;
    }>>;
  };
}

const Blog = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    // Force scroll to top when component mounts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBackToHome = () => {
    router.push('/');
    // Ensure we scroll to top when going back to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // Fetch WordPress posts
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://blog.kitemporiam.com/wp-json/wp/v2/posts?_embed&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate reading time based on content length - FIXED TYPO
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Extract categories from embedded data
  const getCategories = (post: WordPressPost) => {
    if (post._embedded?.['wp:term']?.[0]) {
      return post._embedded['wp:term'][0].map(term => term.name);
    }
    return ['Uncategorized'];
  };

  // Get unique categories from all posts
  const categories = ['All', ...Array.from(new Set(
    posts.flatMap(post => getCategories(post))
  ))];

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => getCategories(post).includes(selectedCategory));

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get first image from post content - UPDATED
  const getThumbnailImage = (post: WordPressPost) => {
    // First try to get the first image from post content
    const firstImageFromContent = getFirstImageFromContent(post.content.rendered);
    if (firstImageFromContent) {
      return firstImageFromContent;
    }
    
    // Fallback to featured media if no image in content
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    if (featuredMedia) {
      // Try to get images in order of preference: medium, large, thumbnail, then full size
      const sizes = featuredMedia.media_details?.sizes;
      const mediumImage = sizes?.medium?.source_url;
      const largeImage = sizes?.large?.source_url;
      const thumbnailImage = sizes?.thumbnail?.source_url;
      const fullImage = featuredMedia.source_url;
      
      return mediumImage || largeImage || thumbnailImage || fullImage;
    }
    
    return null;
  };

  // Extract first image from post content
  const getFirstImageFromContent = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const firstImg = doc.querySelector('img');
    
    if (firstImg) {
      const src = firstImg.getAttribute('src');
      // Handle both absolute and relative URLs
      if (src) {
        if (src.startsWith('http')) {
          return src;
        } else if (src.startsWith('/')) {
          // Assuming WordPress blog domain for relative URLs
          return `https://blog.kitemporiam.com${src}`;
        }
      }
    }
    
    return null;
  };

  // Get alt text for image
  const getImageAltText = (post: WordPressPost) => {
    // Try to get alt text from first image in content
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    const firstImg = doc.querySelector('img');
    const altFromContent = firstImg?.getAttribute('alt');
    
    if (altFromContent) {
      return altFromContent;
    }
    
    // Fallback to featured media alt text
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    return featuredMedia?.alt_text || post.title.rendered || 'Blog post image';
  };

  // Handle post click
  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  if (error) {
    console.error('Error fetching WordPress posts:', error);
  }

  return (
    <div className="min-h-screen bg-cure-navy">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-cure-navy via-cure-navy to-cure-gray-400/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button onClick={handleBackToHome} className="inline-flex items-center text-cure-blue hover:text-cure-green transition-colors mb-6 font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </button>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-orbitron font-bold mb-6">
              <span className="gradient-text">Gaming</span>{' '}
              <span className="text-white">Blog</span>
            </h1>
            <p className="text-xl text-cure-gray-100 max-w-3xl mx-auto">
              Stay ahead of the competition with our latest gaming strategies, tips, and insights.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={category === selectedCategory 
                  ? "bg-gradient-to-r from-cure-green to-cure-blue text-white font-medium shadow-lg" 
                  : "border-cure-gray-300/50 text-cure-gray-100 hover:bg-cure-gray-400/20 hover:border-cure-green/50 transition-all duration-300 font-medium"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center text-cure-gray-100">
              <p>Loading posts...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center text-cure-gray-100">
              <p>Failed to load posts. Please try again later.</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!isLoading && !error && (
            <>
              {currentPosts.length === 0 ? (
                <div className="text-center text-cure-gray-100">
                  <p>No posts found for the selected category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => {
                    const thumbnailUrl = getThumbnailImage(post);
                    const altText = getImageAltText(post);
                    
                    return (
                      <article 
                        key={post.id}
                        onClick={() => handlePostClick(post.slug)}
                        className="bg-cure-gray-400/20 rounded-xl overflow-hidden border border-cure-gray-300/20 hover:border-cure-green/40 transition-all duration-300 group backdrop-blur-sm cursor-pointer"
                      >
                        <div className="aspect-video bg-cure-gray-400/30 relative overflow-hidden">
                          {thumbnailUrl ? (
                            <img 
                              src={thumbnailUrl} 
                              alt={altText}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full bg-gray-600 flex items-center justify-center">
                                      <div class="text-gray-400 text-sm">Image not available</div>
                                    </div>
                                  `;
                                }
                              }}
                              onLoad={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.opacity = '1';
                              }}
                              style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                              <div className="text-gray-400 text-sm">No Image Available</div>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <span className="bg-cure-blue/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              {getCategories(post)[0]}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-orbitron font-semibold text-white mb-3 group-hover:text-cure-green transition-colors">
                            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          </h3>
                          
                          <div 
                            className="text-cure-gray-100 text-sm mb-4 leading-relaxed line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                          />
                          
                          <div className="flex items-center justify-between text-cure-gray-200 text-xs mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{post._embedded?.author?.[0]?.name || 'Unknown'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDate(post.date)}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{calculateReadingTime(post.content.rendered)}</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostClick(post.slug);
                            }}
                            className="w-full bg-cure-blue border-cure-gray-300/50 text-cure-gray-100 hover:bg-cure-blue hover:text-white hover:border-cure-blue group transition-all duration-300"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination className="justify-center">
                    <PaginationContent className="bg-cure-gray-400/20 backdrop-blur-sm rounded-lg p-2 border border-cure-gray-300/20">
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={`text-cure-gray-100 hover:text-white hover:bg-cure-blue/30 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => setCurrentPage(page)}
                                isActive={currentPage === page}
                                className={`cursor-pointer text-cure-gray-100 hover:text-white hover:bg-cure-blue/30 ${
                                  currentPage === page 
                                    ? 'bg-cure-blue text-white border-cure-blue' 
                                    : ''
                                }`}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis className="text-cure-gray-100" />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={`text-cure-gray-100 hover:text-white hover:bg-cure-blue/30 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;