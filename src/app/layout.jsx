import './globals.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'Dota 2 Replays',
  description: 'Dota 2 Replays of your favourite pro!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
