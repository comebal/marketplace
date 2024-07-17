import React from 'react';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
   <main>
      <a href='/switch'>Switch user</a>
      {children}
   </main>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
