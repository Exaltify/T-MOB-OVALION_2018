import React, { Component } from 'react';
import './LoginButton.css';
import Login from '../Login/Login';
import { Meteor } from "meteor/meteor"

export default class LoginButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      refreshApp: this.props.refreshApp,
      localizedString: this.props.localizedString.LoginButton,
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ localizedString: props.localizedString.LoginButton })
  }

  showLoginPopup = (active) => {
    if (Meteor.userId()) {
      Meteor.logout(this.state.refreshApp);
      this.setState({ active: false });
      return;
    }
    this.setState({ active: active });
    }

  setInactive = () => {
    this.setState({ active: false });
  }

  render() {
    let loginText = (Meteor.userId()) ? this.state.localizedString.disco : this.state.localizedString.co;
    return (
      <div className="login-button-master">
        <div className="login-button-container" onClick={ this.showLoginPopup.bind(this, !this.state.active) } >
          <i className="material-icons">account_box</i>
          <p>{ loginText }</p>
        </div>
        <Login active={ this.state.active } refreshApp={ this.state.refreshApp } setInactive={ this.setInactive } localizedString={ this.props.localizedString } />
      </div>
        );
  }

}
