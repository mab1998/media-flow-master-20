
import React, { useState } from 'react';
import { LandingPageSection } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Image } from 'lucide-react';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Label } from '@/components/ui/label';

type LandingSectionsConfigProps = {
  sections: LandingPageSection[];
  onUpdate: () => void;
};

export const LandingSectionsConfig: React.FC<LandingSectionsConfigProps> = ({ 
  sections,
  onUpdate
}) => {
  const [items, setItems] = useState<LandingPageSection[]>(
    [...sections].sort((a, b) => a.order - b.order)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddSection = () => {
    const maxOrder = items.length > 0 
      ? Math.max(...items.map(item => item.order)) 
      : 0;
    
    const newSection: LandingPageSection = {
      id: uuidv4(),
      title: '',
      content: '',
      order: maxOrder + 1,
      isActive: true
    };
    
    setItems([...items, newSection]);
  };

  const handleRemoveSection = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateSection = (
    id: string, 
    field: keyof LandingPageSection, 
    value: string | boolean | number
  ) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleMoveUp = (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index > 0) {
      const newItems = [...items];
      // Swap orders
      const temp = newItems[index].order;
      newItems[index].order = newItems[index - 1].order;
      newItems[index - 1].order = temp;
      // Sort by order
      setItems(newItems.sort((a, b) => a.order - b.order));
    }
  };

  const handleMoveDown = (id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index < items.length - 1) {
      const newItems = [...items];
      // Swap orders
      const temp = newItems[index].order;
      newItems[index].order = newItems[index + 1].order;
      newItems[index + 1].order = temp;
      // Sort by order
      setItems(newItems.sort((a, b) => a.order - b.order));
    }
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate that there are no empty titles
      const hasEmptyTitles = items.some(item => !item.title.trim());
      
      if (hasEmptyTitles) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "All sections must have a title."
        });
        setIsSubmitting(false);
        return;
      }
      
      const response = await api.updateLandingSections(items);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Landing sections updated successfully.",
        });
        onUpdate();
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: response.message || "Failed to update landing sections."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating landing sections."
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Landing Page Sections</h2>
        <p className="text-sm text-muted-foreground">
          Configure the sections that appear on your landing page.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((section, index) => (
          <Card key={section.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveUp(section.id)}
                      disabled={index === 0}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveDown(section.id)}
                      disabled={index === items.length - 1}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-medium">Section {index + 1}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`active-${section.id}`}
                      checked={section.isActive}
                      onCheckedChange={(checked) => 
                        handleUpdateSection(section.id, 'isActive', checked)
                      }
                    />
                    <Label htmlFor={`active-${section.id}`} className="text-sm">
                      {section.isActive ? 'Active' : 'Inactive'}
                    </Label>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSection(section.id)}
                    className="h-8 w-8 p-0 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`title-${section.id}`}>Title</Label>
                  <Input
                    id={`title-${section.id}`}
                    value={section.title}
                    onChange={(e) => 
                      handleUpdateSection(section.id, 'title', e.target.value)
                    }
                    placeholder="Section title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`subtitle-${section.id}`}>Subtitle (Optional)</Label>
                  <Input
                    id={`subtitle-${section.id}`}
                    value={section.subtitle || ''}
                    onChange={(e) => 
                      handleUpdateSection(section.id, 'subtitle', e.target.value)
                    }
                    placeholder="Section subtitle"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`content-${section.id}`}>Content</Label>
                  <Textarea
                    id={`content-${section.id}`}
                    value={section.content}
                    onChange={(e) => 
                      handleUpdateSection(section.id, 'content', e.target.value)
                    }
                    placeholder="Section content"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`image-${section.id}`}>Image URL (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`image-${section.id}`}
                      value={section.imageUrl || ''}
                      onChange={(e) => 
                        handleUpdateSection(section.id, 'imageUrl', e.target.value)
                      }
                      placeholder="/path/to/image.jpg"
                    />
                    {section.imageUrl && (
                      <Button variant="outline" size="icon" className="shrink-0">
                        <Image className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`buttonText-${section.id}`}>Button Text (Optional)</Label>
                    <Input
                      id={`buttonText-${section.id}`}
                      value={section.buttonText || ''}
                      onChange={(e) => 
                        handleUpdateSection(section.id, 'buttonText', e.target.value)
                      }
                      placeholder="Click Here"
                    />
                  </div>
                  
                  {section.buttonText && (
                    <div className="space-y-2">
                      <Label htmlFor={`buttonUrl-${section.id}`}>Button URL</Label>
                      <Input
                        id={`buttonUrl-${section.id}`}
                        value={section.buttonUrl || ''}
                        onChange={(e) => 
                          handleUpdateSection(section.id, 'buttonUrl', e.target.value)
                        }
                        placeholder="/page or https://example.com"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handleAddSection}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
        
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
