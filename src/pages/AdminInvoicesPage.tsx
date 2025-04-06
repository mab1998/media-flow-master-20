
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { Pagination } from '@/components/ui/pagination';
import { InvoiceDetailsDialog } from '@/components/admin/invoices/InvoiceDetailsDialog';
import { ExportDataButton } from '@/components/admin/downloads/ExportDataButton';
import { mockInvoices } from '@/api/data/adminData';

const AdminInvoicesPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { execute: fetchInvoices, isLoading, data } = useApiRequest(
    api.getInvoices,
    {
      errorMessage: 'Failed to load invoices',
    }
  );
  
  useEffect(() => {
    fetchInvoices({ page });
  }, [page]);
  
  const handleSearch = () => {
    if (!data || !data.invoices) return;
    
    setHasSearched(true);
    
    if (!searchTerm.trim()) {
      setFilteredInvoices(data.invoices);
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    const results = data.invoices.filter(invoice => 
      invoice.userName.toLowerCase().includes(lowercaseSearch) || 
      invoice.userEmail.toLowerCase().includes(lowercaseSearch) ||
      invoice.planName.toLowerCase().includes(lowercaseSearch) ||
      invoice.id.toLowerCase().includes(lowercaseSearch)
    );
    
    setFilteredInvoices(results);
  };
  
  const handleRefresh = () => {
    fetchInvoices({ page });
    setSearchTerm('');
    setHasSearched(false);
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const invoicesToDisplay = hasSearched ? filteredInvoices : (data?.invoices || []);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <div className="flex gap-2">
            <ExportDataButton 
              format="csv" 
              filename="omnivideo-invoices" 
              data={mockInvoices} 
            />
            <ExportDataButton 
              format="json" 
              filename="omnivideo-invoices" 
              data={mockInvoices} 
            />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>View and manage all payment invoices.</CardDescription>
            
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
              {hasSearched && (
                <Button variant="outline" onClick={handleRefresh}>
                  Reset
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">Loading invoices...</div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoicesToDisplay.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            {hasSearched ? 'No invoices match your search criteria.' : 'No invoices found.'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        invoicesToDisplay.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>
                              <div>{invoice.userName}</div>
                              <div className="text-sm text-muted-foreground">{invoice.userEmail}</div>
                            </TableCell>
                            <TableCell>{invoice.planName}</TableCell>
                            <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                            <TableCell>{format(new Date(invoice.createdAt), 'PP')}</TableCell>
                            <TableCell className="capitalize">{invoice.paymentMethod.replace('_', ' ')}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(invoice.status)}>
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <InvoiceDetailsDialog invoiceId={invoice.id} />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {data && !hasSearched && (
                  <Pagination 
                    currentPage={page}
                    totalPages={data.totalPages || 1}
                    onPageChange={setPage}
                    className="mt-4"
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminInvoicesPage;
