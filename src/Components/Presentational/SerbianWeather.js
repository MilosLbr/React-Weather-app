import React from 'react';
import TableRow from './TableRow';

const SerbianWeather = ({weatherData, getFiveDayForecast}) => {

        
        let row1 = <TableRow weatherData = {weatherData.slice(0,3)} getFiveDayForecast = {getFiveDayForecast} />;

        let row2 = <TableRow weatherData = {weatherData.slice(3)} getFiveDayForecast = {getFiveDayForecast} />
    

    return(
        <div className = 'tabularData'>
            {row1}
            {row2}
        </div>
    )
}

export default SerbianWeather;