// app/tentang/page.tsx
"use client";

import { motion } from "framer-motion";
import { Figma, Code, GitMerge, Palette, Puzzle, GraduationCap, Sparkles, Code2 } from "lucide-react";
import React from "react";

// Data untuk Timeline
const timelineEvents = [
  {
    icon: Sparkles,
    date: "Awal Perjalanan",
    title: "Tertarik pada Desain Visual",
    description: "Awalnya, saya terpikat oleh bagaimana antarmuka yang dirancang dengan baik dapat membuat teknologi yang rumit menjadi mudah digunakan dan menyenangkan."
  },
  {
    icon: GraduationCap,
    date: "2023 - Sekarang",
    title: "Studi Teknik Informatika di UIN Suska Riau",
    description: "Memulai pendidikan formal yang memberikan fondasi kuat dalam logika pemrograman dan ilmu komputer, sambil terus mengasah minat pada desain."
  },
  {
    icon: Code2,
    date: "Fokus Saat Ini",
    title: "Menjembatani Desain dan Kode",
    description: "Perjalanan saya membawa saya untuk belajar bagaimana mewujudkan desain menjadi produk hidup melalui koding, mengubah ide di Figma menjadi website yang interaktif."
  }
];

// Data untuk Keahlian
const skills = {
  "UI Design": { icon: Figma, items: ["Figma", "Prototyping", "Desain Sistem"] },
  "Front-end Development": { icon: Code, items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"] },
  "Tools": { icon: GitMerge, items: ["GitHub", "VS Code"] },
  "Desain Grafis": { icon: Palette, items: ["Desain Poster", "Ilustrasi Dasar"] },
};

// PENINGKATAN #1: Komponen Kartu Keahlian yang Modern dan Interaktif
const SkillCard = ({ category, icon: Icon, items, index }: { category: string, icon: React.ElementType, items: string[], index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    whileHover={{ scale: 1.03, y: -5 }}
    className="bg-gray-800/50 border border-gray-700/80 p-6 rounded-xl shadow-lg h-full backdrop-blur-sm"
  >
    <div className="flex items-center mb-4 text-red-500">
      <Icon className="mr-3" size={28} />
      <h3 className="text-2xl font-bold text-gray-100">{category}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <span key={i} className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-medium px-3 py-1.5 rounded-md">
          {item}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className="text-5xl font-extrabold text-center mb-6">
        Tentang <span className="text-red-500">Saya</span>
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-20">
        Perjalanan saya dalam dunia digital, dari percikan ide pertama hingga menjadi seorang kreator antarmuka yang fungsional dan menarik.
      </motion.p>
      
      {/* PENINGKATAN #2: Visualisasi Perjalanan dengan Timeline */}
      <motion.section variants={itemVariants} className="mb-24">
        <div className="relative max-w-3xl mx-auto">
          {/* Garis vertikal di tengah */}
          <div className="absolute left-1/2 top-4 h-full w-0.5 -translate-x-1/2 bg-gray-700" />
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className="relative mb-12 flex items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={`flex w-full items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8 text-right'}`}>
                  <div className="p-5 rounded-xl bg-gray-800/80 border border-gray-700 shadow-md backdrop-blur-sm">
                    <p className="text-sm font-semibold text-red-400 mb-1">{event.date}</p>
                    <h3 className="text-xl font-bold text-gray-100 mb-2">{event.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
              {/* Titik dan ikon di garis tengah */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 border-2 border-red-500">
                <event.icon className="h-5 w-5 text-red-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Keahlian Utama */}
      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="text-4xl font-bold text-center mb-12">Keahlian Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {Object.entries(skills).map(([category, skillProps], index) => (
            <SkillCard key={category} category={category} {...skillProps} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Di Luar Kode dan Desain */}
      <motion.section variants={itemVariants}>
        <h2 className="text-4xl font-bold text-center mb-12">Di Luar Kode & Desain</h2>
        <div className="bg-gray-800/50 border border-gray-700/80 p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 150 }}
            className="bg-red-500/10 p-5 rounded-full"
          >
            <Puzzle size={60} className="text-red-400" />
          </motion.div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-3">Pemecah Masalah Strategis</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Saat tidak di depan layar, saya sering bermain catur. Hobi ini melatih saya berpikir strategis dan memecahkan masalah dengan sabar—filosofi yang saya bawa saat merancang alur pengguna yang logis maupun saat menulis kode yang efisien.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}