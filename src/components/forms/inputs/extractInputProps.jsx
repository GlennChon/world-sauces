const extractInputProps = ({ touched, errors, name, ...inputProps }) => {
  const isInvalid = touched[name] && !!errors[name];
  const props = {
    isInvalid: isInvalid,
    ...inputProps
  };

  //Checkbox
  if (props.type === "checkbox") {
    props.value = inputProps.id;
    // check if inputProps[name] is undefined
    if (inputProps.values[name] !== undefined) {
      props.checked = inputProps.values[name].includes(inputProps.id);
    } else {
      props.checked = false;
    }
    // changeHandler
    props.onChange = e => {
      if (e.target.checked) {
        inputProps.checkhelper.push(inputProps.id);
      } else {
        const index = inputProps.values[name].indexOf(inputProps.id);
        inputProps.checkhelper.remove(index);
      }
    };
  } else if (props.type === "dynamic-text") {
    props.type = "text";
    // Select and TextArea
  } else if (props.type === "select" || props.type === "textarea") {
    props.as = inputProps.type;
  } else {
    props.type = inputProps.type;
    props.value = inputProps.values.name;
  }

  return props;
};
export default extractInputProps;
