// app/(components)/sections/footer.tsx
"use client";

import Link from "next/link";
import { Github, Linkedin, Dribbble, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
    { icon: Github, href: "https://github.com/irfannp", label: "GitHub" },
    { icon: Instagram, href: "https://instagram.com/irn.nft", label: "Instagram" },
]

export const Footer = () => {
  return (
    // PENINGKATAN #1: Desain lebih menyatu & animasi fade-in
    <motion.footer 
      className="bg-black border-t border-red-500/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Irfan Nurfathoni Putra. All Rights Reserved.
            </p>
            {/* PENINGKATAN #2: Sentuhan personal yang menunjukkan keahlian */}
            <p className="text-xs text-gray-500 mt-1">
              Dibuat dengan <span className="text-red-400/80">Next.js</span> & Secangkir Kopi di Pekanbaru.
            </p>
          </div>
          
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              // PENINGKATAN #3: Ikon sosial yang lebih interaktif dan menarik
              <motion.div
                key={link.href}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.label}
                  className="group block p-3 bg-gray-800/50 border border-gray-700 rounded-full hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <link.icon className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.footer>
  );
};