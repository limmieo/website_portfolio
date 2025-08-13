'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ClientLogo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ClientsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Company logos from the company-logos folder
  const clientLogos: ClientLogo[] = [
    { 
      src: '/images/company-logos/Grammarly_Primary_Lockup_Light_BG.png', 
      alt: 'Grammarly', 
      width: 150, 
      height: 40 
    },
    { 
      src: '/images/company-logos/TurboTax-logo.jpg', 
      alt: 'TurboTax', 
      width: 150, 
      height: 40 
    },
    { 
      src: '/images/company-logos/candy-crush-seeklogo.png', 
      alt: 'Candy Crush', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/company-logos/chumba casino.png', 
      alt: 'Chumba Casino', 
      width: 150, 
      height: 40 
    },
    { 
      src: '/images/company-logos/crypto-com-vector-logo.svg', 
      alt: 'Crypto.com', 
      width: 150, 
      height: 40 
    },
    { 
      src: '/images/company-logos/logo_star_trek-1-768x270.webp', 
      alt: 'Star Trek', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/company-logos/monster Never Crylogo.webp', 
      alt: 'Monster Never Cry', 
      width: 120, 
      height: 40 
    },
    { 
      src: '/images/company-logos/raid shaodow legends.png', 
      alt: 'Raid: Shadow Legends', 
      width: 120, 
      height: 40 
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('clients-section');
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.8) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="clients-section" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I've had the privilege to work with some amazing companies throughout my career
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.05 }}
              className="relative h-16 w-32 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 40}
                className="object-contain h-full w-full grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
