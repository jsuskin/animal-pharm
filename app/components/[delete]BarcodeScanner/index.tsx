"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";

const Scanner = dynamic(() => import("./Scanner").then((mod) => mod.Scanner), {
  ssr: false,
  loading: () => (
    <div className='p-4 text-center text-gray-400 border border-dashed rounded-lg'>
      Loading scanner...
    </div>
  ),
});

interface State {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: ReactNode;
}

class ScannerErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("DEBUG Scanner Error Boundary caught:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className='p-4 bg-red-100 text-red-800 rounded border border-red-300 text-xs text-center'>
          <p className='font-bold'>A client-side crash occurred:</p>
          <p className='font-mono mt-1'>
            {this.state.error ? this.state.error.message : "Unknown error"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function BarcodeScanner() {
  return (
    <ScannerErrorBoundary>
      <Scanner />
    </ScannerErrorBoundary>
  );
}
