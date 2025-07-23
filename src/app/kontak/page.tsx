// app/kontak/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
// PERUBAHAN #1: Mengimpor ikon yang relevan
import { Instagram, Github, MessageCircle } from "lucide-react";
import React from "react";

// PERUBAHAN #2: Memperbarui data kontak
const contactLinks = [
  { 
    icon: Instagram, 
    label: "Instagram", 
    handle: "@irn.nft", // Ganti dengan username Instagram Anda
    href: "https://instagram.com/irn.nft" // Ganti dengan URL profil Instagram Anda
  },
  { 
    // Menggunakan MessageCircle sebagai representasi WhatsApp
    icon: MessageCircle, 
    label: "WhatsApp", 
    handle: "+62 822-7398-7084", // Ganti dengan nomor WhatsApp Anda
    // Pastikan format nomor benar (kode negara tanpa +)
    href: "https://wa.me/6282273987084" 
  },
  { 
    icon: Github, 
    label: "GitHub", 
    handle: "irnnft", // Username GitHub Anda
    href: "https://github.com/irnnft" // URL profil GitHub Anda
  },
];

// Komponen Kartu Kontak yang disederhanakan
const ContactCard = ({ link, index }: { link: typeof contactLinks[0], index: number }) => {
  
  const CardContent = () => (
    <div className="relative bg-gray-800/50 border border-gray-700/80 p-6 rounded-xl shadow-lg h-full backdrop-blur-sm flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-red-500/50">
      <div className="absolute -top-5">
        <div className="bg-gray-800 border-2 border-red-500 p-3 rounded-full">
          <link.icon className="text-red-400" size={28} />
        </div>
      </div>
      <div className="pt-8">
        <h3 className="text-xl font-bold mb-1 text-gray-100">{link.label}</h3>
        <p className="text-gray-400 break-words text-sm">{link.handle}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link href={link.href} target="_blank" rel="noopener noreferrer" className="no-underline">
        <CardContent />
      </Link>
    </motion.div>
  );
};

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-6">
          Mari <span className="text-red-500">Terhubung</span>
        </h1>
        <p className="text-lg text-gray-400 mb-16">
          Saya selalu terbuka untuk diskusi, kolaborasi, atau sekadar menyapa. Jangan ragu untuk menghubungi saya melalui salah satu platform di bawah ini.
        </p>
      </motion.div>

      {/* PERUBAHAN #3: Menyesuaikan grid untuk 3 item */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
      >
        {contactLinks.map((link, index) => (
          <ContactCard key={link.label} link={link} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}