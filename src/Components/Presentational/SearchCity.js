import React from 'react';
import TableUnit from './TableUnit';

class  SearchCity extends React.Component  {
    constructor(props){
        super(props);
        this.state= {
            inputValue: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleInputChange(){
        let inputValue = event.target.value;

        this.setState({
            inputValue
        })
    };

    handleKeyPress(event, searchForCity, inputValue){
        
        if(event.key === 'Enter'){
            searchForCity(inputValue);
        }

    }

    static getDerivedStateFromProps({history, userLocationKnown, firstRender}){
        
        if(userLocationKnown && firstRender){
            // if user allows the app to get he's location and the location is known, redirect to curent_location_weather route only for the first render
            history.push('/current_location_weather');
        }
        return null;
    }
    
    render(){
        const inputValue = this.state.inputValue;

        const searchedCitiesData = this.props.searchedCitiesData ? this.props.searchedCitiesData.list : undefined;

        const {getFiveDayForecast} = this.props;

        let hiddenClass = '';
        let noResults = false;
        let row1 = [];
        let row2 = [];

        if(searchedCitiesData){
            noResults = searchedCitiesData.length === 0 ? true : false;
            hiddenClass = searchedCitiesData.length === 0 ? 'hidden' : '';

            searchedCitiesData.map((elem, ind) => {
                if(ind < 3){
                    row1.push(<TableUnit key = {ind} dataForTable = {elem} getFiveDayForecast = {getFiveDayForecast}/>)
                }else{
                    row2.push(<TableUnit key = {ind} dataForTable = {elem} getFiveDayForecast = {getFiveDayForecast}/>)
                }
            });
        }else{
            hiddenClass = 'hidden';
        }
        
        
            return(
            <div>
                <p className = 'explanation'>Search for your home city or any other. To get more precise results, input city name + comma <span>( , )</span> + two-letter country code. For example - Moscow, RU or Rome, IT.</p>

                <div className = 'formGroup'>
                    <div className = 'inputAndButton'>

                        <input className = 'searchInput' type='text'  value = {this.state.inputValue} onChange = {this.handleInputChange} onKeyUp = {() => this.handleKeyPress(event, this.props.searchForCity, inputValue)}/>

                        <button className = 'btn btn-inline searchBtn' onClick = {() => this.props.searchForCity(inputValue)}><i className="fas fa-search" ></i>Search</button>
                        
                        
                    </div>
                </div>
                
                <div className = {'searchResults ' + hiddenClass}>

                    

                    <div className = 'row'>{row1}</div>

                    {row2.length > 0 &&  <div className = 'row'>{row2}</div>}

                </div>
                {noResults && <p className = 'noResults'>No results found...</p>}
            </div>
            );
        };
};

export default SearchCity;