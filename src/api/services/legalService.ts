
import { LegalDocument, ContactInfo } from '@/types/api';

// Mock terms of service content
const mockTermsOfService: LegalDocument = {
  title: "Terms of Service",
  content: `# Terms of Service

## 1. Acceptance of Terms

By accessing and using OmniVideo services, you agree to be bound by these Terms of Service.

## 2. Description of Service

OmniVideo provides video downloading services from various platforms for personal use only.

## 3. User Responsibilities

Users must comply with copyright laws and platform terms of service when using our services.

## 4. Intellectual Property Rights

Users agree not to use downloaded content for commercial purposes without proper licensing.

## 5. Privacy Policy

Our Privacy Policy governs the collection and use of personal information.

## 6. Limitation of Liability

OmniVideo is not responsible for misuse of downloaded content by users.

## 7. Changes to Terms

We reserve the right to modify these terms at any time with notice to users.

## 8. Termination

We may terminate service access for violations of these terms.

## 9. Governing Law

These terms are governed by applicable laws.

## 10. Contact Information

For questions about these terms, please contact support@omnivideo.example.com.`,
  lastUpdated: new Date().toISOString()
};

// Mock privacy policy content
const mockPrivacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  content: `# Privacy Policy

## Introduction

This Privacy Policy explains how OmniVideo collects, uses, and protects your personal information.

## Information We Collect

We collect information you provide directly, such as account details and usage information.

## How We Use Your Information

Your information helps us provide, improve, and protect our services.

## Information Sharing and Disclosure

We do not sell your personal information to third parties.

## Security

We implement security measures to protect your personal information.

## Your Rights

You have rights regarding your personal data, including access and deletion.

## Changes to This Policy

We may update this policy periodically with notice to users.

## Contact Us

If you have questions about this policy, please contact privacy@omnivideo.example.com.`,
  lastUpdated: new Date().toISOString()
};

// Mock cookie policy content
const mockCookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  content: `# Cookie Policy

## What Are Cookies

Cookies are small text files stored on your device when you visit our website.

## How We Use Cookies

We use cookies to enhance your browsing experience and analyze site traffic.

## Types of Cookies We Use

### Essential Cookies
Required for basic website functionality.

### Performance Cookies
Help us understand how visitors interact with our website.

### Functionality Cookies
Allow us to remember your preferences.

### Targeting/Advertising Cookies
Used to deliver relevant advertisements.

## Managing Cookies

Most web browsers allow cookie control through their settings.

## Changes to This Policy

We may update this policy periodically with notice to users.

## Contact Us

If you have questions about our cookie usage, please contact cookies@omnivideo.example.com.`,
  lastUpdated: new Date().toISOString()
};

// Mock contact information
const mockContactInfo: ContactInfo = {
  companyName: "OmniVideo, Inc.",
  address: "123 Tech Lane, San Francisco, CA 94107",
  email: "contact@omnivideo.example.com",
  phone: "+1 (555) 123-4567",
  supportHours: "Monday-Friday, 9:00 AM - 6:00 PM PST",
  formSubmissionEmail: "support@omnivideo.example.com"
};

// Legal service for terms, privacy policy, etc.
export const legalService = {
  // Get terms of service
  getTermsOfService: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return { data: mockTermsOfService, success: true };
  },
  
  // Update terms of service
  updateTermsOfService: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedTerms = {
      ...mockTermsOfService,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { data: updatedTerms, success: true };
  },
  
  // Get privacy policy
  getPrivacyPolicy: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 550));
    
    return { data: mockPrivacyPolicy, success: true };
  },
  
  // Update privacy policy
  updatePrivacyPolicy: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    const updatedPolicy = {
      ...mockPrivacyPolicy,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { data: updatedPolicy, success: true };
  },
  
  // Get cookie policy
  getCookiePolicy: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { data: mockCookiePolicy, success: true };
  },
  
  // Update cookie policy
  updateCookiePolicy: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const updatedPolicy = {
      ...mockCookiePolicy,
      content,
      lastUpdated: new Date().toISOString()
    };
    
    return { data: updatedPolicy, success: true };
  },
  
  // Get contact information
  getContactInfo: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 450));
    
    return { data: mockContactInfo, success: true };
  },
  
  // Update contact information
  updateContactInfo: async (info: Partial<ContactInfo>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 650));
    
    const updatedInfo = { ...mockContactInfo, ...info };
    
    return { data: updatedInfo, success: true };
  }
};
