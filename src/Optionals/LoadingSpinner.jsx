import React, { useState } from "react";
import {  RingLoader } from "react-spinners";

function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
       <RingLoader
    color="#7C3AED"   
    loading={loading}
    size={70}
    aria-label="Loading..."
  />
      )}
    </div>
  );
}

export default LoadingSpinner;
