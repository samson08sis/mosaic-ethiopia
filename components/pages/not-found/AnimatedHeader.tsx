"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8">
      <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
      <div className="relative h-64 md:h-80 mb-8 mx-auto max-w-lg">
        <Image
          src="/images/404-cover.png"
          alt="Lost traveler"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Oops! You seem to be lost
      </h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        The page you're looking for has wandered off the map. It might have been
        moved, deleted, or perhaps never existed in the first place — much like
        those hidden gems waiting to be discovered on your next adventure.
      </p>
    </motion.div>
  );
}
