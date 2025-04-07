
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react';
import { SocialMediaConfig } from '@/types/api';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { configService } from '@/api/services/configService';

export const Footer: React.FC = () => {
  const { execute, data: configData } = useApiRequest(() => configService.getSiteConfig(), {
    errorMessage: 'Failed to load site configuration',
  });

  React.useEffect(() => {
    execute();
  }, [execute]);

  const socialMedia = configData?.data?.socialMedia || [];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5" />;
      case 'LinkedIn':
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">OmniVideo</h3>
            <p className="text-muted-foreground text-sm">
              Download videos from multiple platforms easily and securely.
            </p>

            {/* Social Media Icons */}
            <div className="flex mt-4 space-x-3">
              {socialMedia.filter(sm => sm.isActive).map((sm: SocialMediaConfig) => (
                <a 
                  key={sm.id} 
                  href={sm.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {getSocialIcon(sm.platform)}
                  <span className="sr-only">{sm.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-primary transition-colors">
                  All Features
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

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
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
                <Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OmniVideo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
