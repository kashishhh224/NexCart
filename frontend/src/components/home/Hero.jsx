import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-rose-50/50 w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[500px] md:min-h-[600px] py-12 md:py-0">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center pr-0 md:pr-12 lg:pr-24 mb-12 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-foreground/80"></span>
              <p className="font-semibold text-sm tracking-widest text-foreground/80 uppercase">Our Bestsellers</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 text-foreground prata-regular">
              Latest Arrivals
            </h1>
            <Link 
              to="#collection" 
              className="inline-flex items-center gap-2 text-foreground font-semibold pb-1 border-b-2 border-foreground hover:text-rose-500 hover:border-rose-500 transition-colors"
            >
              Shop Now <span className="text-xl">→</span>
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-[4/5] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" 
                alt="Fashion Model" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
