import React from 'react';

// If a user tries to go to a protected route with an access_level that isn't high enough
// show them this error page.
const Header = () => (
  <div>
    <h2>Error, you're not authorized to view this page.</h2>
  </div>
);

export default Header;
