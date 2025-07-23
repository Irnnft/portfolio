// app/proyek/page.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import React, { useState } from "react";

// DATA PROYEK - Ganti dengan proyek Anda
const deployedProjects = [
  {
    title: "Website Translate",
    description: "Website Untuk Mentranslate dari berbagai bahasa ke Indonesia atau sebaliknya",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "Shadcn"],
    link: "https://letlettranslete.vercel.app/", // Ganti dengan link website yang sudah di-deploy
    image: "/web1.png", // Ganti dengan screenshot proyek Anda di folder `public` (rekomendasi rasio 16:9)
  },
  {
    title: "Undangan Wedding WEB",
    description: "Platform Undangan Wedding Online berbasis website",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion","Reactbits","lucid React"],
    link: "https://ourwedding-xi.vercel.app/", // Ganti dengan link website yang sudah di-deploy
    image: "/web2.png", // Ganti dengan screenshot proyek Anda di folder `public`
  },
];

// DATA POSTER - Ganti dengan poster Anda
const posters = [
  {image: "/poster dragon.jpg" }, // Gambar poster di folder `public`
  {image: "/poster hope.jpg" },
  {image: "/poster korupsi.jpg" },
  {image: "/poster Guardian.jpg" },
  {image: "/poster love.jpg" },
  {image: "/poster VISION.jpg" },
  {image: "/poster future.jpg" },
  {image: "/poster asssasins creed.jpg" },
];

// PENINGKATAN #1: Komponen Kartu Proyek yang Ditingkatkan
const ProjectCard = ({ project, index }: { project: typeof deployedProjects[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-gray-800/50 border border-gray-700/80 rounded-xl overflow-hidden shadow-lg group flex flex-col backdrop-blur-sm"
  >
    <div className="relative h-56 w-full overflow-hidden">
      <Image 
        src={project.image} 
        alt={project.title} 
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold mb-2 text-gray-100">{project.title}</h3>
      <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <span key={i} className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold px-2.5 py-1 rounded-full">{t}</span>
        ))}
      </div>
      <Link href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
        <span className="inline-flex items-center font-semibold text-red-400 hover:text-red-300 transition-colors duration-300 group/link">
          Kunjungi Website <ArrowUpRight className="ml-1 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" size={20} />
        </span>
      </Link>
    </div>
  </motion.div>
);

// PENINGKATAN #2: Galeri Poster Interaktif dengan Lightbox
const PosterGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {posters.map((poster, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group shadow-lg cursor-pointer"
            onClick={() => setSelectedImage(poster.image)}
            layoutId={poster.image}
          >
            <Image src={poster.image} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-end p-4">
              <p className="text-white font-bold text-sm md:text-base opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">{poster.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div className="relative" layoutId={selectedImage} onClick={(e) => e.stopPropagation()}>
              <Image src={selectedImage} alt="Tampilan Penuh" width={800} height={1070} className="max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl" />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default function ProjectsPage() {
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
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 variants={itemVariants} className="text-5xl font-extrabold text-center mb-6">
        Karya & <span className="text-red-500">Proyek</span>
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-gray-400 text-center mb-20 max-w-3xl mx-auto">
        Berikut adalah beberapa proyek pilihan yang telah saya kerjakan, dari aplikasi web fungsional hingga desain visual yang menarik.
      </motion.p>

      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="text-4xl font-bold mb-12 text-center">Proyek Unggulan</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {deployedProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <h2 className="text-4xl font-bold mb-12 text-center">Galeri Desain</h2>
        <PosterGallery />
      </motion.section>
    </motion.div>
  );
}