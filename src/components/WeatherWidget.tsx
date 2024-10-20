import React, { useEffect } from "react";

export default function ElfsightWidget() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="elfsight-app-565ec873-cac7-4c30-9478-118f4cd9b2ff"
      style={{ zoom: 0.8 }}
      data-elfsight-app-lazy
    ></div>
  );
}
