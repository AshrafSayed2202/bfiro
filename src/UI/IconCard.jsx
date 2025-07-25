const IconCard = ({ header, text, children, headerClass, textClass }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-[8px] md:gap-[10px]">
      <span className="rounded-full sizt-[50px] p-[10px] md:p-0 md:size-[84px] bg-[#5B5E79] flex items-center  justify-center ">
        {children}
      </span>
      <h2 className={`text-[16px] md:text-[24px] text-white font-[600] text-nowrap ${headerClass}`}>
        {header}
      </h2>
      <p className={`text-[12px] md:text-[18px] text-[#9CA7B4] font-[300] ${textClass}`}>
        {text}
      </p>
    </div>
  );
};
export default IconCard;
