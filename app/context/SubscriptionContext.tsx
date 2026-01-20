"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SubscriptionType = "free" | "individual" | "organization";

interface SubscriptionContextType {
  subscription: SubscriptionType;
  setSubscription: (type: SubscriptionType) => void;
  allowedCourses: string[];
  setAllowedCourses: (courses: string[]) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] =
    useState<SubscriptionType>("free");

  const [allowedCourses, setAllowedCourses] = useState<string[]>([]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        setSubscription,
        allowedCourses,
        setAllowedCourses,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscription must be used inside SubscriptionProvider"
    );
  }
  return context;
}
