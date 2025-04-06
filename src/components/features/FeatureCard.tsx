
import React from 'react';
import { type Feature } from '@/types/api';
import * as Icons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

type FeatureCardProps = {
  feature: Feature;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Dynamically get the icon component
  // Use type assertion and check if the icon exists in the Lucide icons
  let IconComponent: React.ElementType = HelpCircle;
  
  if (feature.icon in Icons) {
    IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ElementType;
  }
  
  return (
    <div className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 card-hover">
      <div className="bg-primary/10 p-3 rounded-md w-fit mb-4">
        <IconComponent className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  );
};
