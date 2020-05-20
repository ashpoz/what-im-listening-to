import React from 'react';
import { Link } from 'gatsby';

const Header = () => {
  return (
    <header className="container">
        <div className="row">
          <div className="col">
            <h1>Hey, what's Adrian listening to?</h1>
          </div>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to="/">Latest</Link>
                </li>
                <li>
                    <Link to="/artists/">Artists</Link>
                </li>
                <li>
                    <Link to="/tracks/">Tracks</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;