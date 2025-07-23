// app/(components)/sections/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/proyek", label: "Proyek" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // PENINGKATAN #1: State untuk melacak item yang di-hover untuk animasi underline
  const [hoveredPath, setHoveredPath] = useState(pathname);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black border-b border-gray-500/20 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">
            Irfan NP.
          </Link>

          {/* Navigasi Desktop */}
          <nav 
            className="hidden md:flex items-center space-x-8"
            // Reset hover state saat kursor meninggalkan area navigasi
            onMouseLeave={() => setHoveredPath(pathname)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive ? 'text-red-500' : 'text-gray-300'
                  }`}
                  // Atur path yang di-hover saat kursor masuk
                  onMouseEnter={() => setHoveredPath(link.href)}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* PENINGKATAN #2: Underline kini mengikuti hover & link aktif */}
                  {hoveredPath === link.href && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-red-500"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 z-50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-0 left-0 w-full h-screen bg-black"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-4">
              {navLinks.map((link) => {
                 const isActive = pathname === link.href;
                 return (
                   // PERBAIKAN #1: Struktur JSX yang benar
                   <motion.div key={link.href} variants={linkVariants} className="w-full px-8">
                     <Link
                       href={link.href}
                       onClick={() => setIsOpen(false)}
                       className={`block w-full text-center py-4 rounded-md text-xl transition-colors ${
                         isActive ? 'font-bold text-gray-900 bg-red-500' : 'text-gray-300 hover:bg-gray-800'
                       }`}
                     >
                       {link.label}
                     </Link>
                   </motion.div>
                 );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};