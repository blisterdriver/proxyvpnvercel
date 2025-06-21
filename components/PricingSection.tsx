
import { Check, Star} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const plans = [
    {
      name: "Free Trial",
      price: "Free",
      period: "3 days",
      description: "Try CureProxy risk-free",
      features: [
        "3 days completely free",
        "No credit card required",
        "All features included",
        "All platforms supported",
        "Cancel anytime"
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "border-cure-gray-300"
    },
    {
      name: "Monthly",
      price: "$9.99",
      period: "per month",
      description: "Perfect for casual gamers",
      features: [
        "Unlimited usage",
        "All server locations",
        "Priority support",
        "All platforms",
        "30-day money back guarantee"
      ],
      cta: "Get Started",
      popular: false,
      color: "border-cure-blue"
    },
    {
      name: "Quarterly",
      price: "$24.99",
      period: "3 months",
      originalPrice: "$29.97",
      description: "Best value for serious gamers",
      features: [
        "Save 17% vs monthly",
        "All monthly features",
        "Priority customer support",
        "Advanced analytics",
        "Early access to new features"
      ],
      cta: "Most Popular",
      popular: true,
      color: "border-cure-green"
    },
    {
      name: "Annual",
      price: "$79.99",
      period: "12 months",
      originalPrice: "$119.88",
      description: "Maximum savings for pros",
      features: [
        "Save 33% vs monthly",
        "All quarterly features",
        "VIP support channel",
        "Custom server access",
        "Gaming consultation call"
      ],
      cta: "Best Deal",
      popular: false,
      color: "border-cure-purple"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-cure-gray-400/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-orbitron font-bold mb-6">
            <span className="text-white">Choose Your</span>{' '}
            <span className="gradient-text">Gaming Edge</span>
          </h2>
          <p className="text-xl text-cure-gray-100 max-w-3xl mx-auto">
            Start with our free trial, then choose the plan that fits your gaming style. All plans include our 30-day money-back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-cure-gray-400/20 rounded-xl border-2 ${plan.color} transition-all duration-300 hover:scale-105 hover:shadow-2xl ${plan.popular ? 'glow-box' : ''} flex flex-col h-full`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cure-green to-cure-blue text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-1 whitespace-nowrap">
                    <Star className="h-4 w-4 flex-shrink-0" />
                    <span className="font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-orbitron font-semibold text-white mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-cure-gray-100 text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl font-orbitron font-bold text-white">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-lg text-cure-gray-200 line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-cure-gray-200 text-sm font-medium whitespace-nowrap">
                      {plan.period}
                    </p>
                  </div>
                </div>

                {/* Features - flex-1 to take remaining space */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-cure-green flex-shrink-0 mt-0.5" />
                      <span className="text-cure-gray-100 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button - always at bottom */}
                <Button 
                  className={`w-full mt-auto ${plan.popular 
                    ? 'bg-gradient-to-r from-cure-green to-cure-blue hover:from-cure-green/90 hover:to-cure-blue/90 text-white font-semibold' 
                    : 'bg-cure-gray-400/30 text-white hover:bg-cure-gray-400/50 border border-cure-gray-300 font-medium'
                  } h-12`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-cure-gray-100">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-cure-green" />
              <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-cure-green" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-cure-green" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
