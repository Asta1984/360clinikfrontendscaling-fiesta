import { useState } from "react";
import { motion } from "framer-motion";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/disclosure";
import { Circle } from "lucide-react";
import { Button } from "./ui/button";



export default function DocProfileCard() {
  const [isOpen, setIsOpen] = useState(false);

  const imageVariants = {
    collapsed: { scale: 1, filter: "blur(0px)" },
    expanded: { scale: 1.1, filter: "blur(3px)" },
  };

  const contentVariants = {
    collapsed: { opacity: 0, y: 0 },
    expanded: { opacity: 1, y: 0 },
  };

  const transition = {
    type: "spring",
    stiffness: 26.7,
    damping: 4.1,
    mass: 0.2,
  };

  return (
    <div className="relative h-[350px] w-[290px] overflow-hidden rounded-xl">
      <div onClick={() => setIsOpen(!isOpen)}>
        <motion.img
          src="https://apollosage.in/assets/images/doctors/dr-akhil-tiwari.webp"
          alt="doctor profile card"
          className="pointer-events-none h-auto w-full select-none"
          animate={isOpen ? "expanded" : "collapsed"}
          variants={imageVariants}
          transition={transition}>
          </motion.img>
          <div className="absolute flex items-center top-3 left-3 p-2 border rounded-3xl border-primary rounded">
             <Circle className="h-2 w-2 fill-rose-500/80" />
              <p className="ml-1 text-xs">Bhopal</p>
          </div>

      
      </div>
      <Disclosure
        onOpenChange={setIsOpen}
        open={isOpen}
        className="absolute bottom-0 left-0 right-0 rounded-xl bg-zinc-900 px-4 pt-2 dark:bg-zinc-50"
        variants={contentVariants}
        transition={transition}
      >
        <DisclosureTrigger>
          <button
            className="w-full pb-2 text-left text-[14px] font-medium text-white dark:text-zinc-900"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
          Dr. Akhil Tiwari
          </button>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="flex flex-col pb-4 text-[13px] text-zinc-300 dark:text-zinc-700">
            <p>Dr. Akhil Kumar Tiwari is the top internal medicine physician in Bhopal. He has 37 years of rich experience in the internal medicine field. He has expertise in treating and management of infectious disease</p>
            <Button variant={"secondary"} className="mt-3">
              Book consultation
            </Button>
          </div>
        </DisclosureContent>
      </Disclosure>
    </div>
  );
}
