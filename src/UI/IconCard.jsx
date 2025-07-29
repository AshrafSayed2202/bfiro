import { useState, useEffect, useRef } from 'react';

const IconCard = ({ header, text, children, headerClass, textClass, isIncreasing = false }) => {
  const isNumber = typeof header === 'number';
  const [displayValue, setDisplayValue] = useState(isIncreasing && isNumber ? 0 : header);
  const ref = useRef(null);

  useEffect(() => {
    if (!isIncreasing || !isNumber) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const duration = 3000; // 3 seconds
        const start = Date.now();
        const endValue = header;

        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - start) / duration, 1);
          setDisplayValue(Math.floor(progress * endValue));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        observer.disconnect(); // Animate only once
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isIncreasing, isNumber, header]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center gap-[8px] md:gap-[10px]">
      <span className="rounded-full size-[50px] p-[10px] md:p-0 md:size-[84px] bg-[#5B5E79] flex items-center justify-center ">
        {children}
      </span>
      <h2 className={`text-[16px] md:text-[24px] text-white font-[600] text-nowrap ${headerClass}`}>
        {isIncreasing && isNumber ? displayValue : header}
      </h2>
      <p className={`text-[12px] md:text-[18px] text-[#9CA7B4] font-[300] ${textClass}`}>
        {text}
      </p>
    </div>
  );
};

export default IconCard;