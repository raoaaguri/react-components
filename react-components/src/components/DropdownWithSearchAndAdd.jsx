import React, { useState } from "react";

const DropdownWithSearchAndAdd = () => {
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [newOption, setNewOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    setSearchTerm(""); // Reset search term
  };

  const handleNewOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-header"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>{selectedOption || "Select an option"}</span>
        <i class="arrow down"></i>
      </div>
      {showDropdown && (
        <div className="dropdown-options">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={handleSearchChange}
            className="dropdown-search"
          />
          <div className="dropdown-option-list">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="dropdown-option no-options">No options found</div>
            )}
          </div>
          <div className="add-option">
            <input
              type="text"
              value={newOption}
              placeholder="Add new option"
              onChange={handleNewOptionChange}
              className="new-option-input"
            />
            <button onClick={handleAddOption} className="add-button">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownWithSearchAndAdd;
