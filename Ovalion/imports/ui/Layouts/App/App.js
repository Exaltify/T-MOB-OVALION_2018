import React, { Component } from 'react';
import Header from '../../Component/Header/Header.js';
import MainContainer from '../MainContainer/MainContainer';
import './App.css';


// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { menuBarActive: false };
  }

  showMenuBar = () => {
    this.setState({ menuBarActive: !this.state.menuBarActive});
  }

  refreshApp = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="app-container">

        <Header menuBarHandler={ this.showMenuBar } refreshApp={ this.refreshApp } />
        <MainContainer menuBarActive={ this.state.menuBarActive }/>
      </div>
    );
  }
}
