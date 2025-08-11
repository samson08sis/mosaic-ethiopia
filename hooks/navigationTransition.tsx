"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useNavigationTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  const handleNavigate = () => {
    setIsTransitioning(true);
  };

  return { isTransitioning, handleNavigate };
};
