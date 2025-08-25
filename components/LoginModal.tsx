"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import AuthForm from "./auth/AuthForm";
import { useModal } from "@/contexts/ModalContext";

export default function LoginModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalType, isOpen, closeModal } = useModal();

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    if (isOpen && modalType === "login") {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isOpen, modalType, closeModal]);

  // Handle escape key press
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || modalType !== "login") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Get Started
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">
          <AuthForm onSuccess={closeModal} />
        </div>
      </div>
    </div>
  );
}
