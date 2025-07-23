// app/layout.tsx

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Navbar } from './components/sections/navbar';
import { Footer } from './components/sections/footer';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Irfan Nurfathoni Putra: Front-end Developer & UI Designer",
  description: "Mengubah Ide menjadi Antarmuka Digital yang Fungsional dan Menarik. Portofolio pribadi Irfan Nurfathoni Putra.",
  metadataBase: new URL('https://nama-domain-anda.com'), 
  themeColor: '#000000',
  openGraph: {
    title: "Irfan Nurfathoni Putra: Front-end Developer & UI Designer",
    description: "Mengubah Ide menjadi Antarmuka Digital yang Fungsional dan Menarik.",
    images: '/og-image.png',
    type: 'website',
  },
};

const GridBackground = () => {
  return (
    <div className="absolute top-0 left-0 -z-50 h-full w-full bg-black">
      <div className="absolute inset-0 -z-40 h-full w-full bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
    </div>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // PERUBAHAN: Tambahkan bg-black di sini untuk memastikan
    <html lang="id" className="scroll-smooth bg-black">
      <body className={`${jakarta.className} bg-black text-gray-200 antialiased`}>
        <GridBackground />
        <Navbar />
        <main className="relative z-10 min-h-screen pt-20">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}