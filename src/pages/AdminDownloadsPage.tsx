
import React from 'react';
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
import { format, parseISO } from 'date-fns';
import { Download, Search } from 'lucide-react';
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

const AdminDownloadsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-downloads', page, limit],
    queryFn: () => api.getDownloads({ page, limit })
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && (!data || newPage <= data.totalPages)) {
      setPage(newPage);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Downloads</h1>
          <p className="text-muted-foreground">View all downloads across the platform</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search downloads..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
          <CardDescription>A list of all recent downloads across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading downloads...</div>
          ) : isError ? (
            <div className="text-center py-4 text-destructive">Error loading downloads</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Video</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.downloads.length > 0 ? (
                    data.downloads
                      .filter(download => 
                        searchTerm === '' || 
                        download.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        download.videoTitle.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((download) => (
                        <TableRow key={download.id}>
                          <TableCell>{download.userName}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{download.videoTitle}</TableCell>
                          <TableCell>{download.platform}</TableCell>
                          <TableCell>{download.quality}</TableCell>
                          <TableCell>{download.fileSize}</TableCell>
                          <TableCell>{format(parseISO(download.downloadDate), 'MMM d, yyyy, HH:mm')}</TableCell>
                          <TableCell>
                            <Badge variant={download.status === 'completed' ? 'success' : 'destructive'}>
                              {download.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center">
                        No downloads found
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

export default AdminDownloadsPage;
