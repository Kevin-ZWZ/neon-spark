"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSound, type SoundType } from "@/lib/useSound";

interface SoundContextValue {
  play: (type: SoundType) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  play: () => {},
  muted: false,
  toggleMute: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSound();
  return <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>;
}

export function useSoundCtx() {
  return useContext(SoundContext);
}
