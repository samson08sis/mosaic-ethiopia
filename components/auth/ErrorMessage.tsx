import { AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

type ErrorMessageProps = {
  message: string;
  classNames?: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  const [shouldRender, setShouldRender] = useState<Boolean>(!!message);
  useEffect(() => {
    setShouldRender(message?.length > 0);
  }, [message]);

  useEffect(() => {
    if (message !== "") {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div
      className={`mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg flex items-start transition-all duration-300 ${
        shouldRender ? "opacity-100" : "opacity-0 scale-50 h-0 m-0"
      }`}>
      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
