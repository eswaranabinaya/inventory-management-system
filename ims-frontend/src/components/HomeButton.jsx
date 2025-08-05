import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      onClick={() => navigate("/home")}
      aria-label="Go to Home"
      title="Go to Home"
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <svg className="w-7 h-7" fill="white" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6m5 0h-14a1 1 0 01-1-1v-8.586a1 1 0 01.293-.707l7-7a1 1 0 011.414 0l7 7a1 1 0 01.293.707v8.586a1 1 0 01-1 1z" />
      </svg>
    </button>
  );
};

export default HomeButton;