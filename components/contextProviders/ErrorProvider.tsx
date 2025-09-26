'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast"

type ErrorContextType = {
  message: string | null;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useGlobalError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) throw new Error("useGlobalError must be used inside ErrorProvider");
  return ctx;
};

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setMessage(customEvent.detail);
    };
    window.addEventListener("axios-error", handler);
    return () => window.removeEventListener("axios-error", handler);
  }, []);

  useEffect(() => {
    if (message) {
      toast.error(message);
      setMessage(null);
    }
  }, [message])

  return (
    <ErrorContext.Provider value={{ message }}>
      {children}
    </ErrorContext.Provider>
  );
};