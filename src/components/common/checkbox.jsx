import React from "react";

const Checkbox = ({ name, type = "checkbox", checked = false, onChange }) => {
  return (
    <div className="form-check form-check-inline">
      <label htmlFor={name}>
        <input
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="form-check-input"
          type={type}
        />
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
