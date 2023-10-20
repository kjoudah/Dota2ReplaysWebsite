import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'Dota 2 Replays',
  description: 'Dota 2 Replays of your favourite pro!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
