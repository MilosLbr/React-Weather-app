import React from 'react';
import Chart from 'chart.js';
import {iconImages} from '../imageLoader/imageLoader';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class ChartsComponent extends React.Component {
    constructor(props){
        super(props);
        this.myCanvasRef = React.createRef();
    }

        
    componentWillUpdate({chartData}){
        const myCanvas = this.myCanvasRef.current.getContext("2d");
        let mainData;

        if(chartData){
            
            mainData = chartData.map(elem =>{
                let {main, rain, weather, clouds, wind, snow }= elem;

                let dt_txt = elem.dt_txt.slice(10,16);
                let d = new Date(elem.dt * 1000)
                let day = days[d.getDay()];
                dt_txt = day + dt_txt;

                return{
                    main,
                    dt_txt,
                    rain,
                    weather,
                    clouds,
                    wind,
                    snow
                }
            });

            if(window.myChart){
                // remove previous chart
                 window.myChart.destroy();
            }

            window.myChart = new Chart(myCanvas, {
                type: 'line',
                data:{ 
                    labels: mainData.map(elem => elem.dt_txt),
                    datasets:[{
                        label: 'temperatures',
                        data: mainData.map(elem => elem.main.temp),  // temperatures data
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointHoverRadius: 5.5,
                        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)'
                    },
                    {
                        label: '',
                        hidden: true,
                        data2: mainData  // data for tooltip table
                    },
                    {
                        label: 'precipitation',  // rain and snow data
                        data: mainData.map(elem => {
                            if(elem.rain && elem.rain['3h']){
                                return elem.rain['3h'];
                            }else if(elem.snow && elem.snow['3h']){
                                return elem.snow['3h'];
                            }
                        }
                        ),
                        backgroundColor: 'blue'
                    }
                ]
            },
            options:{
                responsive: true, 
                maintainAspectRatio: false,
                tooltips: {
                    enabled: false,
                    mode: 'index',
                    intersect: false,

                    custom: function(tooltipModel) {
                        // Tooltip Element
                        let tooltipEl = document.getElementById('chartjs-tooltip');
        
                        // Create element on first render
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<div class="customTooltip"></div>';
                            document.body.appendChild(tooltipEl);
                        }
                        
                        // Hide if no tooltip
                        if (tooltipModel.opacity === 0) {
                            
                            tooltipEl.style.opacity = 0; 
                            return;
                        }

                        // Set caret Position
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        }

                        // Set Text
                        if (tooltipModel.body) {
                            
                            const indexOfTooltip = tooltipModel.dataPoints[0].index;
                            const additionalData =  this._data.datasets[1].data2[indexOfTooltip];

                            const titleLine = tooltipModel.title[0] + 'h' || [];
                            let bodyLines = Object.assign({}, additionalData ); // copy additional weather data 
                           
                            const {weather} = bodyLines;

                            // innerHtml of the tooltip
                            let innerHtml = '<div class= "mainInfoTooltip">'; // open a div with maininfo class

                            let iconImage = '<div class="imageContainer tooltipImage"><img src=' + iconImages[weather[0].icon] +'></div>';  // image container for icon images

                            innerHtml += '<div class= "tooltipTitle">' + titleLine + '</div>'+ iconImage ;
                            innerHtml += '<div class= "tooltipDescription">' + capitalizeFirstLeter(weather[0].description) +'</div>';
                                
                            innerHtml += '</div>'; // close the div 

                            let tableBody= createTable(bodyLines);

                            innerHtml += '<table>' + tableBody.innerHTML + '</table>' ;
                            
                            let tableRoot = tooltipEl.querySelector('div.customTooltip');
                            tableRoot.innerHTML = innerHtml;
                        }
                         // `this` will be the overall tooltip
                        let position = this._chart.canvas.getBoundingClientRect();
                        const clientWidth = document.documentElement.clientWidth;
                        
                        // Display, position, and set styles for font
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.position = 'absolute';
                        
                        if(tooltipModel.caretX < 600){
                            // place tooltip on the right
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX +10 + 'px';

                            if(parseInt(tooltipEl.style.left) > (clientWidth - 190)){
                                // prevent overflow
                                tooltipEl.style.left = clientWidth - 195 + 'px';
                            }
                        }else{
                            // place tooltip on the left, 185px is tooltip widht aproximately
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX -185 + 'px';

                            if(parseInt(tooltipEl.style.left)< 0 ){
                                // prevent overflow
                                tooltipEl.style.left = '5px';
                            }
                        }
                        
                        tooltipEl.style.top = position.top + window.pageYOffset /*  tooltipModel.caretY  */-155 + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';

                 }},
                 hover: {
                    mode: 'index',
                    intersect: false
                 },
                 scales:{
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: '°C'
                        }}
                    ],
                },
                legend:{
                    display: false
                }
            },
            
            }
        );
        }
        
    }

    render(){
        
        const {showChart, chartCityName} = this.props;
        const className = !showChart ? 'chartComponent hidden' : 'chartComponent';
        

        return (
            <div className={className}>
                <h3 className = 'chartCityName'>{chartCityName}</h3>
                
                <div className="chartWrapper">
                    <div className = 'chartAreaWrapper'>
                        <canvas height = '100%' id="myCanvas" ref ={this.myCanvasRef}></canvas> 
                    </div>
                    
                </div>
            </div>
        )
    }
}


const capitalizeFirstLeter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const createTable = (tableData) => {
    const {clouds, rain, wind, snow} = tableData;
    const {temp, humidity, pressure} = tableData.main;

    let table = document.createElement('table');
    let tableBody = `<tbody>
        <tr>
            <td>temperature: </td>
            <td>${temp}&#176;C</td>
        </tr>
        <tr>
            <td>wind: </td>
            <td>${wind.speed} m/s</td>
        </tr>
        <tr>
            <td>pressure: </td>
            <td>${Math.round(pressure)} mbar</td>
        </tr>
        <tr>
            <td>humidity: </td>
            <td>${humidity} %</td>
        </tr>
        <tr>
            <td>cloudness: </td>
            <td>${clouds.all} %</td>
        </tr>
    </tbody>`;
    if(rain && Object.keys(rain).length !== 0){
        rain['3h'] ? 
        tableBody += `<tr>
            <td>rain: </td><td>${rain['3h'].toFixed(2)} mm</td>
        </tr>` :
        tableBody += `<tr>
        <td>rain: </td><td>${rain['1h'].toFixed(2)} mm</td>
        </tr>` 
    }
    if(snow && Object.keys(snow).length !== 0){
        
        snow['3h'] ? 
        tableBody += `<tr>
            <td>snow: </td><td>${snow['3h'].toFixed(2)} mm</td>
        </tr>` :
        tableBody += `<tr>
        <td>snow: </td><td>${snow['1h'].toFixed(2)} mm</td>
        </tr>`
    }

    table.innerHTML = tableBody;
    return table;
}

export default ChartsComponent;