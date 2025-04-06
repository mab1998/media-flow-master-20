
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AddUserDialog } from '@/components/admin/users/AddUserDialog';
import { UserDetailsDialog } from '@/components/admin/users/UserDetailsDialog';
import { DeleteUserDialog } from '@/components/admin/users/DeleteUserDialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { Pagination } from '@/components/ui/pagination';
import { DownloadDetailsDialog } from '@/components/admin/downloads/DownloadDetailsDialog';
import { mockDownloads } from '@/api/data/adminData';

const AdminUsersPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { execute: fetchUsers, isLoading, data } = useApiRequest(
    api.getUsers,
    {
      errorMessage: 'Failed to load users',
    }
  );
  
  useEffect(() => {
    fetchUsers({ page });
  }, [page]);
  
  const handleSearch = () => {
    if (!data || !data.users) return;
    
    setHasSearched(true);
    
    if (!searchTerm.trim()) {
      setFilteredUsers(data.users);
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    const results = data.users.filter(user => 
      user.name.toLowerCase().includes(lowercaseSearch) || 
      user.email.toLowerCase().includes(lowercaseSearch) ||
      user.plan.toLowerCase().includes(lowercaseSearch)
    );
    
    setFilteredUsers(results);
  };
  
  const handleRefresh = () => {
    fetchUsers({ page });
    setSearchTerm('');
    setHasSearched(false);
  };
  
  const usersToDisplay = hasSearched ? filteredUsers : (data?.users || []);
  
  // Find a relevant download ID for each user (for the "View Download" button demo)
  const getUserDownloadId = (userId: string) => {
    const userDownload = mockDownloads.find(download => download.userId === userId);
    return userDownload ? userDownload.id : mockDownloads[0].id; // Fallback to first download if none found
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <AddUserDialog onSuccess={handleRefresh} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage all registered users in the system.</CardDescription>
            
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
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
              <div className="flex justify-center py-8">Loading users...</div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Downloads</TableHead>
                        <TableHead>Registered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersToDisplay.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            {hasSearched ? 'No users match your search criteria.' : 'No users found.'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        usersToDisplay.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.plan === 'Free' ? 'secondary' : 'default'}>
                                {user.plan}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.downloadCount}</TableCell>
                            <TableCell>
                              {format(new Date(user.registrationDate), 'PP')}
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                              <UserDetailsDialog userId={user.id} />
                              <DownloadDetailsDialog downloadId={getUserDownloadId(user.id)} />
                              <DeleteUserDialog 
                                userId={user.id} 
                                userName={user.name}
                                onSuccess={handleRefresh}
                              />
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

export default AdminUsersPage;
