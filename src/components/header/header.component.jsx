import React from 'react';
import {Link} from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.styles.scss';


const Header = () => (
    <nav className="header">
        <Link className='logo-container' to="/">
            <Logo className='logo' title="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to='/shop'>SHOP</Link>
            <Link className="option" to='/shop'>CONTACT</Link>
        </div>
    </nav>
);

export default Header;