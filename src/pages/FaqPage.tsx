
import { MainLayout } from '@/components/layout/MainLayout';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FaqPage = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about OmniVideo.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you couldn't find the answer to your question, feel free to contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                size="lg"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                size="lg"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FaqPage;
