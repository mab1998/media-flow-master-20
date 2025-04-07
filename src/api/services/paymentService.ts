
import { StripeConfig } from "@/types/api";

// Mock Stripe configuration
const mockStripeConfig: StripeConfig = {
  publishableKey: "pk_test_mock_publishable_key",
  webhookSecret: "whsec_mock_webhook_secret",
  enabledPaymentMethods: ["card", "paypal"],
  testMode: true,
  successUrl: "/payment-success",
  cancelUrl: "/payment-cancelled",
  allowPromotionCodes: true,
  collectBillingAddress: true,
  collectShippingAddress: false,
  lastUpdated: new Date().toISOString(),
};

// Mock payment session data
const mockPaymentSessions = [
  {
    id: "cs_test_mock_session_123",
    customerId: "cus_mock_customer_123",
    customerEmail: "user@example.com",
    amount: 999,
    currency: "usd",
    status: "succeeded",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    paymentMethod: "card",
    planId: "pro"
  },
  {
    id: "cs_test_mock_session_456",
    customerId: "cus_mock_customer_456",
    customerEmail: "another@example.com",
    amount: 1999,
    currency: "usd",
    status: "succeeded",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    paymentMethod: "paypal",
    planId: "unlimited"
  }
];

// Payment service for mock Stripe functionality
export const paymentService = {
  // Create a checkout session
  createCheckoutSession: async (planId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock checkout session creation
    const sessionId = `cs_test_${Math.random().toString(36).substr(2, 9)}`;
    
    // In a real implementation, this would redirect to Stripe's hosted checkout
    return { 
      data: { 
        sessionId,
        url: `/payment-success?session_id=${sessionId}&plan_id=${planId}` // Mock URL for demo
      }, 
      success: true 
    };
  },
  
  // Get payment session details
  getPaymentSession: async (sessionId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find existing session or create a mock one
    const session = mockPaymentSessions.find(s => s.id === sessionId) || {
      id: sessionId,
      customerId: `cus_mock_${Math.random().toString(36).substr(2, 9)}`,
      customerEmail: "customer@example.com",
      amount: 999,
      currency: "usd",
      status: "succeeded",
      createdAt: new Date().toISOString(),
      paymentMethod: "card",
      planId: "pro"
    };
    
    return { data: session, success: true };
  },
  
  // Get Stripe configuration
  getStripeConfig: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return { data: mockStripeConfig, success: true };
  },
  
  // Update Stripe configuration
  updateStripeConfig: async (config: Partial<StripeConfig>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const updatedConfig = { ...mockStripeConfig, ...config, lastUpdated: new Date().toISOString() };
    
    return { data: updatedConfig, success: true, message: "Stripe configuration updated successfully" };
  }
};
