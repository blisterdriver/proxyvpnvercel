import { Target, Zap, Globe, Shield, Users, TrendingUp } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Easier Lobbies, More Wins",
      description: "Advanced SBMM bypass technology gets you matched with less skilled opponents for higher win rates.",
      color: "text-cure-green"
    },
    {
      icon: Zap,
      title: "Zero Lag Guarantee",
      description: "Optimized servers ensure no impact on ping or connection quality while gaming.",
      color: "text-cure-blue"
    },
    {
      icon: Globe,
      title: "Global Server Network",
      description: "Strategic server locations worldwide for optimal matchmaking manipulation.",
      color: "text-cure-purple"
    },
    {
      icon: Shield,
      title: "30-Second Setup",
      description: "Quick and easy setup process for all gaming platforms - no technical knowledge required.",
      color: "text-cure-green"
    },
    {
      icon: Users,
      title: "Multi-Platform Support",
      description: "Works seamlessly on PlayStation, Xbox, PC, and mobile devices with one account.",
      color: "text-cure-blue"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your improved K/D ratio and win rate with detailed gaming statistics.",
      color: "text-cure-purple"
    }
  ];

  return (
    <section id="features" className="py-20 bg-cure-gray-400/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-6">
            <span className="gradient-text">Dominate</span>{' '}
            <span className="text-white">with Advanced Features</span>
          </h2>
          <p className="text-xl text-cure-gray-100 max-w-3xl mx-auto">
            Our cutting-edge technology gives you the competitive edge you need to succeed in today's gaming landscape. {/* FIXED: "today's" -> "today's" */}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-cure-gray-400/30 backdrop-blur-sm rounded-xl p-8 border border-cure-gray-300/20 hover:border-cure-green/30 transition-all duration-300 group glow-box"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r from-cure-navy to-cure-gray-400 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>

              <h3 className="text-xl font-orbitron font-semibold text-white mb-4 group-hover:text-cure-green transition-colors">
                {feature.title}
              </h3>

              <p className="text-cure-gray-100 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;