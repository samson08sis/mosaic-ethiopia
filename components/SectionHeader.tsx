import { ReactNode } from "react";

export default function SectionHeader({
  children,
}: {
  children: ReactNode | string;
}) {
  return (
    <div className="mx-auto px-10 w-fit">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-tr from-gray-900 dark:from-white via-gray-900 dark:via-white to-transparent bg-clip-text text-transparent">
        {children}
      </h2>
    </div>
  );
}
