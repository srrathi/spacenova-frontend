import React from 'react';
import {Link} from 'react-router-dom';

function Nav(){
  return(
    <nav className="main">
      <ul>
        <li> <Link to='/seller'> Sell Product </Link></li>
        <li> <Link to='/products'> Buy Something </Link></li>
        <li> <Link to='/claim'> Claim Warranty </Link></li>
      </ul>
    </nav>
  )
}

export default Nav;