import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  title: string;
  path: string;
};

type Props = {
  items: Item[];
};

export function AnimatedNavigationTabs({ items }: Props) {
  const [active, setActive] = useState<Item>(items[0]);
  const [isHover, setIsHover] = useState<Item | null>(null);
  const navigate = useNavigate();
  
  const handleClick = (item: Item) => {
    setActive(item);
    navigate(item.path);
  };
  
  return (
    <nav className="stroke-lime-100 w-full border-b bg-cyan-50 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-14">
          {items.map((item) => (
            <button
              key={item.id}
              className={cn(
                "py-2 relative duration-300 transition-colors hover:!text-primary",
                active.id === item.id ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleClick(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <div className="px-5 py-2 relative">
                {item.title}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover-bg"
                    className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                    style={{ borderRadius: 6 }}
                  />
                )}
              </div>
              {active.id === item.id && (
                <motion.div
                  layoutId="active"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
              {isHover?.id === item.id && (
                <motion.div
                  layoutId="hover"
                  className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
}