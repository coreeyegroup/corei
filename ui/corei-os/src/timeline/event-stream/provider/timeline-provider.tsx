/**
 * COREI OS — Stage 25 / Phase 03 / Step 07
 * Module: timeline-provider
 * Layer: Provider
 * Responsibility: react timeline context boundary
 */

import React, { createContext, useContext } from "react";
import { TimelineRuntime } from "../runtime/timeline-runtime";

const TimelineContext = createContext<any>(null);

export const TimelineProvider = ({ children }: any) => {

  return (
    <TimelineContext.Provider value={TimelineRuntime}>
      {children}
    </TimelineContext.Provider>
  );

};

export const useTimeline = () => useContext(TimelineContext);
