import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 0.9, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-green-400 rounded md:h-dvh md:w-2xl relative z-50"
        >
          <div className="p-0.5 flex justify-end">
            <button onClick={() => setIsOpen(false)}>
              <X className="rounded bg-amber-600 hover:bg-orange-700 hover:scale-90 transition-all" />
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-white  text-xl">Demo Patient Credentials.</h2>
            <p className="text-white">Email: Patient1@example.com</p>
            <p className="text-white">Pass: password123</p>
            <h2 className="text-white text-xl">Demo Doctor Credentials.</h2>
            <p className="text-white">Email: Doctor1@example.com</p>
            <p className="text-white">Pass: password123</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
