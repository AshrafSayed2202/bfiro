import React, { useState } from 'react';
import { motion } from 'framer-motion';
const PortfolioCard = ({ background, children, className }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative w-full overflow-hidden shadow-lg transition-all duration-300 cursor-pointer !h-[356px] ${className}`
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
        >
            <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{ backgroundImage: `url(${background})` }}
            ></div>
            <div className={`relative z-10 flex items-center justify-center h-full bg-[#171718CC] bg-opacity-50 ${isHovered ? '!bg-transparent' : ''}`}>
                {children}
            </div>
        </motion.div >
    );
};

export default PortfolioCard;