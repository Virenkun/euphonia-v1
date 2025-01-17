import NoInternetComponent from "@/components/no-internet-component";
import React, { useState, useEffect } from "react";

const NoInternetProvider = (props: { children: React.ReactNode }) => {
  // State variable to track the internet connection
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    // Set the initial state based on the navigator's online status
    setOnline(navigator.onLine);

    // Define event listeners
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Render based on the `isOnline` state
  if (isOnline) {
    return <>{props.children}</>;
  } else {
    return <NoInternetComponent />;
  }
};

export default NoInternetProvider;
