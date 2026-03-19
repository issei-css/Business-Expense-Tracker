import { Component } from "react";

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || "Unexpected error",
    };
  }

  componentDidCatch(error, info) {
    console.error("Runtime render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-xl w-full bg-white border border-red-200 rounded-xl shadow-sm p-6">
            <h1 className="text-lg font-semibold text-red-700">
              Something went wrong
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              The app hit a runtime error. Check the browser console for
              details.
            </p>
            <pre className="mt-4 text-xs bg-gray-100 rounded-md p-3 overflow-auto text-red-700">
              {this.state.errorMessage}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
