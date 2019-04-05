import React from 'react';
import OneDayWeather from './OneDayWeather';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const FiveDayWeather = ({fiveDaysData, chartCityName}) => {

    let daysincluded = [];
    
    let noonTimeWeather = fiveDaysData.filter(elem =>{ 
        let d = new Date(elem.dt * 1000)
        let day = days[d.getDay()];
        
        // filter only weather info for 12:00h for each day, or for 15:00h when it is pass noon
        // at the end, we get array of weather data for five days at noon time (or 15:00h)
        if(elem.dt_txt.slice(11,13) === '12' && !daysincluded.includes(day)){ 
            daysincluded.push(day);
            return elem;
        }else if(elem.dt_txt.slice(11,13) === '15' && !daysincluded.includes(day)){
            daysincluded.push(day);
            return elem;
        }
    });

    let row1 = [];
    let row2 = [];

    noonTimeWeather.forEach((elem, ind) => {
        if(ind < 3 ){
            row1.push(<OneDayWeather key = {ind} weatherData = {elem}/>)
        }else{
            row2.push(<OneDayWeather key = {ind} weatherData = {elem}/>)
        }
    })

    return(
        <div className = 'fiveDayWeather'>
         <h3 >Weather for {chartCityName}:</h3>
            <div className = 'row'>
                {row1}
            </div>
            <div className = 'row'>
                {row2}
            </div>

        </div>
    )
}

export default FiveDayWeather;