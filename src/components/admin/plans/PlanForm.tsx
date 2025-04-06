
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type SubscriptionPlan } from '@/types/api';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  billingCycle: z.enum(['monthly', 'annually']),
  features: z.string().min(5, 'Enter features separated by new lines'),
  isActive: z.boolean().default(true),
});

type PlanFormProps = {
  initialData?: SubscriptionPlan;
  onSuccess: () => void;
  onCancel: () => void;
};

export const PlanForm: React.FC<PlanFormProps> = ({ 
  initialData, 
  onSuccess,
  onCancel 
}) => {
  const isEditing = !!initialData;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description,
      price: initialData.price,
      billingCycle: initialData.billingCycle,
      features: initialData.features.join('\n'),
      isActive: initialData.isActive,
    } : {
      name: '',
      description: '',
      price: 0,
      billingCycle: 'monthly',
      features: '',
      isActive: true,
    },
  });

  const { execute: createPlan, isLoading: isCreating } = useApiRequest(
    api.createPlan,
    {
      successMessage: 'Plan created successfully',
      onSuccess,
    }
  );

  const { execute: updatePlan, isLoading: isUpdating } = useApiRequest(
    initialData ? (data) => api.updatePlan(initialData.id, data) : null as any,
    {
      successMessage: 'Plan updated successfully',
      onSuccess,
    }
  );

  const isSubmitting = isCreating || isUpdating;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Convert features from string to array
    const featuresArray = values.features
      .split('\n')
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
    
    const planData = {
      name: values.name,
      description: values.description,
      price: values.price,
      billingCycle: values.billingCycle,
      features: featuresArray,
      isActive: values.isActive,
    };
    
    if (isEditing) {
      await updatePlan(planData);
    } else {
      await createPlan(planData as any);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Pro Plan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the plan's main benefits" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="billingCycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Cycle</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a billing cycle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter one feature per line" 
                  rows={5}
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Enter each feature on a new line
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Active plans are visible to users
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
