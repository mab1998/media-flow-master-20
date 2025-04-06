
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PricingPlan } from '@/types/api';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type PricingCardProps = {
  plan: PricingPlan;
};

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleChoosePlan = () => {
    if (isAuthenticated) {
      // If already logged in, show a message about the plan change
      console.log(`Choosing plan: ${plan.name}`);
      // In a real app, this would navigate to a checkout page
    } else {
      // If not logged in, redirect to signup page
      navigate('/signup');
    }
  };

  return (
    <div 
      className={cn(
        "bg-card border rounded-xl overflow-hidden flex flex-col",
        plan.isPopular 
          ? "border-primary shadow-lg shadow-primary/10 relative" 
          : "border-border/50"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
          Popular
        </div>
      )}

      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <p className="text-muted-foreground mt-1">{plan.description}</p>
        
        <div className="mt-4 mb-6">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-1">{plan.billingPeriod}</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <Button 
          onClick={handleChoosePlan} 
          className={cn(
            "w-full",
            plan.isPopular ? "" : "bg-accent text-accent-foreground hover:bg-accent/90"
          )}
          variant={plan.isPopular ? "default" : "outline"}
        >
          {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
        </Button>
      </div>
    </div>
  );
};
