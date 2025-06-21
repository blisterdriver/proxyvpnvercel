'use client';

import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleHomeNavigation = () => {
    if (pathname !== '/') {
      router.push('/');
    }
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleSectionNavigation = (sectionId: string) => {
    if (pathname !== '/') {
      router.push('/');
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-cure-navy/95 backdrop-blur-md border-b border-cure-gray-300/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={handleHomeNavigation} className="flex items-center space-x-2">
            <div className="relative">
              <Shield className="h-8 w-8 text-cure-green animate-glow" />
              <div className="absolute inset-0 h-8 w-8 text-cure-green opacity-20 animate-ping" />
            </div>
            <span className="text-xl font-orbitron font-bold gradient-text">
              CureProxy
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleSectionNavigation('features')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium">
              Features
            </button>
            <button onClick={() => handleSectionNavigation('pricing')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium">
              Pricing
            </button>
            <button onClick={() => handleSectionNavigation('games')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium">
              Supported Games
            </button>
            <button onClick={() => handleSectionNavigation('contact')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium">
              Contact
            </button>
            <Link href="/blog" className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium">
              Blog
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-cure-green/50 text-cure-green hover:-bottom-0 hover:text-black border-cure-green transition-all duration-300 font-medium px-6 backdrop-blur-sm text-slate-100 bg-black hover:bg-green-400">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-cure-navy font-semibold px-6 shadow-lg hover:shadow-cure-green/25 transition-all duration-300">
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-cure-gray-400/20 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-cure-gray-100" /> : <Menu className="h-6 w-6 text-cure-gray-100" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cure-gray-300/30 bg-cure-navy/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => handleSectionNavigation('features')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium text-left">
                Features
              </button>
              <button onClick={() => handleSectionNavigation('pricing')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium text-left">
                Pricing
              </button>
              <button onClick={() => handleSectionNavigation('games')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium text-left">
                Supported Games
              </button>
              <button onClick={() => handleSectionNavigation('contact')} className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium text-left">
                Contact
              </button>
              <Link href="/blog" className="text-cure-gray-100 hover:text-cure-green transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-cure-gray-300/30">
                <Button variant="outline" size="sm" className="border-cure-green/50 text-cure-green hover:bg-cure-green/10 hover:text-cure-green hover:border-cure-green transition-all duration-300 font-medium backdrop-blur-sm">
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-cure-navy font-semibold shadow-lg hover:shadow-cure-green/25 transition-all duration-300">
                  Start Free Trial
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;