import React from 'react';

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <section className="py-20 md:py-28 bg-rose-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Subscribe now & get 20% off</h2>
          <p className="text-muted-foreground mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-3 sm:gap-0">
            <input 
              type="email" 
              placeholder="Enter your email" 
              required
              className="w-full px-6 py-4 rounded-full sm:rounded-r-none sm:rounded-l-full border border-border focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 transition-all"
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-foreground text-background font-medium rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-foreground/90 transition-colors whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
