
// Mock data for legal pages and settings
const mockTermsOfService = {
  id: '1',
  title: 'Terms of Service',
  content: `
## Terms and Conditions

These terms and conditions outline the rules and regulations for the use of OmniVideo's Website.

By accessing this website we assume you accept these terms and conditions. Do not continue to use OmniVideo if you do not agree to take all of the terms and conditions stated on this page.

### License

Unless otherwise stated, OmniVideo and/or its licensors own the intellectual property rights for all material on OmniVideo. All intellectual property rights are reserved. You may access this from OmniVideo for your own personal use subjected to restrictions set in these terms and conditions.

### Restrictions

You are specifically restricted from all of the following:
- publishing any Website material in any other media;
- selling, sublicensing and/or otherwise commercializing any Website material;
- publicly performing and/or showing any Website material;
- using this Website in any way that is or may be damaging to this Website;
- using this Website in any way that impacts user access to this Website;
- using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;
- engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;

### Your Content

In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant OmniVideo a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.

Your Content must be your own and must not be invading any third-party's rights. OmniVideo reserves the right to remove any of Your Content from this Website at any time without notice.`,
  lastUpdated: new Date().toISOString(),
};

const mockPrivacyPolicy = {
  id: '1',
  title: 'Privacy Policy',
  content: `
## Privacy Policy

OmniVideo ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by OmniVideo.

### Information We Collect

We collect several different types of information for various purposes to provide and improve our Service to you:

#### Personal Data

While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
- Email address
- First name and last name
- Phone number
- Address, State, Province, ZIP/Postal code, City
- Cookies and Usage Data

#### Usage Data

We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

### Use of Data

OmniVideo uses the collected data for various purposes:
- To provide and maintain our Service
- To notify you about changes to our Service
- To provide customer support
- To gather analysis or valuable information so that we can improve our Service
- To monitor the usage of our Service
- To detect, prevent and address technical issues`,
  lastUpdated: new Date().toISOString(),
};

const mockCookiePolicy = {
  id: '1',
  title: 'Cookie Policy',
  content: `
## Cookie Policy

This Cookie Policy explains how OmniVideo ("we", "us", and "ours") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.

### What are cookies?

Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.

Cookies set by the website owner (in this case, OmniVideo) are called "first party cookies". Cookies set by parties other than the website owner are called "third party cookies". Third party cookies enable third party features or functionality to be provided on or through the website (e.g. like advertising, interactive content and analytics). The parties that set these third party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.

### Why do we use cookies?

We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Websites and Subscription Service. For example, OmniVideo keeps track of the Websites and pages you visit within OmniVideo, in order to determine what portion of the OmniVideo Website or Subscription Service is the most popular or most used. This data is used to deliver customized content and promotions within the OmniVideo Website and Subscription Service to customers whose behavior indicates that they are interested in a particular subject area.`,
  lastUpdated: new Date().toISOString(),
};

const mockContactInfo = {
  id: '1',
  companyName: 'OmniVideo, Inc.',
  address: '123 Tech Street, San Francisco, CA 94105',
  email: 'support@omnivideo.example.com',
  phone: '+1 (555) 123-4567',
  supportHours: 'Monday - Friday, 9am - 5pm PST',
  socialMedia: [
    { platform: 'Twitter', handle: '@omnivideo', url: 'https://twitter.com/omnivideo' },
    { platform: 'Facebook', handle: 'OmniVideo', url: 'https://facebook.com/omnivideo' },
    { platform: 'Instagram', handle: '@omnivideo', url: 'https://instagram.com/omnivideo' },
  ],
  formSubmissionEmail: 'contact@omnivideo.example.com',
  formCcEmail: 'records@omnivideo.example.com',
};

// Legal service for the admin interface
export const legalService = {
  // Get Terms of Service
  getTermsOfService: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockTermsOfService, success: true };
  },

  // Update Terms of Service
  updateTermsOfService: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedTerms = { 
      ...mockTermsOfService, 
      content, 
      lastUpdated: new Date().toISOString() 
    };
    
    return { data: updatedTerms, success: true, message: 'Terms of Service updated successfully' };
  },

  // Get Privacy Policy
  getPrivacyPolicy: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockPrivacyPolicy, success: true };
  },

  // Update Privacy Policy
  updatePrivacyPolicy: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedPolicy = { 
      ...mockPrivacyPolicy, 
      content, 
      lastUpdated: new Date().toISOString() 
    };
    
    return { data: updatedPolicy, success: true, message: 'Privacy Policy updated successfully' };
  },

  // Get Cookie Policy
  getCookiePolicy: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockCookiePolicy, success: true };
  },

  // Update Cookie Policy
  updateCookiePolicy: async (content: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedPolicy = { 
      ...mockCookiePolicy, 
      content, 
      lastUpdated: new Date().toISOString() 
    };
    
    return { data: updatedPolicy, success: true, message: 'Cookie Policy updated successfully' };
  },

  // Get Contact Information
  getContactInfo: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockContactInfo, success: true };
  },

  // Update Contact Information
  updateContactInfo: async (contactInfo: typeof mockContactInfo) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedInfo = { 
      ...mockContactInfo,
      ...contactInfo
    };
    
    return { data: updatedInfo, success: true, message: 'Contact information updated successfully' };
  },
};
