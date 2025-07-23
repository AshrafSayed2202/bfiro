import { PiStarFourFill } from "react-icons/pi";
import { motion } from "framer-motion";

const Stars = () => {
  const starVariants = (index) => ({
    initial: {
      scale: index == 0 ? 1.0 : index == 1 ? 0.5 : 0.3,
      opacity: index == 0 ? 1.0 : index == 1 ? 0.5 : 0.3,
    },
    hover: {
      scale: index == 0 ? 0.3 : 0.8,
      opacity: index == 0 ? 0.3 : 1,
      transition: {
        duration: 1,
        delay: index * 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  });

  return (
    <div className="relative size-[26px]">
      <motion.div
        variants={starVariants(0)}
        className="text-white absolute top-[4px] right-0"
      >
        <PiStarFourFill />
      </motion.div>
      <motion.div
        variants={starVariants(1)}
        className="text-white absolute top-[-3px] left-[-5px]"
      >
        <PiStarFourFill />
      </motion.div>
      <motion.div
        variants={starVariants(2)}
        className="text-white absolute bottom-[-3px] left-[-5px]"
      >
        <PiStarFourFill />
      </motion.div>
    </div>
  );
};

export default Stars;
