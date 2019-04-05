import React from 'react';
import {iconImages} from '../../imageLoader/imageLoader';
import MainInfo from './MainInfo';
import RainSnowData from './RainSnowData';

const TableUnit = ({dataForTable, getFiveDayForecast, currentPosition}) => {
    const {temp, pressure, humidity} = dataForTable.main;
    const {wind, clouds, name, id, rain, snow} = dataForTable;
    const weatherIcon = dataForTable.weather[0].icon;
    const {description} = dataForTable.weather[0]
    const {sunrise, sunset, country} = dataForTable.sys;

    const sunriseTime = new Date(sunrise * 1000).toString().slice(16, 21);
    const sunsetTime = new Date(sunset * 1000).toString().slice(16, 21);
    
    let style = {
        transition: '0.4s',
        overflow : 'hidden',
        maxHeight : 0,
        display: 'block'
    }

    let rainData, snowData;
    if(rain && Object.keys(rain).length !== 0) {
        rainData = <RainSnowData data = {rain} text= 'rain'/>
    }
    if(snow && Object.keys(snow).length !== 0) {
        snowData = <RainSnowData data = {snow} text = 'snow' />
    }

    let className = 'tableUnit';
    currentPosition ? className += ' currentPositionTbUnit' : '';
    if(currentPosition) { // show table details when current position is known
        style = {
            transition: '0.4s',
            overflow : 'hidden',
            maxHeight : '380px',
            display: 'block'
        }
    }

    return(
        <div className ={className}>
            <MainInfo imageSource = {iconImages[weatherIcon]} cityId = {id} name = {name} temp = {temp} country = {country} description = {description} getFiveDayForecast = {getFiveDayForecast}/>

            <button className = 'btn btn-light' title = 'show more info' onClick = {buttonClick}>More info</button>

            <table style = {style}>
                <tbody>
                    <tr>
                        <td>temperature: </td>
                        <td>{temp}&#176;C</td>
                    </tr>
                    <tr>
                        <td>wind: </td>
                        <td>{wind.speed} m/s</td>
                    </tr>
                    <tr>
                        <td>pressure: </td>
                        <td>{pressure} mbar</td>
                    </tr>
                    <tr>
                        <td>humidity: </td>
                        <td>{humidity} %</td>
                    </tr>
                    <tr>
                        <td>cloudness: </td>
                        <td>{clouds.all} %</td>
                    </tr>
                    {/*sometimes rain, snow , sunrise and sunset parameters are not recieved from the API*/}
                    {(rain && Object.keys(rain).length !== 0) && rainData}
                    {(snow && Object.keys(snow).length !== 0) && snowData}

                    {sunriseTime !== '' && <Tr label={'sunrise'} data ={sunriseTime}/>}
                    {sunsetTime !== '' && <Tr label={'sunset'} data = {sunsetTime}/>}
                </tbody>
            </table>
        </div>
    )
}

const buttonClick = () => {

    let table = event.target.nextElementSibling;
    
    if (table.style.maxHeight !== '0px') {
      table.style.maxHeight = '0px'; 
    } else {
      table.style.maxHeight = table.scrollHeight + "px"; 
    }
};

const Tr = ({label, data}) =>{
    return(
        <tr>
            <td>{label}: </td>
            <td>{data}</td>
        </tr>
    );
};



export default TableUnit;