import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const StackingNavbar = () => {
  const [expanded, setExpanded] = useState(false);

  const items = [
    { path: "/", label: "Home" },
    { path: "/Signup", label: "Get Started" },
    { path: "/Signin", label: "Book Now" },
  ];

  return (
    <div
      className="flex items-center gap-x-2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {items.map((item, index) => (
        <StackingNavbarItem
          to={item.path}
          expanded={expanded}
          key={index}
          index={index}
        >
          {item.label}
        </StackingNavbarItem>
      ))}
    </div>
  );
};

interface StackingNavbarItemProps {
  to: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  expanded: boolean;
  index: number;
}

const StackingNavbarItem: React.FC<StackingNavbarItemProps> = ({
  to,
  children,
  style,
  expanded,
  index,
}) => {
  return (
    <motion.div
      initial={{ x: -100 * index }}
      animate={{ x: expanded ? 0 : -100 * index }}
      transition={{
        duration: 0.6,
        ease: "circInOut",
        delay: 0.1 * index,
        type: "spring",
      }}
      style={{ zIndex: 100 - index, ...style }}
    >
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center text-sm px-5 py-3 rounded-3xl bg-[#b0aaaa1a] no-underline backdrop-blur-lg transition-colors duration-300 ease-in-out
          ${isActive ? 'bg-slate-500 text-secondary' : 'text-accent hover:bg-slate-700 hover:text-blue-300'}`
        }
      >
        {children}
      </NavLink>
    </motion.div>
  );
};

export { StackingNavbar };