
import { Link } from 'react-router-dom';
import { DownloadCloud, Heart } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <DownloadCloud className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Omni<span className="text-primary">Video</span></span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Download videos from all your favorite platforms quickly and easily.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-foreground font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@omnivideo.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@omnivideo.com
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} OmniVideo. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.5 7.5-5.5.7-.8 1.3-1.7 1.5-2.5z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-muted-foreground text-sm flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
          <span>by OmniVideo Team</span>
        </div>
      </div>
    </footer>
  );
};
