import React from 'react';

const MainInfo = ({imageSource, name, temp, country, description, cityId, getFiveDayForecast}) => {

    let capitalizedDescription = description[0].toUpperCase() + description.slice(1);
    return(
        <div className = 'mainInfo' >
            <div className = 'nameTempDesc' cityid = {cityId} onClick = {getFiveDayForecast}>
                <div className = 'nameAndCountry'><u>{name}, {country}</u></div>
                <div className = 'currentTemperature'>{temp}<sup className = 'celsius'>&#176;C</sup></div>
                <div className = 'currentWeatherDescription'>{capitalizedDescription}</div>
            </div>
            <div className = 'imageContainer'>
                <img src={imageSource} />
            </div>
        </div>
    )
}

export default MainInfo;