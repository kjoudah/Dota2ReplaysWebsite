'use client';
import './theme.css';
import { PrimeReactProvider } from 'primereact/api';

// export const metadata = {
//   title: 'Dota 2 Replays',
//   description: 'Dota 2 Replays of your favourite pro!',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* <ColorSchemeScript /> */}</head>
      <PrimeReactProvider>
        <body>{children}</body>
      </PrimeReactProvider>
    </html>
  );
}
