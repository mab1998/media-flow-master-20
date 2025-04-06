
import { pricingPlans } from '@/api/mockData';
import { Check, X } from 'lucide-react';

export const PricingTable = () => {
  // Features to compare
  const featuresToCompare = [
    { name: 'Max Video Quality', values: ['720p', '1080p', '4K'] },
    { name: 'Daily Downloads', values: ['5 videos', '30 videos', 'Unlimited'] },
    { name: 'Supported Platforms', values: ['YouTube, Facebook', 'All platforms', 'All platforms'] },
    { name: 'Batch Downloads', values: [false, false, true] },
    { name: 'No Ads', values: [false, true, true] },
    { name: 'Early Access Features', values: [false, false, true] },
    { name: 'Customer Support', values: ['Basic', 'Priority', 'Premium'] },
  ];

  return (
    <div className="w-full mt-16 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-border/50">Feature</th>
            {pricingPlans.map((plan) => (
              <th 
                key={plan.id} 
                className="text-center p-4 border-b border-border/50 min-w-[150px]"
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featuresToCompare.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
              <td className="text-left p-4 border-b border-border/50 font-medium">
                {feature.name}
              </td>
              {feature.values.map((value, planIndex) => (
                <td 
                  key={planIndex} 
                  className="text-center p-4 border-b border-border/50"
                >
                  {typeof value === 'boolean' ? (
                    value ? (
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mx-auto" />
                    )
                  ) : (
                    <span>{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
