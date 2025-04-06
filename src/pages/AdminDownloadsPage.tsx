
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, DownloadCloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useApiRequest } from '@/api/hooks/useApiRequest';
import { api } from '@/api/mockApi';
import { Pagination } from '@/components/ui/pagination';
import { DownloadDetailsDialog } from '@/components/admin/downloads/DownloadDetailsDialog';
import { ExportDataButton } from '@/components/admin/downloads/ExportDataButton';

const AdminDownloadsPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { execute: fetchDownloads, isLoading, data } = useApiRequest(
    api.getDownloads,
    {
      errorMessage: 'Failed to load downloads',
    }
  );
  
  useEffect(() => {
    fetchDownloads({ page });
  }, [page]);
  
  const handleSearch = () => {
    if (!data || !data.downloads) return;
    
    setHasSearched(true);
    
    if (!searchTerm.trim()) {
      setFilteredDownloads(data.downloads);
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    const results = data.downloads.filter(download => 
      download.userName.toLowerCase().includes(lowercaseSearch) || 
      download.videoTitle.toLowerCase().includes(lowercaseSearch) ||
      download.platform.toLowerCase().includes(lowercaseSearch)
    );
    
    setFilteredDownloads(results);
  };
  
  const handleRefresh = () => {
    fetchDownloads({ page });
    setSearchTerm('');
    setHasSearched(false);
  };
  
  const downloadsToDisplay = hasSearched ? filteredDownloads : (data?.downloads || []);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Downloads</h1>
          <div className="flex gap-2">
            <ExportDataButton format="csv" filename="omnivideo-downloads" />
            <ExportDataButton format="json" filename="omnivideo-downloads" />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Download History</CardTitle>
            <CardDescription>View and manage all video downloads across the platform.</CardDescription>
            
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search downloads..."
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
              <div className="flex justify-center py-8">Loading downloads...</div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Video Title</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {downloadsToDisplay.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8">
                            {hasSearched ? 'No downloads match your search criteria.' : 'No downloads found.'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        downloadsToDisplay.map((download) => (
                          <TableRow key={download.id}>
                            <TableCell className="font-medium">{download.userName}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={download.videoTitle}>
                              {download.videoTitle}
                            </TableCell>
                            <TableCell>{download.platform}</TableCell>
                            <TableCell>{download.quality}</TableCell>
                            <TableCell>{download.fileSize}</TableCell>
                            <TableCell>{format(new Date(download.downloadDate), 'PPp')}</TableCell>
                            <TableCell>
                              <Badge variant={download.status === 'completed' ? 'default' : 'destructive'}>
                                {download.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DownloadDetailsDialog downloadId={download.id} />
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

export default AdminDownloadsPage;
