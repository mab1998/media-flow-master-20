
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { api } from '@/api/mockApi';
import { useApiRequest } from '@/api/mockApi';

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch contact information
  React.useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true);
        const response = await api.getContactInfo();
        if (response.success) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error("Failed to load contact information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields."
      });
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address."
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon."
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send your message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Our Information</CardTitle>
              <CardDescription>Here's how you can reach us</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                <p className="text-center py-4">Loading contact information...</p>
              ) : contactInfo ? (
                <>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <h3 className="font-medium">{contactInfo.companyName}</h3>
                      <p className="text-muted-foreground">{contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href={`tel:${contactInfo.phone}`} className="text-primary hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Support Hours</h3>
                    <p className="text-muted-foreground">{contactInfo.supportHours}</p>
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="font-medium mb-2">Social Media</h3>
                    <div className="flex gap-4">
                      {contactInfo.socialMedia.map((social: any) => (
                        <a 
                          key={social.platform} 
                          href={social.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          {social.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Contact information unavailable. Please try again later.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={subject} onValueChange={setSubject} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    rows={5} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : 
                    "Send Message"
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactUsPage;
