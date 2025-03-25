"use client";

import { Button } from "@/components/ui/button";

interface FAQOption {
  id: string;
  question: string;
}

interface FAQOptionsProps {
  options: FAQOption[];
  onSelectFAQ: (question: string) => void;
}

export function FAQOptions({ options, onSelectFAQ }: FAQOptionsProps) {
  return (
    <div className="space-y-2 my-3">
      <p className="text-xs text-muted-foreground">
        Frequently Asked Questions:
      </p>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className="text-left font-light justify-start h-auto py-2 text-xs rounded-2xl"
            onClick={() => onSelectFAQ(option.question)}>
            {option.question}
          </Button>
        ))}
      </div>
    </div>
  );
}
