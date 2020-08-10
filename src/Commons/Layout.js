import React from 'react';
import Loading from '../Commons/Loading';
import NavBar from '../Components/NavBar';

const Layout = (props) => {
  // Component Props
  const { children } = props;

  // Redux Props
  const { loading } = props;

  return ( 
    <div className="d-flex flex-col">
      {loading > 0 ? <Loading /> : <></>}
      <NavBar />
      {children}
    </div>
  );
}

export default Layout;