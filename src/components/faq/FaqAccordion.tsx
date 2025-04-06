
import { faqItems } from '@/api/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
