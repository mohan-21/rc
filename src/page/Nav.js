import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <ul className="NavList">
                <li><Link exact to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/marriage-divorce">Marriage & Divorce</Link></li>
                <li><Link to="/contact">CONTACTS</Link></li>
            </ul>
        );
    }
}

export default Nav;