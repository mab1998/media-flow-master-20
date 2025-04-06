
import { MainLayout } from '@/components/layout/MainLayout';
import { FeatureGrid } from '@/components/features/FeatureGrid';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FeaturesPage = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Powerful Video Downloading <span className="gradient-text">Features</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              OmniVideo provides all the tools you need to download videos from your favorite platforms.
            </p>
          </div>

          <FeatureGrid />
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Downloading?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choose the plan that's right for you and start downloading videos today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/pricing')}
                size="lg"
              >
                View Pricing
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                size="lg"
              >
                Try Free Version
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FeaturesPage;
