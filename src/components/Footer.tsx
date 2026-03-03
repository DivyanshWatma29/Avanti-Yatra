import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const Footer = () => {
  const { user, dashboardPath, dashboardLabel } = useUserRole();

  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-devotional bg-clip-text text-transparent mb-3">
              DarshanEase
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Smart Temple & Pilgrimage System
            </p>
            <p className="text-sm text-muted-foreground">
              Connecting Faith, Technology, and the Heart of India
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/temples" className="text-muted-foreground hover:text-primary transition-colors">
                  Temples
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              {user && (
                <li>
                  <Link to={dashboardPath} className="text-muted-foreground hover:text-primary transition-colors">
                    {dashboardLabel}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@darshanease.in" className="hover:text-primary transition-colors">
                  info@darshanease.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>1800-MP-YATRA</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 DarshanEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
