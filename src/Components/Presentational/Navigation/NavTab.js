import React from 'react';
import { NavLink } from 'react-router-dom';

const NavTab = ({to, label}) => {

    return (
        <NavLink className = 'navTab' to = {to}>{label}</NavLink>
    )
};

export default NavTab;