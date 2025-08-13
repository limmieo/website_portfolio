'use client';

import { motion } from 'framer-motion';

const ProjectSkeleton = () => {
  // Create an array of 6 items for the skeleton grid
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skeletonItems.map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: item * 0.1 }}
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          {/* Skeleton for image */}
          <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          
          <div className="p-6 space-y-4">
            {/* Skeleton for title */}
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            
            {/* Skeleton for description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            
            {/* Skeleton for tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 3 }, (_, i) => (
                <div 
                  key={i} 
                  className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" 
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
