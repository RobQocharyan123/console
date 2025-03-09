import React, { useEffect } from "react";
import "./LogoAnimation.css";
import { motion, useCycle } from "framer-motion";

const LogoAnimation = () => {
  const colors = ["#64FFFF ", "#FFFFFF"];
  const [color, cycleColor] = useCycle(...colors);

  useEffect(() => {
    const interval = setInterval(() => {
      cycleColor();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="logoAnimation">
      <svg
        width="319"
        height="319"
        viewBox="0 0 319 319"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M181.192 143.55L223.3 105.27V136.532L198.418 160.776L181.192 143.55Z"
          fill="#999999"
        />
        <path
          d="M95.7 176.726V145.464L181.192 223.938V254.959L95.7 176.726Z"
          fill="#999999"
        />
        <path
          d="M181.192 254.946V223.938L223.3 184.382V216.282L181.192 254.946Z"
          fill="#999999"
        />

        {/* This path changes color dynamically */}
        <motion.path
          d="M223.3 105.27L180.554 65.076L95.7 145.464L181.83 224.576L223.3 184.382L181.83 144.188L223.3 105.27Z"
          animate={{ fill: color }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <rect
          x="93.5221"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="99.9277"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="106.333"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="112.739"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="119.145"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="125.55"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="131.956"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <rect
          x="138.361"
          y="249.819"
          width="5.1245"
          height="5.1245"
          fill="#D9D9D9"
        />
        <motion.path
          d="M144.552 249.819H90.9598V254.923H144.552V249.819Z"
          fill={color}
          animate={{ fill: color }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default LogoAnimation;
