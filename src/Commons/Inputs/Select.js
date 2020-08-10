import React from 'react';
import RSelect, { components } from 'react-select';

import { Icon } from '@iconify/react';
import triangleDown16 from '@iconify/icons-octicon/triangle-down-16';

const Select = (props) => {
  const {
    value,
    options,
    onChange,
    name,
    label
  } = props;

  const handleChange = (e) => onChange({ target: { name, value: e } });

  const ValueContainer = ({ children, ...props }) => (
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  );

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}><span className="fs-14" style={{ fontWeight: "600", color: "grey" }}>{label}: <span style={{ color: "black" }}>{children}</span></span></components.SingleValue>
  );

  const IndicatorSeparator = () => <></>;

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icon icon={triangleDown16} />
      </components.DropdownIndicator>
    );
  };

  const Option = props => {
    return (
      <div className="d-flex align-items-center">
        <components.Option {...props} />
      </div>
    )
  };

  const MenuList = props => {
    return (
      <components.MenuList {...props}>
        <div className="fs-12 bb-1" style={{ padding: "6px 12px 10px 12px", fontWeight: "600" }}>Select {label.toLowerCase()}</div>
        {props.children}
      </components.MenuList>
    );
  };

  return (
    <RSelect
      styles={{
        option: (base, state) => ({
          ...base,
          height: '100%',
          fontSize: "12px",
          color: "black",
          backgroundColor: state.isFocused ? "#fafbfc" : "white",
          borderBottom: "1px solid #eaecef"

        }),
        control: base => ({
          ...base,
          minHeight: "unset",
          backgroundColor: "#fafbfc",
          border: "1px solid #e1e4e8",
          borderRadius: "6px",
          height: "32px"
        }),
        singleValue: base => ({
          ...base,
          padding: "0px",
          boxSizing: "unset",
          height: "20px",
          color: 'grey'
        }),
        valueContainer: base => ({
          ...base,
          color: 'grey',
          padding: "3px 12px",
          margin: "0px",
          boxSizing: "unset",
          minHeight: "unset",
          height: "24px",
        }),
      }}
      isSearchable={false}
      value={value}
      defaultValue={value}
      components={{
        ValueContainer,
        SingleValue,
        IndicatorSeparator,
        DropdownIndicator,
        Option,
        MenuList
      }}
      options={options}
      onChange={handleChange}
    />
  );
};

export default Select;