import { motion } from "framer-motion"
const Card = ({ children, animateInint, animateWhileInView, animateTransition, className }) => {
    return (
        <motion.div
            initial={animateInint}
            whileInView={animateWhileInView}
            transition={animateTransition || { duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            className={`rounded-[20px] bg-[#171718CC] overflow-hidden p-[35px] md:p-10 ${className}`}>
            {children}
        </motion.div>
    )
}
export default Card