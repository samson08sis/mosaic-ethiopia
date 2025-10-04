"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface NavigationTransitionContextType {
  isTransitioning: boolean;
  handleNavigate: () => void;
}

const NavigationTransitionContext = createContext<
  NavigationTransitionContextType | undefined
>(undefined);

export const NavigationTransitionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(false);
  }, [pathname]);

  const handleNavigate = () => {
    setIsTransitioning(true);
  };

  return (
    <NavigationTransitionContext.Provider
      value={{ isTransitioning, handleNavigate }}>
      {children}
    </NavigationTransitionContext.Provider>
  );
};

export const useNavigationTransition = () => {
  const context = useContext(NavigationTransitionContext);
  if (!context) {
    throw new Error(
      "useNavigationTransition must be used within a NavigationTransitionProvider"
    );
  }
  return context;
};
