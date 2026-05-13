import { VANS } from '@/config/vans'
import { FAQS } from '@/config/faqs'
import { SITE } from '@/config/site'
import type { Van, VanId, FaqItem, Lang } from '@/lib/types'

export function getVans(): Van[] {
  return VANS
}

export function getVan(id: VanId): Van | undefined {
  return VANS.find(v => v.id === id)
}

export function getFaqs(lang: Lang): FaqItem[] {
  return FAQS[lang]
}

export function getSiteConfig() {
  return SITE
}
