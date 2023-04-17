import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "FTC Region Ranking",
  description: "Rank the different regions by various stats",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={inter.style} className="h-screen">
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
