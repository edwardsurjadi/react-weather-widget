import React, { Component } from 'react';
import './WidgetForm.css';

class WidgetForm extends Component{

	constructor(props){
		super(props);

	    this.state={
	      title:"TITLE OF WIDGET",
	      temperatureUnit:"metric",
	      windEnabled:true
	    };

	}
	handleFormChange (evt){
		const name=evt.target.name;
		const val=evt.target.value;

		this.props.onDataChange({[name]: val});
	}

	handleInputTempChange (evt){
		const temperatureUnit=evt.target.value;
		this.setState({temperatureUnit});
		this.props.onDataChange({temperatureUnit});
	}
	handleInputWindChange (evt){
		const windEnabled=evt.target.value=="true";
		this.setState({windEnabled});
		this.props.onDataChange({windEnabled});
	}


	render(){
		return(
			<div className="box m-widget-form">
	          <div className="row">
	            <div className="col-full">
	              <label htmlFor="widgetInputTitle">Title</label>
	              <input type="text" className="textbox" id="widgetInputTitle" name="title" placeholder="Title of widget" ref="widgetInputTitle" onChange={event => this.handleFormChange(event)}/>
	            </div>
	          </div>          
	          <div className="row">
	            <div className="col-full">
	              <label>Temperature</label>
	            </div>
	            <div className="col-half">
	              <input type="radio" className="radio" id="widgetInputTempC" name="widgetInputTemp" value="metric" checked={this.state.temperatureUnit=="metric"} onChange={event => this.handleInputTempChange(event)}/>
	              <label className="label" htmlFor="widgetInputTempC">&deg;C</label>
	            </div>
	            <div className="col-half">
	              <input type="radio" className="radio" id="widgetInputTempF"  name="widgetInputTemp" value="imperial" checked={this.state.temperatureUnit=="imperial"} onChange={event => this.handleInputTempChange(event)}/>
	              <label className="label" htmlFor="widgetInputTempF">&deg;F</label>
	            </div>
	          </div>
	          <div className="row">
	            <div className="col-full">
	              <label>Wind</label>
	            </div>
	            <div className="col-half">
	              <input type="radio" className="radio" id="widgetInputWindOn" name="widgetInputWind" value="true" checked={this.state.windEnabled} onChange={event => this.handleInputWindChange(event)}/>
	              <label className="label" htmlFor="widgetInputWindOn">On</label>
	            </div>
	            <div className="col-half">
	              <input type="radio" className="radio" id="widgetInputOff" name="widgetInputWind" value="false" checked={!this.state.windEnabled} onChange={event => this.handleInputWindChange(event)}/>
	              <label className="label" htmlFor="widgetInputWindOff">Off</label>
	            </div>
	          </div>
	         </div>
	     )}
};

export default WidgetForm;