import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '../context/ThemeContext'
import { CollectionProvider } from '../context/CollectionContext'
import { FilterProvider } from '../context/FilterContext'

export const metadata: Metadata = {
  title: 'MEZASTAR DEX | Pokémon Mezastar Collection Tracker',
  description:
    'Bảng theo dõi và quản lý bộ sưu tập thẻ game Pokémon Mezastar chuyên nghiệp. Ghi chép số lượng thẻ, theo dõi theo mùa sưu tầm, ghi chú thẻ custom, promo và sự kiện dễ dàng.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://world.pokemonmezastar.com/share/img/favicon.ico"
        />
        {/* Prevent theme flash: set data-theme before React hydrates */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('mezastar_theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-root text-primary">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('mezastar_theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
          <ThemeProvider>
            <CollectionProvider>
              <FilterProvider>
                {children}
              </FilterProvider>
            </CollectionProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
