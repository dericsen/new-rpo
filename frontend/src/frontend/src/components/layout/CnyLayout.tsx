import { ReactNode } from 'react';
import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

interface CnyLayoutProps {
  children: ReactNode;
}

export default function CnyLayout({ children }: CnyLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cny-red/5 via-background to-cny-gold/5">
      <div className="absolute inset-0 bg-[url('/assets/generated/ui-lantern.dim_256x256.png')] opacity-[0.02] bg-repeat bg-[length:200px]" />
      
      <header className="relative border-b border-cny-gold/20 bg-background/80 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/ui-lantern.dim_256x256.png" 
                alt="Lantern" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-cny-red">CNY Hidden Objects</h1>
                <p className="text-xs text-muted-foreground">Find the treasures!</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {children}
      </main>

      <footer className="relative border-t border-cny-gold/20 bg-background/80 backdrop-blur-sm mt-12">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © 2026. Built with <Heart className="w-4 h-4 text-cny-red fill-cny-red" /> using{' '}
              <a 
                href="https://caffeine.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <SiCaffeine className="w-4 h-4" />
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
