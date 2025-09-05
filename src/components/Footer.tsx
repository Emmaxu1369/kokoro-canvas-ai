import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KokoroLab
            </div>
            <p className="text-sm text-muted-foreground">
              Creation from the Heart
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Services</h4>
            <div className="space-y-2">
              <a href="#help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
              <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="space-y-2">
              <a href="#privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Community</h4>
            <div className="space-y-2">
              <a href="#discord" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Discord
              </a>
              <a href="#twitter" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#github" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 KokoroLab. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary animate-glow" />
            <span>for anime creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;