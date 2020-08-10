import React from 'react';

const TextField = (props) => {
  const {
    type = "text",
    value,
    onChange,
    placeHolder,
    className,
    name
  } = props;
  return (
    <input
      className={`text-field ${className}`}
      type={type}
      onChange={onChange}
      placeholder={placeHolder}
      value={value}
      name={name}
    />
  );
}

export default TextField;