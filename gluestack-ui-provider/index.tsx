import React from "react";
import { GluestackUIProvider as GSProvider } from "@gluestack-ui/themed";
import { config } from "./config";

export const GluestackUIProvider = ({ children }: { children: React.ReactNode }) => {
  return <GSProvider config={config}>{children}</GSProvider>;
};
