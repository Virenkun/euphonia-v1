import Spinner from "@/components/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex align-middle justify-center items-center min-h-screen bg-[#4B4ACF]">
      <Spinner />
    </div>
  );
};

export default Loading;
