const IconCard = ({ header, text, children, headerClass, textClass }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center  gap-[10px]">
      <span className="rounded-full size-[84px] bg-[#5B5E79] flex items-center  justify-center ">
        {children}
      </span>
      <h2 className={`text-[28px] text-white font-[700]  ${headerClass}`}>
        {header}
      </h2>
      <p className={`text-[20px] text-[#9CA7B4] font-[400] ${textClass}`}>
        {text}
      </p>
    </div>
  );
};
export default IconCard;
