'use client';
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript, AppShell } from '@mantine/core';

// export const metadata = {
//   title: 'Dota 2 Replays',
//   description: 'Dota 2 Replays of your favourite pro!',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AppShell>
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
