// app/page.tsx
"use client";

// Import yang diperlukan dari React, Next.js, Framer Motion, dan Lucide React
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useAnimation, 
  Variants
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// PEMBARUAN #1: Latar Belakang Baru - Grid Titik-titik (Dot Grid)
// Menggantikan efek spotlight dengan latar belakang grid yang memberikan nuansa
// modern, bersih, dan teknis. Efek mask membuat grid memudar di tepian.
const GridBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
  );
};

// Komponen Teks Animasi (tidak ada perubahan fungsional)
const AnimatedText = ({ text, el: Wrapper = 'p', className }: { text: string, el?: React.ElementType, className?: string }) => {
  const words = text.split(" ");
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
        {words.map((word, index) => (
          <motion.span variants={childVariants} key={index} style={{ display: 'inline-block', marginRight: '0.25em' }}>
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

// Komponen Konten Hero (disesuaikan dengan tema merah)
const HeroContent = () => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div 
      className="z-10 flex flex-col justify-center"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* PEMBARUAN #2: Palet Warna Merah */}
      <motion.span variants={itemVariants} className="text-red-500 font-medium tracking-wide">
        Halo, saya Irfan Nurfathoni Putra 👋
      </motion.span>

      <motion.div variants={itemVariants}>
        <AnimatedText
          el="h1"
          text="Mengubah Ide menjadi Antarmuka Digital yang Fungsional."
          className="text-4xl md:text-5xl font-extrabold tracking-tight my-4 text-gray-50"
        />
      </motion.div>

      <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-xl">
        Seorang mahasiswa dari UIN Suska Riau yang bersemangat dalam menciptakan pengalaman digital melalui UI Design dan Front-end Development.
      </motion.p>
      
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
        <Link href="/proyek" passHref>
          {/* PEMBARUAN #3: Tombol Utama dengan Aksen Merah */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="group bg-red-600 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto transition-all duration-300 hover:bg-red-500 flex items-center justify-center gap-2"
          >
            Lihat Karya Saya
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={20}/>
          </motion.button>
        </Link>
        <Link href="/kontak" passHref>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgb(239 68 68 / 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg w-full sm:w-auto transition-colors duration-300 hover:text-white"
          >
            Hubungi Saya
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

// Komponen Gambar Hero (disesuaikan dengan tema merah)
const HeroImage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [25, -25]);
  const rotateY = useTransform(x, [-150, 150], [-25, 25]);
  
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    controls.start({
      y: [0, -12, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
  }, [controls]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
      className="relative flex justify-center items-center z-10"
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        animate={controls}
        className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
      >
        {/* PEMBARUAN #4: Efek Cahaya dan Bayangan Merah */}
        <div className="absolute inset-0 bg-red-600/20 rounded-full blur-3xl"></div>
        <motion.div 
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-500/30 shadow-2xl shadow-red-500/20"
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(239, 68, 68, 0.4)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/profile.jpg"
            alt="Foto Irfan Nurfathoni Putra"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 18rem, (max-width: 1024px) 20rem, 24rem"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Komponen Halaman Utama yang merakit semua bagian
export default function HomePage() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg- text-white">
      <GridBackground />
      {/* Efek gradasi radial di tengah untuk memusatkan perhatian */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}