import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Test() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} // Initial state
        whileInView={{ opacity: 1 }} // Target state
        className="grid grid-cols-3 gap-5 px-15 py-10"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }} // Initial state
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="h-75 bg-red-500 shadow-2xl"
        ></motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }} // Initial state
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="h-75 bg-red-500 shadow-2xl"
        ></motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }} // Initial state
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="h-75 bg-red-500 shadow-2xl"
        ></motion.div>
      </motion.div>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className={`fixed w-full h-screen bg-[#0cdcf7] top-0 z-10`}
          >
            <motion.button
              onClick={() => setIsVisible(false)}
              whileHover={{ scale: 1 }}
              className="bg-red-500 rounded-md text-white font-semibold px-4 py-2"
              whileTap={{ y: 1 }}
            >
              {isVisible ? "Hide" : "Show"}
            </motion.button>
            <input type="text" className="bg-white ps-1 py-2" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => {
          setIsVisible(true);
          console.log(isVisible);
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="bg-red-500 rounded-md cursor-pointer text-white font-semibold px-4 py-2 hover:bg-red-600"
      >
        {isVisible ? "Hide" : "Show"}
      </motion.button>
      <motion.div layout>ewfew</motion.div>
    </>
  );
}
