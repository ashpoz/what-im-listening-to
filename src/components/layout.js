import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import '../assets/stylesheets/main.scss';


const Layout = ({ children, pageName }) => {

  let className = '';

  if ( pageName ) {
    className = `${className} page-${pageName}`;
  }

  return (
    <>
      <Helmet bodyAttributes={{ class: className }}>
        <title>Gatsby Site</title>
      </Helmet>
      <div className="wrapper">
        <main>{ children }</main>
      </div>
    </>
  );

};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;