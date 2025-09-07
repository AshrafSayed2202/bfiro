import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { TbDotsVertical } from "react-icons/tb";

const CustomDropdownIndicator = () => {
    return <TbDotsVertical size={18} className="text-[--gray] mr-1" />;
};

const SelectInput = ({
    value,
    isEditing,
    handleInput,
    inputName,
    endpoint,
    defaultFirst,
    manualSelections,
    isMulti,
    get,
    hasEmpty,
    className,
    ...others
}) => {
    const [selections, setSelections] = useState();
    const inputRef = useRef();
    const arabicPattern = /[\u0600-\u06FF\u0750-\u077F]/;
    const formatOptionLabel = ({ label, image, icon }) => (
        <>
            <div className="flex items-center gap-[6px] text-[#424242] text-[18px]">
                <div className="flex items-center justify-center w-[24px] h-[15px]">
                    {icon && icon}
                </div>
                <span>{label}</span>
            </div>
        </>
    );
    // Fetching selections from the backend
    useEffect(() => {
        if (endpoint) {
            //   axios
            //     .get(
            //       MAIN_BACKEND_DOMAIN +
            //         "backend/apis/Selections/" +
            //         endpoint +
            //         ".php?" +
            //         get,
            //       {
            //         headers: {
            //           "Content-Type": "application/json",
            //         },
            //       }
            //     )
            //     .then(function ({ data }) {
            //       setSelections(data);
            //     })
            //     .catch(function (error) {
            //       setSelections([]);
            //     });
        } else {
            setSelections(manualSelections);
        }
    }, [manualSelections, endpoint, get]);

    // If selections haven't been fetched, return null
    if (!selections) {
        return null;
    }

    // Handling the case when value is 'cleared', null or undefined
    const selectedOption =
        value === "cleared" || value === null || value === undefined
            ? null // Reset the value if 'cleared', null, or undefined
            : isMulti
                ? value
                : selections.find((item) => item.value == value);
    return (
        <div
            className="w-full selectInputStyle"
            style={{
                direction: arabicPattern.test(selectedOption?.value) ? "rtl" : "ltr",
            }}
        >
            <Select
                ref={inputRef}
                className={`basic-single ${className}`}
                defaultValue={defaultFirst ? selections[0] : ""}
                classNamePrefix="select"
                onChange={(selectedOption) => {
                    handleInput(
                        isMulti
                            ? { target: { name: inputName, value: selectedOption } }
                            : {
                                target: {
                                    name: inputName,
                                    value: selectedOption?.value,
                                    label: selectedOption?.label,
                                },
                            }
                    );
                }}
                value={selectedOption}
                isMulti={isMulti}
                isDisabled={!isEditing}
                formatOptionLabel={formatOptionLabel}
                isClearable={hasEmpty ? true : false}
                isSearchable={true}
                name={inputName}
                options={selections}
                components={{ DropdownIndicator: CustomDropdownIndicator }} // Override indicator
                {...others}
            />
        </div>
    );
};

export default SelectInput;