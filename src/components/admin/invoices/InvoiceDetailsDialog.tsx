
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Download, Printer } from 'lucide-react';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { type Invoice } from '@/types/api';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type InvoiceDetailsDialogProps = {
  invoiceId: string;
};

export const InvoiceDetailsDialog: React.FC<InvoiceDetailsDialogProps> = ({ invoiceId }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // For a real API, this would fetch the specific invoice by ID
  const { execute: fetchInvoice, isLoading, data: invoice } = useApiRequest<Invoice, [string]>(
    (id) => {
      // Mock implementation to simulate API call
      return api.getInvoiceById(id);
    },
    {
      errorMessage: 'Failed to load invoice details',
    }
  );
  
  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      fetchInvoice(invoiceId);
    }
  };

  const handleExportInvoice = () => {
    if (!invoice) return;
    
    // Mock export functionality
    // In a real app, this would generate a PDF or another format
    toast({
      title: 'Invoice Exported',
      description: `Invoice ${invoice.id} has been exported.`,
    });
  };
  
  const handlePrintInvoice = () => {
    if (!invoice) return;
    
    // Mock print functionality
    // In a real app, this would trigger the print dialog
    toast({
      title: 'Print Requested',
      description: 'Preparing invoice for printing...',
    });
    
    // Simulate print action after a short delay
    setTimeout(() => {
      window.print();
    }, 500);
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="View invoice details">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View invoice details</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>
            Detailed information about this invoice.
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="py-6 text-center">Loading invoice details...</div>
        ) : !invoice ? (
          <div className="py-6 text-center text-destructive">Invoice not found</div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">Invoice #{invoice.id}</h3>
                <p className="text-muted-foreground text-sm">
                  {format(new Date(invoice.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
              <Badge variant={getStatusBadgeVariant(invoice.status)}>
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Billed To</h4>
                <p className="font-medium">{invoice.userName}</p>
                <p className="text-sm">{invoice.userEmail}</p>
                <p className="text-sm text-muted-foreground">User ID: {invoice.userId}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">Payment Method</h4>
                <p className="font-medium capitalize">{invoice.paymentMethod.replace('_', ' ')}</p>
                <p className="text-sm text-muted-foreground">Transaction ID: {invoice.transactionId}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Details</h4>
              <div className="border rounded-md overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] p-3 bg-muted/50">
                  <div className="font-medium">{invoice.planName} Plan</div>
                  <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <div className="text-right">
                  <div className="flex items-center justify-between gap-8">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-8 mt-1">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between gap-8 mt-2 text-lg">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${invoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handlePrintInvoice}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleExportInvoice}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
