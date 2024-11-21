import React, { useEffect, useState } from "react";
import "./customDropdown.scss";

const CustomDropdown = ({ options, placeholder, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Synchronizacja lokalnego stanu z props `selectedValue`
  useEffect(() => {
    if (selectedValue === null || selectedValue === "") {
      setSelected(null);
    } else {
      const matchingOption = options.find(
        (option) => option.value === selectedValue
      );
      setSelected(matchingOption || null);
    }
  }, [selectedValue, options]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option); // Przekazujemy cały obiekt opcji
  };

  return (
    <div className="custom-dropdown">
      <div
        className={`dropdown-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected.label : placeholder}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
            key={index}
            className={`dropdown-item ${
              selected && selected.value === option.value ? "selected" : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
