import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/landing";
import { SectionHeader, Slab } from "./primitives";

export function FaqSection() {
  return (
    <Slab id="faq" tone="paper" className="py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <SectionHeader
          index="11"
          label="Questions"
          title="Before you apply."
          lede={
            <>
              Anything else? Email{" "}
              <a
                href="mailto:trellis@powerintel.co"
                className="font-semibold text-brown hover:underline"
              >
                trellis@powerintel.co
              </a>
              .
            </>
          }
        />
        <Accordion type="single" collapsible className="faq">
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="faq-item">
              <AccordionTrigger className="faq-trigger hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="faq-answer">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Slab>
  );
}
