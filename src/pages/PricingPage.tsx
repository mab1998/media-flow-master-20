
import { MainLayout } from '@/components/layout/MainLayout';
import { PricingSection } from '@/components/pricing/PricingSection';
import { PricingTable } from '@/components/pricing/PricingTable';

const PricingPage = () => {
  return (
    <MainLayout>
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you. No hidden fees.
            </p>
          </div>

          <PricingSection />
          
          <PricingTable />
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Have questions about our pricing? Check out our FAQ page for more information.
            </p>
            <a 
              href="/faq" 
              className="text-primary hover:underline font-medium"
            >
              View FAQ
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default PricingPage;
