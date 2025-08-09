import React, { useState } from "react";
import { BounceLoader } from "react-spinners";

function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <BounceLoader 
          color="#ff69b4" 
          loading={loading} 
          size={80} 
          aria-label="Loading Bounce" 
        />
      )}
    </div>
  );
}

export default LoadingSpinner;
