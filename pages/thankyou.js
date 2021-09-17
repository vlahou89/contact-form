import React from "react";
import { motion } from "framer-motion";

function thankyou() {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: -100 },
  };
  return (
    <div className="flex h-screen bg-gradient-to-l md:bg-gradient-to-r from-purple-900   to-purple-700">
      <div className="m-auto">
        <motion.div
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: "linear" }}
        >
          <div className="   bg-green-300  max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl border-white border-3 ">
            <p className="font-semibold text-center text-3xl  p-6">
              Thank you !
            </p>
            <p className="p-5 text-lg leading-loose text-center   ">
              {" "}
              Your message has been received and we will get back to you as soon
              as possible.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default thankyou;
