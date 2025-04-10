
import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, User, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Treino em Sintonia" }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell size={24} className="text-fitness-blue" />
            <span className="font-bold text-lg text-fitness-blue">{title}</span>
          </Link>
        </div>

        {isMobile ? (
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link to="/" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link to="/workouts" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Treinos
                  </Link>
                  <Link to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link to="/workouts" className="text-sm font-medium transition-colors hover:text-primary">
              Treinos
            </Link>
            <Link to="/profile" className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-muted-foreground">
              <User size={20} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
