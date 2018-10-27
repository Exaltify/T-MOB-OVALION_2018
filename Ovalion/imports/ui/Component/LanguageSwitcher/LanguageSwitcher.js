import React, { Component } from 'react';
import './LanguageSwitcher.css';


export default class MenuBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: 'Fr',
      refreshApp: this.props.refreshApp,
      refreshLanguage: this.props.refreshLanguage,
    };
  }

  switchLanguage = (identifier) => {
    switch(identifier) {
      case 'Fr':
        this.setState({ active: 'Fr'}, this.setLocalizationString)
        break;
      case 'En':
        this.setState({ active: 'En'}, this.setLocalizationString)
        break;
      default:
        break;
    }
  }

  setLocalizationString = () => {
    this.state.refreshLanguage(this.state.active);
    this.state.refreshApp();
  }

  render() {
    let enCssClassName = (this.state.active == 'En') ? "lang-select lang-active" : 'lang-select';
    let frCssClassName = (this.state.active == 'Fr') ? "lang-select lang-active" : 'lang-select';
    return (
      <div className="lang-switcher">
        <div className={enCssClassName} onClick={this.switchLanguage.bind(this, 'En')}>En</div>
        <div className={frCssClassName} onClick={this.switchLanguage.bind(this, 'Fr')}>Fr</div>
      </div>

    );
  }
}
