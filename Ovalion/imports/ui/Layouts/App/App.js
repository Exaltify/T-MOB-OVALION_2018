import React, { Component } from 'react';
import Header from '../../Component/Header/Header.js';
import MainContainer from '../MainContainer/MainContainer';
import './App.css';
import { localizedString } from '../../../localization/strings';

// App component - represents the whole app
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuBarActive: false,
      localizedString: localizedString['Fr'],
    };
  }

  showMenuBar = () => {
    this.setState({ menuBarActive: !this.state.menuBarActive});
  }

  refreshApp = () => {
    this.forceUpdate();
  }

  refreshLanguage = (language) => {
    this.setState({ localizedString: localizedString[language] });
  }

  render() {
    return (
      <div className="app-container">
        <Header refreshLanguage={ this.refreshLanguage } menuBarHandler={ this.showMenuBar } refreshApp={ this.refreshApp } />
        <MainContainer localizedString={ this.state.localizedString } menuBarActive={ this.state.menuBarActive }/>
      </div>
    );
  }
}
