import React, { useState } from "react";
import { BounceLoader, ClipLoader } from "react-spinners";

function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
       <ClipLoader
    color="#8B5CF6"  
    loading={loading}
    size={60}
    aria-label="Loading..."
  />
      )}
    </div>
  );
}

export default LoadingSpinner;
