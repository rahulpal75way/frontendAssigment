import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("error bounday caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", color: "red" }}>
          <h2>⚠️ Something went wrong.</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.handleRetry}>🔄 Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
