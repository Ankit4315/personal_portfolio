import React, { Component } from 'react';
import { Button } from './ui/button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background text-foreground">
          <div className="w-full max-w-md space-y-6 p-8 border rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
            <p className="mb-4">An error occurred while rendering this component.</p>
            
            <div className="p-4 rounded bg-muted mb-4 overflow-auto">
              <p className="font-mono text-sm">{this.state.error && this.state.error.toString()}</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => window.location.href = "/"}>
                Return to Home
              </Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 