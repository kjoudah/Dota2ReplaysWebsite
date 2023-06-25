import './globals.css';

export const metadata = {
  title: 'Dota 2 Replays',
  description: 'Dota 2 Replays of your favourite pro!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
