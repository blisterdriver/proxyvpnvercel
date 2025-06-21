'use client';

import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // ADDED: Import Next.js Image component

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface WordPressPost {
  id: number;
  slug: string;
  title: {
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
    }>;
    'wp:term'?: Array<Array<{
      name: string;
    }>>;
  };
}

const BlogPost = () => {
  // Access the environment variable
  const wordpressApiBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL;

  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug as string;

  const [post, setPost] = useState<WordPressPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleBackToBlog = () => {
    router.push('/blog');
  };

  useEffect(() => {
    if (!slug) {
      setError('No blog post slug provided');
      setIsLoading(false);
      return;
    }

    // Ensure the environment variable is available
    if (!wordpressApiBaseUrl) {
      setError('WordPress API base URL is not configured.');
      setIsLoading(false);
      console.error('Environment variable NEXT_PUBLIC_WORDPRESS_API_BASE_URL is not set.');
      return;
    }

    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Fetching post with slug:', slug); // Debug log

        // CONSTRUCT THE URL USING THE ENVIRONMENT VARIABLE
        const apiUrl = `${wordpressApiBaseUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`;
        console.log('Fetching from URL:', apiUrl); // Debug log

        const response = await fetch(
          apiUrl,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Response status:', response.status); // Debug log

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts = await response.json();
        console.log('Fetched posts:', posts); // Debug log

        if (!posts || posts.length === 0) {
          throw new Error('Post not found');
        }

        setPost(posts[0]);
      } catch (err) {
        console.error('Error fetching post:', err); // Debug log
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, wordpressApiBaseUrl]); // Add wordpressApiBaseUrl to dependency array

  // Calculate reading time based on content length
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get featured image from WordPress featured media
  const getFeaturedImage = (post: WordPressPost) => {
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

    if (featuredMedia) {
      return featuredMedia.source_url;
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cure-navy">
        <Header />
        <div className="min-h-screen bg-cure-navy flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cure-green mx-auto mb-4"></div>
            <h1 className="text-2xl font-orbitron font-bold text-white mb-4">Loading Post...</h1>
            <p className="text-cure-gray-200">Please wait while we fetch the blog post.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cure-navy">
        <Header />
        <div className="min-h-screen bg-cure-navy flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-4xl font-orbitron font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-4">Post Not Found</h2>
            <p className="text-cure-gray-200 mb-8">
              {error || "The blog post you're looking for doesn't exist or may have been moved."}
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleBackToBlog}
                className="bg-gradient-to-r from-cure-green to-cure-blue text-white font-semibold px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              <br />
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="border-cure-gray-300/50 text-cure-gray-100 hover:bg-cure-gray-400/20"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cure-navy">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-cure-navy via-cure-navy to-cure-gray-400/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={handleBackToBlog} className="inline-flex items-center text-cure-blue hover:text-cure-green transition-colors mb-8 font-medium">
            <ArrowLeft className="mr-2  text-center " />
            Back to Blog
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="bg-cure-blue/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {getCategories(post)[0]}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
              <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-cure-gray-200 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post._embedded?.author?.[0]?.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(post.content.rendered)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="border-cure-green/50 text-cure-green hover:bg-cure-green/10 hover:border-cure-green transition-all duration-300 font-medium backdrop-blur-sm text-slate-100 bg-black hover:bg-green-400 hover:text-black">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-cure-blue text-cure-blue hover:bg-cure-blue hover:text-white transition-all duration-300 font-medium bg-stone-900 hover:bg-blue-700">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {getFeaturedImage(post) && (
              <div className="aspect-video bg-cure-gray-400/30 rounded-xl overflow-hidden mb-12 relative">
                <Image
                  src={getFeaturedImage(post)!}
                  alt={post.title.rendered}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <article
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="prose prose-lg max-w-none mx-[60px] text-cure-gray-100 prose-headings:text-white prose-headings:font-orbitron prose-a:text-cure-blue prose-strong:text-white prose-p:text-cure-gray-100 prose-li:text-cure-gray-100 prose-ul:text-cure-gray-100 prose-ol:text-cure-gray-100"
            />

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-cure-green/10 to-cure-blue/10 rounded-xl border border-cure-green/20">
              <div className="text-center">
                <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                  Ready to Dominate Your Games?
                </h3>
                <p className="text-cure-gray-100 mb-6">
                  Join thousands of gamers who are already using CureProxy to get easier lobbies and improve their gaming experience.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-white font-semibold px-8 shadow-lg hover:shadow-cure-green/25 transition-all duration-300">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;