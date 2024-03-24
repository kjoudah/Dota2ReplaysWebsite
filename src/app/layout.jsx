import Navbar from "@/components/Navbar/Navbar";
import "./theme.css";
import { PrimeReactProvider } from "primereact/api";

export const metadata = {
  title: "Dota 2 Replays",
  description: "Dota 2 Replays of your favourite pro!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body>
          <Navbar></Navbar>
          {children}
        </body>
      </PrimeReactProvider>
    </html>
  );
}
