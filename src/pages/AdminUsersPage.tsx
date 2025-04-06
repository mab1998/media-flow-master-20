
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { api } from '@/api/mockApi';
import { format } from 'date-fns';
import { Search, UserPlus, Download, Eye, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DeleteUserDialog } from '@/components/admin/users/DeleteUserDialog';
import { UserDetailsDialog } from '@/components/admin/users/UserDetailsDialog';
import { AddUserDialog } from '@/components/admin/users/AddUserDialog';
import { toast } from '@/hooks/use-toast';

const AdminUsersPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-users', page, limit],
    queryFn: () => api.getUsers({ page, limit })
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!data || newPage <= data.totalPages)) {
      setPage(newPage);
    }
  };

  const handleDownloadUserData = (userId: string, userName: string) => {
    // In a real app, this would trigger an API call to generate a file
    // Here we'll mock it by creating a JSON file with user data
    api.getUserById(userId).then(userData => {
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(userData, null, 2)
      )}`;
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      downloadAnchorNode.setAttribute('download', `user-${userName.toLowerCase().replace(/\s+/g, '-')}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      toast({
        title: "Downloaded user data",
        description: `User data for ${userName} has been downloaded.`,
      });
    });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">View and manage user accounts</p>
        </div>
        <AddUserDialog onSuccess={refetch} />
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>A list of all user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading users...</div>
          ) : isError ? (
            <div className="text-center py-4 text-destructive">Error loading users</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.users.length > 0 ? (
                    data.users
                      .filter(user => 
                        searchTerm === '' || 
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.plan === 'Free' ? 'secondary' : 'default'}>
                              {user.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.downloadCount}</TableCell>
                          <TableCell>{format(new Date(user.registrationDate), 'MMM d, yyyy')}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <UserDetailsDialog userId={user.id} />
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDownloadUserData(user.id, user.name)}
                                title="Download user data"
                              >
                                <FileDown className="h-4 w-4" />
                                <span className="sr-only">Download user data</span>
                              </Button>
                              
                              <Button variant="ghost" size="icon" title="View downloads">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">View downloads</span>
                              </Button>
                              
                              <DeleteUserDialog 
                                userId={user.id} 
                                userName={user.name}
                                onSuccess={refetch}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {data && data.totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(page - 1)}
                          className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(pageNum => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            isActive={pageNum === page}
                            onClick={() => handlePageChange(pageNum)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(page + 1)}
                          className={page === data.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminUsersPage;
