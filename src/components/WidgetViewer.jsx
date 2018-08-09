import React, { Component } from 'react';
import WeatherIcon from '../images/weather.jpg';
import './WidgetViewer.css';

class WidgetViewer extends Component {
  constructor(props){
    super(props);

    this.state={
      WeatherIcon:WeatherIcon,
      town:"Sydney",
      weatherIconUrl:WeatherIcon,
      temperature:"26",
      windSpeed:"24",
      windDirection:"NE"

    };
  }

  componentDidMount(){
    this.refreshWeatherData(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.temperatureUnit!=nextProps.temperatureUnit){
      this.refreshWeatherData(nextProps);
    }
  }

  refreshWeatherData(props){

    this.getGeoLocationPromise()
    .then( 
      res => { 
        let {latitude, longitude, ...coords } = res.coords;          
        return this.getWeatherPromise(latitude, longitude);
      }
    )
    .then( response => {return response.json();})
    .then( result => this.updateWeatherData(result) )
    .catch( err => console.log(err) );
  }

  getGeoLocationPromise(){
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition( 
          position => { resolve(position); },
          err => { alert("Device does not support geolocation");reject(err); }
        );
    });
  }

  getWeatherPromise(latitude, longitude){
    const appid="e756356c32b01ec9e09d4b3bd166a841";

    let url=`https://api.openweathermap.org/data/2.5/weather?APPID=${appid}&lat=${latitude}&lon=${longitude}&units=${this.props.temperatureUnit}`;
    return fetch(url);
  }
  updateWeatherData(weatherData){

    let town = weatherData.name;
    let weatherIcon = weatherData.weather[0].icon;
    let weatherIconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;
    let temperature = Math.floor(weatherData.main.temp);
    let windSpeed = weatherData.wind.speed;
    let windDirection = this.convertWindDegToDirection(weatherData.wind.deg);

    if(this.props.temperatureUnit=="metric"){
      //for metric, openweather return meter/sec, it needs to be converted to km/h
      windSpeed=Math.floor(this.convertMsToKmh(windSpeed));
    }
    else{
      windSpeed=Math.floor(windSpeed);
    }

    this.setState({
      town,
      weatherIconUrl,
      temperature,
      windSpeed,
      windDirection
    });

  }

  convertWindDegToDirection(num){
    let direction="";
    if(num==0) direction="N";
    else if(num>0 && num <90) direction ="NE";
    else if(num==90) direction = "E";
    else if(num>90 && num<180) direction ="SE";
    else if(num==180) direction = "S";
    else if(num>180 && num<270) direction = "SW";
    else if(num==270) direction="W";
    else direction="NW";

    return direction;
  }

  convertMsToKmh(windSpeed){
    return (windSpeed/1000)*3600;
  }

  render() {
    return (
      <div className="box m-widget">
        <div className="title">
          {this.props.title=="" && <span>TITLE OF THE WIDGET</span>}
          {this.props.title!="" && <span>{this.props.title}</span>}
          </div>
        <div className="weather"><img src={this.state.weatherIconUrl}/></div>
        <div className="location">{this.state.town}</div>
        <div className="temperature">{this.state.temperature}<span className="degree">&deg;</span></div>
        {this.props.windEnabled &&      
          <div className="wind"><span className="label">Wind</span>&nbsp;&nbsp;{this.state.windDirection}&nbsp;{this.state.windSpeed}&nbsp; 
          {this.props.temperatureUnit=="metric" && <span>km/h</span>}
          {this.props.temperatureUnit=="imperial" && <span>mph</span>}                
          </div>
        }
      </div>
    );
  }
}

WidgetViewer.defaultProps={
  title: "TITLE OF WIDGET",
  temperatureUnit: "metric",
  windEnabled: false
}

export default WidgetViewer;
