
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlanForm } from '@/components/admin/plans/PlanForm';
import { api } from '@/api/mockApi';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { type SubscriptionPlan } from '@/types/api';
import { format } from 'date-fns';

const AdminPlansPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | undefined>(undefined);
  const [deleteDialogPlan, setDeleteDialogPlan] = useState<SubscriptionPlan | undefined>(undefined);

  const { data: plans, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-plans'],
    queryFn: api.getSubscriptionPlans
  });

  const { execute: deletePlan } = useApiRequest(
    api.deletePlan,
    {
      successMessage: 'Plan deleted successfully',
      onSuccess: () => {
        refetch();
        setDeleteDialogPlan(undefined);
      }
    }
  );

  const handleCreatePlan = () => {
    setSelectedPlan(undefined);
    setIsDialogOpen(true);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleDeletePlan = (plan: SubscriptionPlan) => {
    setDeleteDialogPlan(plan);
  };

  const handleFormSuccess = () => {
    refetch();
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteDialogPlan) {
      await deletePlan(deleteDialogPlan.id);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground">Manage your subscription plans</p>
        </div>
        <Button onClick={handleCreatePlan}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plans</CardTitle>
          <CardDescription>
            A list of all your subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading plans...</div>
          ) : isError ? (
            <div className="text-center py-4 text-destructive">Error loading plans</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans && plans.length > 0 ? (
                  plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.description}</div>
                      </TableCell>
                      <TableCell>${plan.price.toFixed(2)}</TableCell>
                      <TableCell className="capitalize">{plan.billingCycle}</TableCell>
                      <TableCell>
                        <Badge variant={plan.isActive ? "default" : "secondary"}>
                          {plan.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(plan.updatedAt), 'MMM d, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditPlan(plan)}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeletePlan(plan)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No plans found. Create your first plan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Plan Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPlan ? `Edit Plan: ${selectedPlan.name}` : 'Create New Plan'}
            </DialogTitle>
          </DialogHeader>
          <PlanForm 
            initialData={selectedPlan} 
            onSuccess={handleFormSuccess}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={!!deleteDialogPlan} 
        onOpenChange={(open) => !open && setDeleteDialogPlan(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{deleteDialogPlan?.name}" plan? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminPlansPage;
