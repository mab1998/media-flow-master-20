
import React from 'react';
import { Card } from '@/components/ui/card';
import { Settings, Palette, Share2, LayoutGrid, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type StyleConfigItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type StyleConfigSidebarProps = {
  activeItem: string;
  onItemSelect: (id: string) => void;
};

const configItems: StyleConfigItem[] = [
  {
    id: 'general',
    label: 'General Theme',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: 'social',
    label: 'Social Media',
    icon: <Share2 className="h-5 w-5" />,
  },
  {
    id: 'landing',
    label: 'Landing Page',
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    id: 'faq',
    label: 'FAQ Section',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export const StyleConfigSidebar: React.FC<StyleConfigSidebarProps> = ({ 
  activeItem, 
  onItemSelect 
}) => {
  return (
    <Card className="p-2">
      <div className="space-y-1">
        <h3 className="px-4 py-2 text-sm font-medium text-muted-foreground">
          Configuration
        </h3>
        <ul className="space-y-1">
          {configItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemSelect(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  activeItem === item.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 text-muted-foreground hover:text-accent-foreground"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
