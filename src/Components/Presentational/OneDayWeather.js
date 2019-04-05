import React from 'react';
import {iconImages} from '../../imageLoader/imageLoader';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const OneDayWeather = ({weatherData}) => {
    
    const {dt, main, weather} = weatherData;
    const {temp} = main;
    const {description, icon} = weather[0];

    let d = new Date(dt * 1000)
    let day = days[d.getDay()];
    let descriptionToUpper = description[0].toUpperCase() + description.slice(1);

    return(
        <div className = 'oneDayWeather'>
            <div>{day}</div>
            <div className = 'imageContainer'>
                <img className = 'correctImagePosition' src = {iconImages[icon]}/>
            </div>
            <div className = 'currentTemperature'>{temp}<sup>&#176;C</sup></div>
            <div>{descriptionToUpper}</div>
        </div>
    )
}

export default OneDayWeather;