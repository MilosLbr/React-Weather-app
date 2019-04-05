import React from 'react';
import TableUnit from './TableUnit.js';

const CurrentLocationWeather = ({ dataForTable, getFiveDayForecast, currentPosition, firstRender, toggleFirstRender}) => {
    
    
    if(firstRender){
       toggleFirstRender();
    }
    return (
        <div className = 'currentLocation'>
            <h3>Weather in your current location: </h3>
            <TableUnit dataForTable = {dataForTable} getFiveDayForecast = {getFiveDayForecast} currentPosition = {currentPosition}/>
        </div>
    )
};

export default CurrentLocationWeather;