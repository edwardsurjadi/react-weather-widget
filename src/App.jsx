import React, { Component } from 'react';
import './App.css';
import WidgetForm from './components/WidgetForm';
import WidgetViewer from './components/WidgetViewer';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      title:"TITLE OF WIDGET",
      temperatureUnit:"metric",
      windEnabled:true
    };
  }

  handleDataChange(formData){
    this.setState(formData);
  }

  render() {
    return (
      <div className="App">
        <hr className="top-line"/>

        <div className="app-wrapper">

          <WidgetForm onDataChange={p => this.handleDataChange(p)}></WidgetForm>

          <hr className="app-divider"/>

          <WidgetViewer 
              title={this.state.title} 
              temperatureUnit={this.state.temperatureUnit} 
              windEnabled={this.state.windEnabled}>
          </WidgetViewer>

        </div>
      </div>
    );
  }
}

export default App;
