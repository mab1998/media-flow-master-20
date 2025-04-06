
import React from 'react';
import { type Feature } from '@/types/api';
import * as Icons from 'lucide-react';

type FeatureCardProps = {
  feature: Feature;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Dynamically get the icon component
  // This approach avoids TypeScript errors by ensuring we're using a valid component
  const IconComponent = Icons[feature.icon as keyof typeof Icons] || Icons.HelpCircle;

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
