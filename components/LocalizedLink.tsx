"use client";

import Link from "next/link";
import { MouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useNavigationTransition } from "@/contexts/NavigationTransitionContext";

interface LocalizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>, path: string) => void;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  target?: string;
}

export default function LocalizedLink({
  href,
  children,
  className,
  onClick,
  replace,
  scroll,
  shallow,
  target,
}: LocalizedLinkProps) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";

  const localizedHref = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
  const { handleNavigate } = useNavigationTransition();

  const handleInternalClick = (
    e: MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    handleNavigate();
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    handleInternalClick(e, localizedHref);
    if (onClick) {
      onClick(e, localizedHref);
    }
  };

  return (
    <Link
      href={localizedHref}
      target={target}
      className={className}
      onClick={handleClick}
      replace={replace}
      scroll={scroll}
      shallow={shallow}>
      {children}
    </Link>
  );
}
