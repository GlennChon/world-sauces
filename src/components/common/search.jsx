import React from "react";

import Select from "./select";
import Input from "./input";

const renderSearchInput = ({ name, label, value, onChange, error }) => {
  //should refactor this to use bootstrap input instead
  return (
    <Input
      name={name}
      label={label}
      error={error}
      type="search"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

const renderCheckBoxes = ({ items, checkedItems }) => {
  return <div> Some Taste Profile Checkboxes </div>;
};


const renderSelect
export default { SearchInput };
