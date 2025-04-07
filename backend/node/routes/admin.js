
const express = require('express');
const router = express.Router();

// In-memory stores for admin data
let users = [];
let plans = [];
let downloads = [];
let invoices = [];

// Initial mock data
const generateMockData = () => {
  // Generate some mock users
  for (let i = 0; i < 20; i++) {
    const plans = ['Free', 'Pro', 'Unlimited'];
    const plan = plans[Math.floor(Math.random() * plans.length)];
    
    users.push({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      plan,
      downloadCount: Math.floor(Math.random() * 50),
      downloads: [],
      registrationDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  
  // Generate some mock plans
  const planTypes = [
    { name: 'Free', price: 0, billingCycle: 'monthly' },
    { name: 'Pro', price: 9.99, billingCycle: 'monthly' },
    { name: 'Unlimited', price: 19.99, billingCycle: 'monthly' },
    { name: 'Pro Annual', price: 99.99, billingCycle: 'yearly' },
    { name: 'Unlimited Annual', price: 199.99, billingCycle: 'yearly' },
  ];
  
  planTypes.forEach((plan, index) => {
    plans.push({
      id: `plan-${index + 1}`,
      name: plan.name,
      description: `${plan.name} plan with standard features`,
      price: plan.price,
      billingCycle: plan.billingCycle,
      features: ['Basic downloads', 'Standard quality'],
      isActive: true,
      createdAt: new Date(Date.now() - 5000000000).toISOString(),
      updatedAt: new Date(Date.now() - 1000000000).toISOString()
    });
  });
  
  // Generate mock downloads
  const platforms = ['YouTube', 'TikTok', 'Facebook', 'Instagram', 'Twitter', 'Vimeo'];
  
  for (let i = 0; i < 50; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const status = Math.random() > 0.2 ? 'completed' : 'failed';
    const quality = ['720p', '1080p', '480p', '360p'][Math.floor(Math.random() * 4)];
    
    downloads.push({
      id: `dl-${i + 1}`,
      userId: user.id,
      userName: user.name,
      videoId: `video-${i + 1}`,
      videoTitle: `Sample ${platform} Video ${i + 1}`,
      platform,
      quality,
      fileSize: `${Math.floor(Math.random() * 100) + 10}MB`,
      downloadDate: new Date(Date.now() - Math.floor(Math.random() * 30000000000)).toISOString(),
      status
    });
  }
  
  // Generate mock invoices
  const paymentMethods = ['credit_card', 'paypal', 'bank_transfer'];
  const statuses = ['paid', 'pending', 'failed', 'refunded'];
  
  for (let i = 0; i < 30; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const plan = plans[Math.floor(Math.random() * plans.length)];
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    invoices.push({
      id: `INV-${(10000 + i).toString()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      paymentMethod,
      status,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30000000000)).toISOString()
    });
  }
};

// Initialize mock data
generateMockData();

// Middleware to verify authentication
const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      message: 'Authentication required. Please log in.'
    });
  }
  
  // In a real implementation, verify the token here and check admin role
  // For this demo, we're just checking if a token exists
  
  next();
};

// Apply auth middleware to all routes
router.use(verifyAuth);

// Get admin stats
router.get('/stats', (req, res) => {
  // Generate statistics
  const totalUsers = users.length;
  const totalDownloads = downloads.length;
  
  // Calculate active users (active in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeUsers = users.filter(user => {
    const userDownloads = downloads.filter(dl => dl.userId === user.id);
    if (userDownloads.length === 0) return false;
    
    const latestDownload = new Date(Math.max(...userDownloads.map(dl => new Date(dl.downloadDate))));
    return latestDownload >= thirtyDaysAgo;
  }).length;
  
  // Calculate premium users
  const premiumUsers = users.filter(user => user.plan !== 'Free').length;
  
  // Calculate downloads by platform
  const downloadsByPlatform = {};
  platforms = ['YouTube', 'TikTok', 'Facebook', 'Instagram', 'Twitter', 'Vimeo'];
  
  platforms.forEach(platform => {
    downloadsByPlatform[platform] = downloads.filter(dl => dl.platform === platform).length;
  });
  
  // Calculate downloads by day (last 7 days)
  const downloadsByDay = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    const dayStart = new Date(date.setHours(0, 0, 0, 0));
    const dayEnd = new Date(date.setHours(23, 59, 59, 999));
    
    const count = downloads.filter(dl => {
      const dlDate = new Date(dl.downloadDate);
      return dlDate >= dayStart && dlDate <= dayEnd;
    }).length;
    
    downloadsByDay.push({
      date: new Date(date).toISOString().split('T')[0],
      count
    });
  }
  
  res.status(200).json({
    totalUsers,
    totalDownloads,
    activeUsers,
    premiumUsers,
    downloadsByPlatform,
    downloadsByDay
  });
});

// Get users (paginated)
router.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.status(200).json({
    users: paginatedUsers,
    totalCount: users.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(users.length / limitNum)
  });
});

// Get user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.status(200).json(user);
});

// Add a new user
router.post('/users', (req, res) => {
  const { name, email, plan } = req.body;
  
  if (!name || !email || !plan) {
    return res.status(400).json({ message: 'Name, email, and plan are required' });
  }
  
  // Check if email is already in use
  const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'Email is already in use' });
  }
  
  const newUser = {
    id: `user-${users.length + 1}`,
    name,
    email,
    plan,
    downloadCount: 0,
    downloads: [],
    registrationDate: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json(newUser);
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  const index = users.findIndex(user => user.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users.splice(index, 1);
  
  res.status(204).send();
});

// Get subscription plans
router.get('/plans', (req, res) => {
  res.status(200).json(plans);
});

// Get plan by ID
router.get('/plans/:id', (req, res) => {
  const { id } = req.params;
  const plan = plans.find(plan => plan.id === id);
  
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }
  
  res.status(200).json(plan);
});

// Create a new plan
router.post('/plans', (req, res) => {
  const { name, description, price, billingCycle, features, isActive } = req.body;
  
  if (!name || price === undefined || !billingCycle) {
    return res.status(400).json({ message: 'Name, price, and billing cycle are required' });
  }
  
  const newPlan = {
    id: `plan-${plans.length + 1}`,
    name,
    description: description || '',
    price,
    billingCycle,
    features: features || [],
    isActive: isActive !== undefined ? isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  plans.push(newPlan);
  
  res.status(201).json(newPlan);
});

// Update a plan
router.put('/plans/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, billingCycle, features, isActive } = req.body;
  
  const planIndex = plans.findIndex(plan => plan.id === id);
  
  if (planIndex === -1) {
    return res.status(404).json({ message: 'Plan not found' });
  }
  
  const plan = plans[planIndex];
  
  const updatedPlan = {
    ...plan,
    name: name !== undefined ? name : plan.name,
    description: description !== undefined ? description : plan.description,
    price: price !== undefined ? price : plan.price,
    billingCycle: billingCycle !== undefined ? billingCycle : plan.billingCycle,
    features: features !== undefined ? features : plan.features,
    isActive: isActive !== undefined ? isActive : plan.isActive,
    updatedAt: new Date().toISOString()
  };
  
  plans[planIndex] = updatedPlan;
  
  res.status(200).json(updatedPlan);
});

// Delete a plan
router.delete('/plans/:id', (req, res) => {
  const { id } = req.params;
  
  const index = plans.findIndex(plan => plan.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Plan not found' });
  }
  
  plans.splice(index, 1);
  
  res.status(204).send();
});

// Get downloads (paginated)
router.get('/downloads', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedDownloads = downloads.slice(startIndex, endIndex);
  
  res.status(200).json({
    downloads: paginatedDownloads,
    totalCount: downloads.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(downloads.length / limitNum)
  });
});

// Get download by ID
router.get('/downloads/:id', (req, res) => {
  const { id } = req.params;
  const download = downloads.find(download => download.id === id);
  
  if (!download) {
    return res.status(404).json({ message: 'Download not found' });
  }
  
  res.status(200).json(download);
});

// Get invoices (paginated)
router.get('/invoices', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedInvoices = invoices.slice(startIndex, endIndex);
  
  res.status(200).json({
    invoices: paginatedInvoices,
    totalCount: invoices.length,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(invoices.length / limitNum)
  });
});

// Get invoice by ID
router.get('/invoices/:id', (req, res) => {
  const { id } = req.params;
  const invoice = invoices.find(invoice => invoice.id === id);
  
  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }
  
  res.status(200).json(invoice);
});

module.exports = router;
