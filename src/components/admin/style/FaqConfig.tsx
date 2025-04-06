
import React, { useState } from 'react';
import { FAQItem } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import { api } from '@/api/mockApi';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

type FaqConfigProps = {
  faqItems: FAQItem[];
  onUpdate: () => void;
};

export const FaqConfig: React.FC<FaqConfigProps> = ({ 
  faqItems,
  onUpdate
}) => {
  const [items, setItems] = useState<FAQItem[]>(faqItems);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddItem = () => {
    const newItem: FAQItem = {
      id: uuidv4(),
      question: '',
      answer: ''
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof FAQItem, value: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate that there are no empty questions or answers
      const hasEmptyFields = items.some(item => !item.question.trim() || !item.answer.trim());
      
      if (hasEmptyFields) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "All FAQ items must have both a question and an answer."
        });
        setIsSubmitting(false);
        return;
      }
      
      const response = await api.updateFAQs(items);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "FAQ items updated successfully.",
        });
        onUpdate();
      } else {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: response.message || "Failed to update FAQ items."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating FAQ items."
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">FAQ Configuration</h2>
        <p className="text-sm text-muted-foreground">
          Manage the frequently asked questions that appear on your site.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id} className="relative">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Question {index + 1}</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="h-8 w-8 p-0 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={item.question}
                    onChange={(e) => handleUpdateItem(item.id, 'question', e.target.value)}
                    placeholder="Enter question"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Answer</label>
                  <Textarea
                    value={item.answer}
                    onChange={(e) => handleUpdateItem(item.id, 'answer', e.target.value)}
                    placeholder="Enter answer"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handleAddItem}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Question
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
