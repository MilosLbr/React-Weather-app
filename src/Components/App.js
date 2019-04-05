import React from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Redirect, Route } from "react-router-dom";
import NavBar from './Presentational/Navigation/NavBar';
import CurrentLocationWeather from './Presentational/CurrentLocationWeather';
import FiveDayWeather from './Presentational/FiveDayWeather';
import SearchCity from './Presentational/SearchCity';
import SerbianWeather from './Presentational/SerbianWeather';
import ChartsComponent from './ChartsComponents';
import {backgroundImages} from '../imageLoader/imageLoader';

let baseUrl = 'http://api.openweathermap.org/data/2.5/';
const apikey = '&appid=f8d3ddb0786656d6df4d856ace4e0148';
const forecastRequestUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=f8d3ddb0786656d6df4d856ace4e0148&id=';

const fiveSerbCitiesDataURL = 'http://api.openweathermap.org/data/2.5/group?id=3194360,792680,789128,787657,784227&units=metric&appid=f8d3ddb0786656d6df4d856ace4e0148';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requestCompleted: false,
            currentLocationWeatherData: undefined,
            firstRender: true,
            userLocationKnown: false,
            locationError: undefined,
            fivedayForecastData: undefined,
            showChart: false,
        }
        this.getWeatherDataByLocation = this.getWeatherDataByLocation.bind(this);
        this.showErrorWithLocation = this.showErrorWithLocation.bind(this);
        this.getFiveDayForecast = this.getFiveDayForecast.bind(this);
        this.toggleFirstRender = this.toggleFirstRender.bind(this);
        this.searchForCity = this.searchForCity.bind(this);
    }

    getWeatherDataByLocation(latitude, longitude){
        const apiUrl = baseUrl + 'weather?' +'lat='+ latitude + '&lon=' + longitude + '&units=metric' + apikey;

        fetch(apiUrl).then(response => {
            
            return response.json();
        }).then(data => {
            this.setBackground(data.weather[0].icon); // set background image according to current weather approximately
            
            this.setState({
                currentLocationWeatherData : data,
                userLocationKnown: true,
            });
        });
    }

    componentDidMount(){
        
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.getWeatherDataByLocation(latitude, longitude);

        }, this.showErrorWithLocation)

        fetch(fiveSerbCitiesDataURL).then(
            response => {
                 return response.json();
                }
        ).then(data => {

            this.setState( {
                data,
                requestCompleted: true})
            })
    };

    showErrorWithLocation(error){
        
        const randomImage = Object.keys(backgroundImages)[Math.floor(Math.random()* 18)]
        this.setBackground(randomImage) ; // set random background when user location is unknown

        switch(error.code) {
            case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
              this.setState({
                  locationError: "User denied the request for Geolocation."
              });
              break;
            case error.POSITION_UNAVAILABLE:
            console.log("User's position is unavailable.");
              this.setState({
                  locationError: "User's position is unavailable."
              });
              break;
            case error.TIMEOUT:
            console.log("The request to get user location timed out.");
              this.setState({
                  locationError: "The request to get user location timed out."
              }).
              break;
            case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
              this.setState({
                  locationError: "An unknown error occurred."
              });
              break;
        }
    }

    getFiveDayForecast(){
        
        let parent = event.target.parentNode;

        while(!parent.getAttribute('cityid')){  // go up the tree to the parent that holds the cityid attribute
            parent = parent.parentNode;
        }
       
        const forecastUrl = forecastRequestUrl + parent.getAttribute('cityid');
        const cityName = parent.firstElementChild.firstElementChild.innerText;
        
        fetch(forecastUrl).then(response => {
            return response.json()
        }).then(data => {
            
            this.setState({
                fivedayForecastData: data,
                showChart: true,
                chartCityName: cityName
            });

        }).then( ()=> {
            window.scrollTo(0,document.documentElement.scrollHeight)
        });
    }

    searchForCity(cityName){
        const searchUrl = baseUrl + 'find?q=' + cityName + '&units=metric'+ '&cnt=5' + apikey;
        

        fetch(searchUrl).
        then(response => response.json()).
        then(data => {

            this.setState({
                searchedCitiesData: data
            })
        })
    }

    toggleFirstRender(){
        // if user allows the app to get he's location and the location is known, redirect from /search to /curent_location_weather route only for the first render
        this.setState({
            firstRender: false
        })
    }

    setBackground(img){
        let body = document.getElementsByTagName('body')[0];

        body.style.backgroundImage = 'url('+ backgroundImages[img] + ')';
    }

    render(){
        const {requestCompleted, locationError, userLocationKnown, firstRender, currentLocationWeatherData, fivedayForecastData, showChart, chartCityName, searchedCitiesData } = this.state;
        
        let fiveCitiesData, fiveDaysData;

        if(requestCompleted){
            fiveCitiesData = this.state.data.list;  // weather data for five Serbian cities
        }
        if(fivedayForecastData){
            fiveDaysData = fivedayForecastData.list;  // weather data for five days for clicked city
        };
        
        return(
            <HashRouter>
            <div>

                <NavBar/>

                <Switch>
                    <Redirect exact path = '/'  to = '/search'/>

                    <Route path = '/search' render ={(props) => { 
                    
                        return (
                            <div>
                                <SearchCity {...props} userLocationKnown = {userLocationKnown} firstRender ={firstRender} searchForCity = {this.searchForCity} searchedCitiesData = {searchedCitiesData} getFiveDayForecast = {this.getFiveDayForecast}/> 
                            </div>
                                )
                            } 
                        }/>

                    <Route path = '/current_location_weather' render = {(props) => {
                        
                        if(userLocationKnown){
                        return <CurrentLocationWeather dataForTable = {currentLocationWeatherData} getFiveDayForecast = {this.getFiveDayForecast} currentPosition = {userLocationKnown} firstRender = {firstRender} toggleFirstRender = {this.toggleFirstRender}/>;

                        }else{
                            return <Redirect to ='/search'/>
                        }
                    }}/>

                    <Route path = '/serbian_weather' render = {(props) => {

                        if(requestCompleted){
                            return (
                            <div>
                                <SerbianWeather weatherData = {fiveCitiesData} getFiveDayForecast = {this.getFiveDayForecast}/>
                                
                            </div>)
                        }
                    }}/>
                
                </Switch>

                {fiveDaysData && <FiveDayWeather fiveDaysData = {fiveDaysData} chartCityName = {chartCityName}/>}

                <ChartsComponent chartData = {fiveDaysData} showChart = {showChart} chartCityName = {chartCityName}/>
              
            </div>

            </HashRouter>
        )
    }
}


export default App;