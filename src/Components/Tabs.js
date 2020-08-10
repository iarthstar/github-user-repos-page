import React from 'react';
import { Icon } from '@iconify/react';

const Tabs = (props) => {
  const { data } = props;

  const makeTabs = ({ label, icon, count, selected }, index) => (
    <li className={`d-flex align-items-center fs-14 tab ${selected && "tab-selected"}`}>
      <Icon className={`fs-16 ${!selected && 'c-lightgrey'}`} icon={icon} />
      &nbsp;&nbsp;{label}
      {count ? <>&nbsp;<span className="highlight-count">{count}</span></> : <></>}
    </li>
  )

  return (
    <ul className="d-flex">
      {data.map(makeTabs)}
    </ul>
  );
}

export default Tabs;