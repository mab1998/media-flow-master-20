
import React, { useState } from 'react';
import { SocialMediaConfig as SocialMediaConfigType } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Plus, Trash2, Loader2 } from 'lucide-react';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';

type SocialMediaConfigProps = {
  socialMedia: SocialMediaConfigType[];
  onUpdate: () => void;
};

export const SocialMediaConfig: React.FC<SocialMediaConfigProps> = ({ 
  socialMedia,
  onUpdate
}) => {
  const [items, setItems] = useState<SocialMediaConfigType[]>(socialMedia);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getIconForPlatform = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'LinkedIn':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'YouTube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      default:
        return <Facebook className="h-5 w-5" />;
    }
  };

  const handleToggle = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleUpdateUrl = (id: string, url: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, url } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const response = await api.updateSocialMedia(items);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Social media settings updated successfully.",
        });
        onUpdate();
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: response.message || "Failed to update social media settings."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating settings."
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Social Media Profiles</h2>
        <p className="text-sm text-muted-foreground">
          Configure your social media links and visibility.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
            {getIconForPlatform(item.platform)}
            
            <div className="flex-1 space-y-1">
              <p className="font-medium">{item.platform}</p>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Input
                  value={item.url}
                  onChange={(e) => handleUpdateUrl(item.id, e.target.value)}
                  placeholder={`https://${item.platform.toLowerCase()}.com/yourusername`}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id={`active-${item.id}`}
                checked={item.isActive}
                onCheckedChange={() => handleToggle(item.id)}
              />
              <Label htmlFor={`active-${item.id}`}>
                {item.isActive ? 'Active' : 'Inactive'}
              </Label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
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
