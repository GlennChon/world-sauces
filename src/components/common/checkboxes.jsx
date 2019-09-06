import React from "react";

const Checkboxes = ({
  name,
  label,
  options,
  onChange,
  type = "checkbox",
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br />
      {options.map(taste => (
        <div className="form-check form-check-inline" key={taste._id}>
          <label htmlFor={taste.name} className="form-check-label">
            {taste.name}
          </label>
          <input
            key={taste._id}
            id={taste.name}
            name={taste.name}
            onChange={onChange}
            className="form-check-input"
            type={type}
          />
        </div>
      ))}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Checkboxes;
