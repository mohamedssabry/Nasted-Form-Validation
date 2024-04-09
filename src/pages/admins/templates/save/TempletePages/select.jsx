import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";
import "../Style/pagesStyle.css";

function CustomSelect({ name, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative">
      <div
        className="rounded-md cursor-pointer"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <div className="flex justify-between items-center inputsform h-14 w-full bg-white">
          <div
            className={`font-sans ${selectedOption ? "" : "text-[#95989A]"}`}
          >
            {selectedOption ? selectedOption.label : "Select an option"}
          </div>
          <div className="">
            <IoIosArrowDown
              color="#95989A"
              size={15}
              style={{ fontWeight: "bold" }}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="select-option absolute left-0 w-full top-16 bg-white rounded-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="option py-2 px-4 cursor-pointer hover:bg-gray-100 font-sans"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CustomSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
