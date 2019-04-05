import React from 'react';

const RainSnowData = ({data, text}) => {
    
    let value;
    if(data.hasOwnProperty('3h')){
        value = data['3h']
    }else if(data.hasOwnProperty('1h')){
        value = data['1h'];
    }
    return(
        <tr>
            <td>{text}: </td>
            <td>{value} mm</td>
        </tr>
    )
}

export default RainSnowData;