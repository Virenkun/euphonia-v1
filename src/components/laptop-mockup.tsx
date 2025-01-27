import React from "react";
import PropTypes from "prop-types";

interface LaptopMockupProps {
  src: string;
  className?: string;
  muted?: boolean;
  loop?: boolean;
}

const LaptopMockup: React.FC<LaptopMockupProps> = ({
  src,
  muted = true,
  loop = true,
  className,
}) => {
  const videoRef = React.useRef(null);

  return (
    <div className="relative mx-auto">
      {/* Laptop Frame */}
      <div className="border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
        <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
          <video
            ref={videoRef}
            className={`w-full object-fill rounded-lg ${className} border-4 border-purple-500 p-2`}
            autoPlay
            muted={muted}
            loop={loop}
            playsInline
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* Bottom Stand */}
      <div className="relative bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px] mx-auto">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
      </div>
    </div>
  );
};

LaptopMockup.propTypes = {
  src: PropTypes.string.isRequired,

  className: PropTypes.string,
  loop: PropTypes.bool,
};

export default LaptopMockup;
