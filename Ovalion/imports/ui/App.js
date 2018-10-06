import React, { Component } from 'react';
 
// App component - represents the whole app
export default class App extends Component {
	
	
	
  render() {
    return (
      <div className="container">
        <header>
		  <div id="menu-btn">
		    <h1>MENU</h1>
		  </div>
		  <div id="title">
            <h1>Ovalion</h1>
          </div>
        </header>
        
        <div id="menu-bar">
			MENU BAR
        </div>
        
      </div>
    );
  }
}
