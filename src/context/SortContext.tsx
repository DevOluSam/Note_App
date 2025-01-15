"use client"
import { createContext, useContext, useState, ReactNode } from "react";

export type SortType = "alphabetical" | "creationDate" | "lastUpdated";

interface SortContextProps {
  sortType: SortType;
  setSortType: (type: SortType) => void;
}

const SortContext = createContext<SortContextProps | undefined>(undefined);

export const useSort = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};

// Provider Component
export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [sortType, setSortType] = useState<SortType>("creationDate");

  return (
    <SortContext.Provider value={{ sortType, setSortType }}>
      {children}
    </SortContext.Provider>
  );
};
