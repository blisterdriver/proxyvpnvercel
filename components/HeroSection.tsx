import { ArrowRight, Play, Gamepad2, Monitor, Smartphone, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 bg-stone-950">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-cure-gray-400/50 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-cure-green/20">
            <Trophy className="h-4 w-4 text-cure-green" />
            <span className="text-sm text-cure-gray-100 font-medium">
              #1 Gaming VPN for Competitive Players
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-orbitron font-bold mb-6 leading-tight">
            <span className="gradient-text">Dominate</span>{' '}
            <span className="text-white">Every Match</span>
            <br />
            <span className="text-white">with</span>{' '}
            <span className="gradient-text">CureProxy</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-cure-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get matched into easier lobbies and crush your competition with our premium gaming VPN service. 
            <span className="text-cure-green font-medium"> Works on all platforms.</span>
          </p>

          {/* Platform Icons */}
          <div className="flex items-center justify-center space-x-6 mb-10">
            <div className="flex items-center space-x-2 text-cure-gray-100">
              <Gamepad2 className="h-6 w-6 text-cure-blue" />
              <span className="text-sm font-medium">Console</span>
            </div>
            <div className="flex items-center space-x-2 text-cure-gray-100">
              <Monitor className="h-6 w-6 text-cure-purple" />
              <span className="text-sm font-medium">PC</span>
            </div>
            <div className="flex items-center space-x-2 text-cure-gray-100">
              <Smartphone className="h-6 w-6 text-cure-green" />
              <span className="text-sm font-medium">Mobile</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button size="lg" className="bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-white font-medium px-8 py-4 text-lg glow-box animate-glow group">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-cure-blue text-cure-blue hover:bg-cure-blue hover:text-white px-8 py-4 text-lg group bg-stone-900 hover:bg-blue-700 ">
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-cure-gray-100">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-cure-green rounded-full animate-pulse" />
              <span className="text-sm">30-Second Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-cure-green rounded-full animate-pulse" />
              <span className="text-sm">Zero Lag Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-cure-green rounded-full animate-pulse" />
              <span className="text-sm">30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cure-green rounded-full animate-float opacity-30" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cure-blue rounded-full animate-float opacity-40" style={{
      animationDelay: '1s'
    }} />
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-cure-purple rounded-full animate-float opacity-50" style={{
      animationDelay: '2s'
    }} />
      <div className="absolute bottom-60 right-10 w-5 h-5 bg-cure-green rounded-full animate-float opacity-20" style={{
      animationDelay: '0.5s'
    }} />
    </section>;
};
export default HeroSection;