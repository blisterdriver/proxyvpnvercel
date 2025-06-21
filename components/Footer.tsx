'use client'; // Add this at the top to mark it as a Client Component

import { Shield, MessageCircle, Mail, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Updated import
import { Button } from '@/components/ui/button';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionNavigation = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-cure-navy border-t border-cure-gray-300/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
              <Shield className="h-8 w-8 text-cure-green" />
              <span className="text-2xl font-orbitron font-bold gradient-text">
                CureProxy
              </span>
            </div>
            <p className="text-cure-gray-100 mb-6 max-w-md mx-auto md:mx-0">
              The premium gaming VPN that gives you the competitive edge. Get matched into easier lobbies and dominate your favorite games across all platforms.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-white w-full sm:w-auto font-semibold shadow-lg hover:shadow-cure-green/25 transition-all duration-300"
              >
                Start Free Trial
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className="border-cure-gray-300/50 text-cure-gray-100 hover:bg-cure-gray-400/20 hover:border-cure-green w-full sm:w-auto transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Join Discord
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-orbitron font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleSectionNavigation('features')}
                  className="text-cure-gray-100 hover:text-cure-green transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNavigation('pricing')}
                  className="text-cure-gray-100 hover:text-cure-green transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSectionNavigation('games')}
                  className="text-cure-gray-100 hover:text-cure-green transition-colors"
                >
                  Supported Games
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-cure-gray-100 hover:text-cure-green transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#" className="text-cure-gray-100 hover:text-cure-green transition-colors">
                  Setup Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-cure-gray-100 hover:text-cure-green transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-orbitron font-semibold text-white mb-6">
              Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <MessageCircle className="h-5 w-5 text-cure-green mt-0.5" />
                <div>
                  <p className="text-white font-medium">Live Chat</p>
                  <p className="text-cure-gray-100 text-sm">24/7 Available</p>
                </div>
              </div>
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-cure-blue mt-0.5" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-cure-gray-100 text-sm">support@cureproxy.com</p>
                </div>
              </div>
              <div className="flex items-start justify-center md:justify-start space-x-3">
                <Clock className="h-5 w-5 text-cure-purple mt-0.5" />
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p className="text-cure-gray-100 text-sm">Within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cure-gray-300/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 mb-4 md:mb-0">
              <a href="#" className="text-cure-gray-100 hover:text-cure-green transition-colors text-sm whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-cure-gray-100 hover:text-cure-green transition-colors text-sm whitespace-nowrap">
                Terms of Service
              </a>
              <a href="#" className="text-cure-gray-100 hover:text-cure-green transition-colors text-sm whitespace-nowrap">
                Refund Policy
              </a>
            </div>
            <div className="flex items-center justify-center space-x-2 text-cure-gray-100 text-sm">
              <span>© 2024 CureProxy. Made with</span>
              <Heart className="h-4 w-4 text-cure-green" />
              <span>for gamers.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;