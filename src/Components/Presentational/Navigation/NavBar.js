import React from 'react';
import NavTab from './NavTab';

const NavBar = () => {
    return(
        <div className = 'navBar'>
        
            <NavTab label= 'Current location weather' to = '/current_location_weather'/>
            <NavTab label = 'Search' to='/search'/>
            <NavTab label = 'Serbian weather' to= '/serbian_weather'/>

        </div>
    )
}

export default NavBar;