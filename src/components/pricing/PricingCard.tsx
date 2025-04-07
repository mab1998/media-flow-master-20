
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PricingPlan } from '@/types/api';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

type PricingCardProps = {
  plan: PricingPlan;
};

export const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleChoosePlan = async () => {
    if (plan.name === 'Free') {
      // For free plan, just navigate to dashboard or signup
      if (isAuthenticated) {
        navigate('/dashboard');
        toast({
          title: "Free Plan Selected",
          description: "You're now on the Free plan."
        });
      } else {
        navigate('/signup');
      }
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (!isAuthenticated) {
        // Store the selected plan ID in session storage and redirect to signup
        sessionStorage.setItem('selectedPlan', plan.id);
        navigate('/signup');
        return;
      }
      
      // Create checkout session with Stripe
      const response = await api.createCheckoutSession(plan.id);
      if (response.success && response.data.url) {
        // In a real implementation, this would redirect to Stripe's checkout page
        // For this mock, we'll redirect to our mock success page
        window.location.href = response.data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "There was a problem initiating checkout. Please try again."
      });
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
        </Button>
      </div>
    </div>
  );
};
