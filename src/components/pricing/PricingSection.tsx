
import { pricingPlans } from '@/api/mockData';
import { PricingCard } from './PricingCard';

export const PricingSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {pricingPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};
