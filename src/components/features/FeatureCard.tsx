
import React from 'react';
import { type Feature } from '@/types/api';
import * as Icons from 'lucide-react';

type IconName = keyof typeof Icons;

type FeatureCardProps = {
  feature: Feature;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = Icons[feature.icon as IconName] || Icons.Video;

  return (
    <div className="bg-card border border-border/50 rounded-lg p-6 hover:border-primary/50 transition-all duration-300 card-hover">
      <div className="bg-primary/10 p-3 rounded-md w-fit mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </div>
  );
};
