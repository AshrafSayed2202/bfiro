import { useRef } from "react";

function CustomInput({
  id,
  label,
  required,
  value,
  children,
  hideErrorMessage,
  inputClass,
  spanClass,
  hasError,
  divClass,
  type,
  className,
  custom,
  style,
  ...others
}) {
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
  const labelRef = useRef();
  return (
    <label htmlFor={id} className={`relative group ${className}`}>
      {label && (
        <span
          ref={labelRef}
          className={`absolute top-0 left-5  px-2 z-[2] text-[16px] ${spanClass ? spanClass : ""} `}
        >
          {label} <span className="text-red-500 ">{required && "*"}</span>
        </span>
      )}
      <div
        className={`relative flex-1 w-full h-[56px] z-[1] mt-[11px] form-control ${divClass && divClass}`}
      >
        {custom ? (
          <>
            {children}
            {hasError && hasError?.status && (
              <div className="label absolute left-0 bottom-[-30px] !mt-1">
                <span className="text-red-500 truncate label-text-alt text-nowrap whitespace-nowrap">
                  {hasError?.message}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            {children}
            {type === "textarea" ? (
              <textarea
                value={value}
                className={`cursor-pointer !bg-white dark:!bg-[#323232] disabled:px-1 disabled:border-transparent disabled:text-[--main-black] disabled:cursor-default min-h-24 py-3 focus:cursor-text input text-base text-[#222] dark:text-[#eee] input-bordered dark:!border-[#eee] focus:border-[var(--main-color)] focus:outline-[var(--main-color)] w-full ${inputClass} ${hasError?.status && "focus:outline-red-500 border-red-500"}`}
                id={id}
                required={required}
                style={{
                  direction: arabicPattern.test(value) ? "rtl" : "ltr",
                }}
                {...others}
              ></textarea>
            ) : type == "checkbox" ? (
              <input
                type={type}
                id={id}
                value={value}
                checked={value}
                className={`checkbox dark:!border-[#777] border-gray-350 checked:border-[var(--main-color)]   [--chkfg:white] ${inputClass} disabled:checked:opacity-100`}
                {...others}
              />
            ) : (
              <input
                type={type}
                id={id}
                value={value}
                style={{
                  direction: arabicPattern.test(value) ? "rtl" : "ltr",
                  maskSize: labelRef.current?.offsetWidth + 10 + "px 35px",
                }}
                autoComplete="off"
                className={`invertedMaskInput font-[300] bg-transparent border-[2px] h-full p-[20px] trans-3 group-hover:border-[#FFFFFF] focus:border-[#FFFFFF] rounded-[18px] border-[#424242] outline-none ${inputClass} ${hasError?.status && " border-red-500"}`}
                {...others}
                required={required}
              />
            )}
            {hasError?.status && !hideErrorMessage && (
              <div className="label absolute  left-0 bottom-[-30px]">
                <span className="text-red-500 truncate label-text-alt text-nowrap whitespace-nowrap">
                  {hasError?.message}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </label>
  );
}

export default CustomInput;
