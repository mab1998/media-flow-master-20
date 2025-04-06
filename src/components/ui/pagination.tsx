
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(1);
    
    if (totalPages <= maxVisiblePages) {
      // If we have 5 or fewer pages, show all of them
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // If current page is close to beginning
      if (currentPage <= 3) {
        pages.push(2, 3);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
      // If current page is close to end
      else if (currentPage >= totalPages - 2) {
        pages.push('ellipsis');
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      }
      // If current page is in the middle
      else {
        pages.push('ellipsis');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      
      {pageNumbers.map((page, index) => {
        if (page === 'ellipsis') {
          return (
            <Button
              key={`ellipsis-${index}`}
              variant="outline"
              size="icon"
              disabled
              className="cursor-default"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          );
        }
        
        return (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page as number)}
            className="w-9 h-9 p-0"
          >
            {page}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
};
