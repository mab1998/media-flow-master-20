
import React, { useState } from 'react';
import { ColorScheme } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, SunMoon } from 'lucide-react';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';

type ColorSchemeConfigProps = {
  colorScheme: ColorScheme;
  onUpdate: () => void;
};

export const ColorSchemeConfig: React.FC<ColorSchemeConfigProps> = ({ 
  colorScheme,
  onUpdate
}) => {
  const [scheme, setScheme] = useState<ColorScheme>(colorScheme);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ColorScheme, value: string | boolean) => {
    setScheme(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const response = await api.updateColorScheme(scheme);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Color scheme updated successfully.",
        });
        onUpdate();
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: response.message || "Failed to update color scheme."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating color scheme."
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Color Scheme</h2>
        <p className="text-sm text-muted-foreground">
          Configure the color scheme for your website.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="themeName">Theme Name</Label>
          <Input
            id="themeName"
            value={scheme.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 pt-8">
          <SunMoon className="h-5 w-5" />
          <Switch
            id="darkMode"
            checked={scheme.isDarkMode}
            onCheckedChange={(checked) => handleChange('isDarkMode', checked)}
          />
          <Label htmlFor="darkMode">
            {scheme.isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Label>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded border" 
              style={{ backgroundColor: scheme.primaryColor }}
            />
            <Input
              id="primaryColor"
              type="text"
              value={scheme.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secondary Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded border" 
              style={{ backgroundColor: scheme.secondaryColor }}
            />
            <Input
              id="secondaryColor"
              type="text"
              value={scheme.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded border" 
              style={{ backgroundColor: scheme.accentColor }}
            />
            <Input
              id="accentColor"
              type="text"
              value={scheme.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backgroundColor">Background Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded border" 
              style={{ backgroundColor: scheme.backgroundColor }}
            />
            <Input
              id="backgroundColor"
              type="text"
              value={scheme.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor">Text Color</Label>
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded border" 
              style={{ backgroundColor: scheme.textColor }}
            />
            <Input
              id="textColor"
              type="text"
              value={scheme.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
};
