import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Back layer */}
      <div
        className="absolute -bottom-2 right-2 rounded-lg w-full h-full bg-gradient-to-r from-[#f4e7d6] to-[#f6dcba]
        md:-bottom-2 md:right-2"
      />

      {/* Front layer */}
      <button
        onClick={onClick}
        className="relative rounded-lg font-semibold flex items-center justify-center 
        duration-200 overflow-hidden w-full sm:w-auto min-w-[200px] min-h-[60px] px-5 py-4
        bg-gradient-to-r from-[#e84b7d] to-[#b02753] text-[#f4e7d6]
        active:translate-x-[-8px] active:translate-y-2
        md:min-w-[160px] md:min-h-[50px] md:text-base md:px-5 md:py-3
        md:active:translate-x-[-12px] md:active:translate-y-3"
      >
        {/* Icon */}
        <div className="absolute -bottom-[0.20rem] -left-0 p-0 md:w-6 md:h-6">
          <Image
            src="https://res.cloudinary.com/dmvdbpyqk/image/upload/v1736429049/dicklet_gpmasc.svg"
            alt={"buttons"}
            width={30}
            height={30}
          />
        </div>

        {children}
      </button>
    </div>
  );
};

export default Button;
