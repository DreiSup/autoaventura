import type { Metadata } from 'next'
import { Archivo, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import { getSiteConfig } from '@/lib/data'
import './globals.css'
import { cn } from '@/lib/utils'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--f-display',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--f-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--f-mono',
  display: 'swap',
})

const site = getSiteConfig()

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Autocaravanas desde Barcelona`,
    template: `%s · ${site.name}`,
  },
  description: 'Alquiler de autocaravanas en Barcelona. Todo incluido, sin sorpresas. Recogida en Sant Vicenç del Horts.',
  metadataBase: new URL('https://portquestudiar.com'),
  openGraph: {
    siteName: site.name,
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={cn(archivo.variable, sourceSans3.variable, jetbrainsMono.variable)}
    >
      <body className="bg-bg text-ink font-sans antialiased min-h-screen">
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  )
}
