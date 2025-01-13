'use client';

import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode; // エラー発生時に表示するコンポーネント
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // エラーが発生した場合に状態を更新
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // エラーをログに出力
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // エラー発生時にフォールバックを表示
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;