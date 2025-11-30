import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dashboardPath, dashboardLabel } = useUserRole();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Temples", path: "/temples" },
    { name: "Events", path: "/events" },
    { name: "Crowd Prediction", path: "/crowd-prediction" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-devotional bg-clip-text text-transparent">
              Avanti Yatra
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild variant="default" size="sm" className="gap-2">
                <Link to={dashboardPath}>
                  <User className="h-4 w-4" />
                  {dashboardLabel}
                </Link>
              </Button>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link to="/auth">Sign In / Sign Up</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 pt-2">
              {user ? (
                <Button asChild variant="default" size="sm" className="w-full gap-2">
                  <Link to={dashboardPath}>
                    <User className="h-4 w-4" />
                    {dashboardLabel}
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="default" size="sm" className="w-full">
                  <Link to="/auth">Sign In / Sign Up</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
