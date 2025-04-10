
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, User, Menu, X, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Treino em Sintonia" }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: <Dumbbell size={18} /> },
    { name: "Social", path: "/social", icon: <MessageCircle size={18} /> },
    { name: "Receitas", path: "/recipes", icon: <UtensilsCrossed size={18} /> },
    { name: "Perfil", path: "/profile/me", icon: <User size={18} /> }
  ];
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container px-4 flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell size={24} className="text-fitness-blue" />
            <span className="font-bold text-lg text-fitness-blue">{title}</span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-md z-40">
                <nav className="container px-4 py-2 flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link 
                      key={item.path}
                      to={item.path} 
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 rounded-md transition-colors",
                        isActive(item.path)
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-secondary"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path) 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
