import React from 'react';
import Link from 'next/link';
const Header = () => (
  <header>
    <nav>
      <h2>NAV</h2>
      <Link href="/login" as="/login">
        <a>Login</a>
      </Link>
    </nav>
  </header>
);

export default Header;
