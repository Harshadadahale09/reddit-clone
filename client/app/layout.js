import './globals.css'

import Providers from './providers'

export const metadata = {
  title: 'Reddit Clone',
  description: 'Reddit Clone App'
}

export default function RootLayout({
  children
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}