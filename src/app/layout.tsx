import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

/* Faces are NOT locked — BRAND.md §2. This is the Brand Playbook's own recorded
   placeholder pairing, self-hosted through next/font so the page makes no
   external font request. Swap here when the type decision is taken. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dofrane Acquisitions",
  description:
    "Commercial real estate acquisition and asset management in Maryland and the Mid-Atlantic.",
};

/* Dark is the default (§5). This runs before paint so the correct theme is on
   the document from the first frame — without it the page flashes light. */
const themeScript = `
(function(){try{
  var t = localStorage.getItem('theme') || 'dark';
  var dark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}catch(e){document.documentElement.classList.add('dark');}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
