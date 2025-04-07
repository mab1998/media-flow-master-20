
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApiMode } from '@/contexts/ApiModeContext';
import { Database, Cloud } from 'lucide-react';

export const ApiModeToggle = () => {
  const { apiMode, toggleApiMode } = useApiMode();

  return (
    <div className="flex items-center gap-2">
      <Database className={`h-4 w-4 ${apiMode === 'mock' ? 'text-primary' : 'text-muted-foreground'}`} />
      <Switch 
        checked={apiMode === 'real'} 
        onCheckedChange={toggleApiMode} 
        id="api-mode-toggle"
      />
      <Label htmlFor="api-mode-toggle" className="text-sm cursor-pointer">
        {apiMode === 'mock' ? 'Mock API' : 'Real API'}
      </Label>
      <Cloud className={`h-4 w-4 ${apiMode === 'real' ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
};
