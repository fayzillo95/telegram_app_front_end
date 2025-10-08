"use client";
import React from "react";
import { QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={undefined}>{children}</Hydrate>
    </QueryClientProvider>
  );
}
