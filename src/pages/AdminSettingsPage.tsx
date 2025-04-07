import React, { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, DollarSign, Settings, Mail, FileText, Cookie, Phone } from 'lucide-react';
import { api } from '@/api/mockApi';
import { useApiRequest } from '@/api/mockApi';
import { StripeConfig } from '@/types/api';

const AdminSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoadingTerms, setIsLoadingTerms] = useState(true);
  const [isLoadingPrivacy, setIsLoadingPrivacy] = useState(true);
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);
  const [isLoadingContact, setIsLoadingContact] = useState(true);
  const [isLoadingStripe, setIsLoadingStripe] = useState(true);
  
  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [cookieContent, setCookieContent] = useState('');
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [stripeConfig, setStripeConfig] = useState<StripeConfig | null>(null);
  
  // Fetch Terms of Service
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoadingTerms(true);
        const response = await api.getTermsOfService();
        if (response.success) {
          setTermsContent(response.data.content);
        }
      } catch (error) {
        console.error("Failed to load terms of service:", error);
      } finally {
        setIsLoadingTerms(false);
      }
    };

    fetchTerms();
  }, []);
  
  // Fetch Privacy Policy
  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        setIsLoadingPrivacy(true);
        const response = await api.getPrivacyPolicy();
        if (response.success) {
          setPrivacyContent(response.data.content);
        }
      } catch (error) {
        console.error("Failed to load privacy policy:", error);
      } finally {
        setIsLoadingPrivacy(false);
      }
    };

    fetchPrivacy();
  }, []);
  
  // Fetch Cookie Policy
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        setIsLoadingCookie(true);
        const response = await api.getCookiePolicy();
        if (response.success) {
          setCookieContent(response.data.content);
        }
      } catch (error) {
        console.error("Failed to load cookie policy:", error);
      } finally {
        setIsLoadingCookie(false);
      }
    };

    fetchCookie();
  }, []);
  
  // Fetch Contact Info
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoadingContact(true);
        const response = await api.getContactInfo();
        if (response.success) {
          setContactInfo(response.data);
        }
      } catch (error) {
        console.error("Failed to load contact information:", error);
      } finally {
        setIsLoadingContact(false);
      }
    };

    fetchContactInfo();
  }, []);
  
  // Fetch Stripe Config
  useEffect(() => {
    const fetchStripeConfig = async () => {
      try {
        setIsLoadingStripe(true);
        const response = await api.getStripeConfig();
        if (response.success) {
          setStripeConfig(response.data);
        }
      } catch (error) {
        console.error("Failed to load Stripe configuration:", error);
      } finally {
        setIsLoadingStripe(false);
      }
    };

    fetchStripeConfig();
  }, []);

  // Handle saving general settings
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been saved successfully."
    });
  };

  // Handle saving notification settings
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification settings have been saved successfully."
    });
  };

  // Handle saving API settings
  const handleSaveAPISettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your API settings have been saved successfully."
    });
  };

  // Handle saving SMTP settings
  const handleSaveSmtpSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your SMTP settings have been saved successfully."
    });
  };
  
  // Handle saving Terms of Service
  const handleSaveTermsOfService = async () => {
    try {
      const response = await api.updateTermsOfService(termsContent);
      if (response.success) {
        toast({
          title: "Terms Updated",
          description: "Your Terms of Service have been updated successfully."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update Terms of Service."
      });
    }
  };
  
  // Handle saving Privacy Policy
  const handleSavePrivacyPolicy = async () => {
    try {
      const response = await api.updatePrivacyPolicy(privacyContent);
      if (response.success) {
        toast({
          title: "Policy Updated",
          description: "Your Privacy Policy has been updated successfully."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update Privacy Policy."
      });
    }
  };
  
  // Handle saving Cookie Policy
  const handleSaveCookiePolicy = async () => {
    try {
      const response = await api.updateCookiePolicy(cookieContent);
      if (response.success) {
        toast({
          title: "Policy Updated",
          description: "Your Cookie Policy has been updated successfully."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update Cookie Policy."
      });
    }
  };
  
  // Handle saving Contact Info
  const handleSaveContactInfo = async () => {
    try {
      const response = await api.updateContactInfo(contactInfo);
      if (response.success) {
        toast({
          title: "Contact Info Updated",
          description: "Your contact information has been updated successfully."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update contact information."
      });
    }
  };
  
  // Handle contact form field changes
  const handleContactChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle Stripe config field changes
  const handleStripeConfigChange = (field: keyof StripeConfig, value: any) => {
    if (!stripeConfig) return;
    
    setStripeConfig(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  // Handle saving Stripe config
  const handleSaveStripeConfig = async () => {
    if (!stripeConfig) return;
    
    try {
      const response = await api.updateStripeConfig(stripeConfig);
      if (response.success) {
        toast({
          title: "Stripe Configuration Updated",
          description: "Your payment settings have been updated successfully."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update Stripe configuration."
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage system settings and preferences</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="sm:w-64 shrink-0">
          <div className="bg-muted rounded-md p-1 space-y-1">
            <TabButton 
              active={activeTab === "general"} 
              onClick={() => setActiveTab("general")}
              icon={<Settings className="h-4 w-4 mr-2" />}
              label="General"
            />
            <TabButton 
              active={activeTab === "notifications"} 
              onClick={() => setActiveTab("notifications")}
              icon={<Mail className="h-4 w-4 mr-2" />}
              label="Notifications"
            />
            <TabButton 
              active={activeTab === "api"} 
              onClick={() => setActiveTab("api")}
              icon={<Settings className="h-4 w-4 mr-2" />}
              label="API"
            />
            <TabButton 
              active={activeTab === "smtp"} 
              onClick={() => setActiveTab("smtp")}
              icon={<Mail className="h-4 w-4 mr-2" />}
              label="SMTP"
            />
            <TabButton 
              active={activeTab === "stripe"} 
              onClick={() => setActiveTab("stripe")}
              icon={<DollarSign className="h-4 w-4 mr-2" />}
              label="Stripe Payments"
            />
            <TabButton 
              active={activeTab === "terms"} 
              onClick={() => setActiveTab("terms")}
              icon={<FileText className="h-4 w-4 mr-2" />}
              label="Terms of Service"
            />
            <TabButton 
              active={activeTab === "privacy"} 
              onClick={() => setActiveTab("privacy")}
              icon={<FileText className="h-4 w-4 mr-2" />}
              label="Privacy Policy"
            />
            <TabButton 
              active={activeTab === "cookie"} 
              onClick={() => setActiveTab("cookie")}
              icon={<Cookie className="h-4 w-4 mr-2" />}
              label="Cookie Policy"
            />
            <TabButton 
              active={activeTab === "contact"} 
              onClick={() => setActiveTab("contact")}
              icon={<Phone className="h-4 w-4 mr-2" />}
              label="Contact Us"
            />
          </div>
        </div>

        <div className="flex-1">
          <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Manage basic system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">Site Name</Label>
                      <Input id="site-name" defaultValue="OmniVideo" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-description">Site Description</Label>
                      <Input id="site-description" defaultValue="Video downloader for multiple platforms" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@example.com" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Features</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Temporarily disable the site for maintenance
                        </p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="user-registration">User Registration</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow new users to register
                        </p>
                      </div>
                      <Switch id="user-registration" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Send email notifications for important events
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="user-signup-notification">User Signup Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify admins when new users sign up
                        </p>
                      </div>
                      <Switch id="user-signup-notification" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-notification">Payment Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications for subscription payments
                        </p>
                      </div>
                      <Switch id="payment-notification" defaultChecked />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="email-sender">Sender Email</Label>
                      <Input id="email-sender" type="email" defaultValue="no-reply@omnivideo.example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email-sender-name">Sender Name</Label>
                      <Input id="email-sender-name" defaultValue="OmniVideo" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>Configure API access and management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-api">Enable API</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow API access to the system
                        </p>
                      </div>
                      <Switch id="enable-api" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-key">API Key</Label>
                      <div className="flex space-x-2">
                        <Input id="api-key" type="password" value="•••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rate-limiting">Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limit API requests per minute
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rate-limit-value">Rate Limit</Label>
                      <Input id="rate-limit-value" type="number" defaultValue="60" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveAPISettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="smtp">
              <Card>
                <CardHeader>
                  <CardTitle>SMTP Settings</CardTitle>
                  <CardDescription>Configure email sending server settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="smtp-enabled">Enable SMTP</Label>
                        <p className="text-sm text-muted-foreground">
                          Use custom SMTP server for sending emails
                        </p>
                      </div>
                      <Switch id="smtp-enabled" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input id="smtp-host" defaultValue="smtp.example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" type="number" defaultValue="587" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtp-encryption">Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger id="smtp-encryption">
                          <SelectValue placeholder="Select encryption type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="tls">TLS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtp-username">SMTP Username</Label>
                      <Input id="smtp-username" defaultValue="smtp-user@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">SMTP Password</Label>
                      <div className="flex space-x-2">
                        <Input id="smtp-password" type="password" value="•••••••••••••••" />
                        <Button variant="outline" size="icon">
                          👁️
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="mr-2">Test Connection</Button>
                      <Button variant="outline">Send Test Email</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button onClick={handleSaveSmtpSettings}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stripe">
              <Card>
                <CardHeader>
                  <CardTitle>Stripe Payment Settings</CardTitle>
                  <CardDescription>Configure payment processing with Stripe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingStripe ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : stripeConfig ? (
                    <>
                      <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="test-mode">Test Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Use Stripe test environment for development
                            </p>
                          </div>
                          <Switch 
                            id="test-mode" 
                            checked={stripeConfig.testMode}
                            onCheckedChange={(checked) => handleStripeConfigChange('testMode', checked)} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="publishable-key">
                            {stripeConfig.testMode ? 'Test' : 'Live'} Publishable Key
                          </Label>
                          <Input 
                            id="publishable-key" 
                            value={stripeConfig.publishableKey} 
                            onChange={(e) => handleStripeConfigChange('publishableKey', e.target.value)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Your Stripe publishable key starting with 'pk_'
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="webhook-secret">
                            {stripeConfig.testMode ? 'Test' : 'Live'} Webhook Secret
                          </Label>
                          <Input 
                            id="webhook-secret" 
                            value={stripeConfig.webhookSecret}
                            onChange={(e) => handleStripeConfigChange('webhookSecret', e.target.value)}
                            type="password" 
                          />
                          <p className="text-sm text-muted-foreground">
                            Your Stripe webhook secret starting with 'whsec_'
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="success-url">Success URL</Label>
                          <Input 
                            id="success-url" 
                            value={stripeConfig.successUrl}
                            onChange={(e) => handleStripeConfigChange('successUrl', e.target.value)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Where to redirect customers after successful payment
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cancel-url">Cancel URL</Label>
                          <Input 
                            id="cancel-url" 
                            value={stripeConfig.cancelUrl}
                            onChange={(e) => handleStripeConfigChange('cancelUrl', e.target.value)}
                          />
                          <p className="text-sm text-muted-foreground">
                            Where to redirect customers when they cancel checkout
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="promotion-codes">Allow Promotion Codes</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable promotion code field at checkout
                            </p>
                          </div>
                          <Switch 
                            id="promotion-codes"
                            checked={stripeConfig.allowPromotionCodes}
                            onCheckedChange={(checked) => handleStripeConfigChange('allowPromotionCodes', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="billing-address">Collect Billing Address</Label>
                            <p className="text-sm text-muted-foreground">
                              Request billing address during checkout
                            </p>
                          </div>
                          <Switch 
                            id="billing-address"
                            checked={stripeConfig.collectBillingAddress}
                            onCheckedChange={(checked) => handleStripeConfigChange('collectBillingAddress', checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="shipping-address">Collect Shipping Address</Label>
                            <p className="text-sm text-muted-foreground">
                              Request shipping address during checkout
                            </p>
                          </div>
                          <Switch 
                            id="shipping-address"
                            checked={stripeConfig.collectShippingAddress}
                            onCheckedChange={(checked) => handleStripeConfigChange('collectShippingAddress', checked)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleSaveStripeConfig}
                          className="flex items-center"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Save Payment Settings
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p>Failed to load Stripe configuration. Please try again.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="terms">
              <Card>
                <CardHeader>
                  <CardTitle>Terms of Service</CardTitle>
                  <CardDescription>Manage your website's terms and conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingTerms ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="terms-content">Content (Markdown supported)</Label>
                        <Textarea 
                          id="terms-content" 
                          value={termsContent} 
                          onChange={(e) => setTermsContent(e.target.value)} 
                          rows={15} 
                          className="font-mono"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveTermsOfService}>Save Terms of Service</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Policy</CardTitle>
                  <CardDescription>Manage your website's privacy policy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingPrivacy ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="privacy-content">Content (Markdown supported)</Label>
                        <Textarea 
                          id="privacy-content" 
                          value={privacyContent} 
                          onChange={(e) => setPrivacyContent(e.target.value)} 
                          rows={15} 
                          className="font-mono"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSavePrivacyPolicy}>Save Privacy Policy</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cookie">
              <Card>
                <CardHeader>
                  <CardTitle>Cookie Policy</CardTitle>
                  <CardDescription>Manage your website's cookie policy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingCookie ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cookie-content">Content (Markdown supported)</Label>
                        <Textarea 
                          id="cookie-content" 
                          value={cookieContent} 
                          onChange={(e) => setCookieContent(e.target.value)} 
                          rows={15} 
                          className="font-mono"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveCookiePolicy}>Save Cookie Policy</Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Manage your company's contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingContact ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : contactInfo ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input 
                          id="company-name" 
                          value={contactInfo.companyName} 
                          onChange={(e) => handleContactChange('companyName', e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={contactInfo.address} 
                          onChange={(e) => handleContactChange('address', e.target.value)} 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={contactInfo.email} 
                            onChange={(e) => handleContactChange('email', e.target.value)} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            value={contactInfo.phone} 
                            onChange={(e) => handleContactChange('phone', e.target.value)} 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="support-hours">Support Hours</Label>
                        <Input 
                          id="support-hours" 
                          value={contactInfo.supportHours} 
                          onChange={(e) => handleContactChange('supportHours', e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="form-email">Form Submission Email</Label>
                        <Input 
                          id="form-email" 
                          type="email" 
                          value={contactInfo.formSubmissionEmail} 
                          onChange={(e) => handleContactChange('formSubmissionEmail', e.target.value)} 
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleSaveContactInfo}>Save Contact Information</Button>
                      </div>
                    </>
                  ) : (
                    <p>Failed to load contact information. Please try again.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

const TabButton = ({ 
  active, 
  onClick, 
  icon, 
  label 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full text-left px-3 py-2 text-sm rounded-sm transition-colors ${
        active 
          ? "bg-background text-foreground font-medium shadow-sm" 
          : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default AdminSettingsPage;
