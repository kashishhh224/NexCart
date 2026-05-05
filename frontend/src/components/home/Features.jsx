import React from 'react';
import { RefreshCw, CheckCircle, HeadphonesIcon } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <RefreshCw className="w-8 h-8 mb-4 text-rose-500" />,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy."
    },
    {
      icon: <CheckCircle className="w-8 h-8 mb-4 text-rose-500" />,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy."
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 mb-4 text-rose-500" />,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support."
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:-translate-y-2">
              {feature.icon}
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
