import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Left: Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-extrabold tracking-tighter prata-regular text-foreground">NexCart</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              NexCart is your ultimate destination for modern fashion. We provide high-quality products that fit your lifestyle and keep you ahead of the trends.
            </p>
          </div>

          {/* Middle: Company Links */}
          <div>
            <h3 className="text-foreground font-semibold uppercase tracking-widest mb-6">Company</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-rose-500 transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-rose-500 transition-colors text-sm">About us</Link></li>
              <li><Link to="/delivery" className="text-muted-foreground hover:text-rose-500 transition-colors text-sm">Delivery</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-rose-500 transition-colors text-sm">Privacy policy</Link></li>
            </ul>
          </div>

          {/* Right: Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold uppercase tracking-widest mb-6">Get in touch</h3>
            <ul className="flex flex-col space-y-4">
              <li>
                <a href="mailto:kaashish1210@gmail.com" className="text-muted-foreground hover:text-rose-500 transition-colors text-sm">
                  kaashish1210@gmail.com
                </a>
              </li>
              <li className="text-muted-foreground text-sm">Bulandshahr, Uttar Pradesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} @ NexCart.com - All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
