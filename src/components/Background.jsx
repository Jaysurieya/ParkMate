import React from "react";
import "../css/Background.css";

const DottedBackground = ({ children }) => {
  return (
    <div className="animated-dots">
      {children}
    </div>
  );
};

export default DottedBackground;
