import { BodyTypeClassifier } from '@/components/BodyTypeClassifier';
import heroImage from '@/assets/fitness-hero.jpg';
import { Dumbbell, Zap, Target, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/80" />
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Dumbbell className="h-12 w-12 text-primary" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Fit AI
            </h1>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Discover Your Body Type
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered body type classification with personalized fitness recommendations. 
            Get your complete fitness profile in seconds.
          </p>
          
          <div className="flex items-center justify-center gap-8 pt-6">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="h-5 w-5" />
              <span className="font-medium">AI Powered</span>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <Target className="h-5 w-5" />
              <span className="font-medium">Accurate</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Personalized</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <BodyTypeClassifier />
      </section>
    </div>
  );
};

export default Index;
