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
  const [isVisible, setIsVisible] = useState(true);

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

  // Always visible (no scroll-gated animation)
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // No carousel logic needed anymore

  return (
    <section id="clients-section" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Worked With</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-xl md:text-2xl">
            I've had the privilege to work with some amazing companies throughout my career
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 md:gap-20 max-w-6xl mx-auto">
          {clientLogos.map((logo, index) => (
            <motion.div
              key={`${logo.alt}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="relative h-32 sm:h-36 flex items-center justify-center p-4 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm"
            >
              <img
                src={encodeURI(logo.src)}
                alt={logo.alt}
                width={logo.width || 260}
                height={logo.height || 100}
                className="object-contain h-full w-full"
                loading="eager"
              />
              <span className="absolute bottom-1 left-1 right-1 text-center text-xs text-muted-foreground pointer-events-none">
                {logo.alt}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
