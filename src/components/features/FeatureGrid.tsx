
import { features } from '@/api/mockData';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
};
