import { BodyTypeClassifier } from '@/components/BodyTypeClassifier';
import heroImage from '@/assets/fitness-hero.jpg';
import { Dumbbell, Zap, Target, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
        
        <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full">
              <Dumbbell className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
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
