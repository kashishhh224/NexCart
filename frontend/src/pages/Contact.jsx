import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Optionally reset the form here
    // e.target.reset();
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-foreground mb-2 text-center">Contact Us</h1>
        <p className="text-muted-foreground text-center mb-12">We'd love to hear from you. Please reach out or fill out the form below.</p>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Details */}
          <div className="w-full md:w-1/3 flex flex-col space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 uppercase tracking-wide">Name</h3>
              <p className="text-muted-foreground">Kashish</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 uppercase tracking-wide">Email</h3>
              <a href="mailto:kaashish1210@gmail.com" className="text-rose-500 hover:text-rose-600 transition-colors">kaashish1210@gmail.com</a>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2 uppercase tracking-wide">Address</h3>
              <p className="text-muted-foreground leading-relaxed">Bulandshahr, Uttar Pradesh</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-8 rounded-xl border border-green-200 shadow-sm text-center">
                <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                <p>Your message has been successfully sent. We will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6 bg-white p-8 rounded-xl border border-border shadow-sm" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-rose-200" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-rose-200" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea required className="w-full px-4 py-3 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-rose-200 h-32" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-foreground text-background font-medium rounded-md hover:bg-foreground/90 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
