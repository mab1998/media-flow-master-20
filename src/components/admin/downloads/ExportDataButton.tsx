
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockDownloads } from '@/api/data/adminData';

type ExportDataButtonProps = {
  format?: 'csv' | 'json';
  data?: any[];
  filename?: string;
};

export const ExportDataButton: React.FC<ExportDataButtonProps> = ({ 
  format = 'csv',
  data = mockDownloads,
  filename = 'downloads-export'
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let content: string;
      let mimeType: string;
      
      if (format === 'csv') {
        // Convert data to CSV
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(item => Object.values(item).join(','));
        content = [header, ...rows].join('\n');
        mimeType = 'text/csv';
        filename = `${filename}.csv`;
      } else {
        // JSON format
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `${filename}.json`;
      }
      
      // Create a blob and download it
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Export Successful',
        description: `Data has been exported to ${filename}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'An error occurred while exporting data.',
      });
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={isExporting} variant="outline">
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Export {format.toUpperCase()}
        </>
      )}
    </Button>
  );
};
