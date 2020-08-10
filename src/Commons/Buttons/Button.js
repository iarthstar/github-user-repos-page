import React from 'react';

const Button = (props) => {
  const {
    children,
    className
  } = props;
  return (
    <button className={`btn d-flex align-items-center ${className}`}>
      {children}
    </button>
  );
}

export default Button;