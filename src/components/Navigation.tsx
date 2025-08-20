import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const Navigation = () => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FitClassify</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Body Type Test
            </a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Results
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
              🌙
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;