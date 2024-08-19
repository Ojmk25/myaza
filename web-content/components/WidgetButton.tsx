import React, { useEffect } from "react";
declare global {
  interface Window {
    JSD: any; // You can replace `any` with a more specific type if you know it
  }
}
const WidgetButton = () => {
  useEffect(() => {
    // Load the Jira Service Desk Widget script
    const script = document.createElement("script");
    script.setAttribute("data-jsd-embedded", "true");
    script.setAttribute("data-key", "your-key-here");
    script.setAttribute("data-base-url", "https://jsd-widget.atlassian.com");
    script.src = "https://jsd-widget.atlassian.com/assets/embed.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openJiraWidget = () => {
    // Trigger the Jira Service Desk widget
    if (window.JSD) {
      window.JSD.showWidget();
    }
  };

  return (
    <button
      onClick={openJiraWidget}
      className="your-custom-button-class"
      style={{
        padding: "10px 20px",
        backgroundColor: "#0052CC",
        color: "#fff",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Submit Feedback
    </button>
  );
};

export default WidgetButton;
