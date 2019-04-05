import React from 'react';
import TableUnit from './TableUnit';

const TableRow = ({weatherData , getFiveDayForecast}) =>{
    
    let tableUnits = weatherData.map((elem, ind) => {
        return <TableUnit key = {ind} dataForTable = {elem} getFiveDayForecast = {getFiveDayForecast}/>
     });

    return(
        <div className ='row'>
            {tableUnits}
        </div>
    )
}

export default TableRow;