/**
 * COREI OS — Stage 25 / Phase 03 / Step 06
 * Module: intelligence-provider
 * Layer: Provider
 * Responsibility: React intelligence context boundary
 */

import React, { createContext, useContext } from "react";
import { IntelligenceRuntime } from "../runtime/intelligence-runtime";

const IntelligenceContext = createContext<any>(null);

export const IntelligenceProvider = ({ children }: any) => {

  const runtime = new IntelligenceRuntime();

  return (
    <IntelligenceContext.Provider value={runtime}>
      {children}
    </IntelligenceContext.Provider>
  );

};

export const useIntelligence = () => useContext(IntelligenceContext);
