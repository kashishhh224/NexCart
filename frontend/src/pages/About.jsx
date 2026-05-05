import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-foreground mb-6">About Us</h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          NexCart is more than just an e-commerce platform. We are a team of passionate individuals dedicated to bringing you the latest trends and highest quality products right to your doorstep.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our mission is to provide an unparalleled shopping experience with top-notch customer service, easy returns, and a seamless online interface. Thank you for choosing NexCart.
        </p>
      </div>
    </div>
  );
};

export default About;
