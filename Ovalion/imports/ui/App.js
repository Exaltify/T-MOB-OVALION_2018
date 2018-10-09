import React, { Component } from 'react';
import MenuBar from './MenuBar.js';
import Header from './Header.js';

 
// App component - represents the whole app
export default class App extends Component {
	
  render() {
    return (
      <div className="container">

        <Header />

        <div id="main">
          <MenuBar />

          <div id="main-content"></div>
        </div>
        
      </div>
    );
  }
}
