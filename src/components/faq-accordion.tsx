'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqItem } from '@/lib/types'

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="item-0">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-line">
          <AccordionTrigger className="font-display font-medium text-[18px] tracking-[-0.01em] text-ink py-6 hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-ink-2 text-[15.5px] leading-relaxed pb-6">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
