
export default function manifest() {
  return {
    name: 'DineDiscover - Multi Restaurant Finder',
    short_name: 'DineDiscover',
    description: 'Discover elite dining experiences and popular destinations near you.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF6B35',
    icons: [
      {
        src: '/icon-192.png', // Next.js will serve app/icon-192.js as this
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // Next.js will serve app/icon-512.js as this
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
