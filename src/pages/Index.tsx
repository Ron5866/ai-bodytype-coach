import { BodyTypeClassifier } from '@/components/BodyTypeClassifier';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 text-center space-y-8 max-w-6xl mx-auto px-6">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
            💡 AI-Powered Body Analysis
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            Discover Your{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Body Type
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get personalized fitness recommendations based on advanced AI analysis. 
            Classify your body type and unlock your fitness potential.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg"
            >
              Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400">95%</div>
              <div className="text-white/80 font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">10K+</div>
              <div className="text-white/80 font-medium">Users Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">3</div>
              <div className="text-white/80 font-medium">Body Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <BodyTypeClassifier />
      </section>
    </div>
  );
};

export default Index;
