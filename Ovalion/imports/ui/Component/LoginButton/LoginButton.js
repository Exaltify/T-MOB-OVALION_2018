import React, { Component } from 'react';
import './LoginButton.css';
import Login from '../Login/Login';
import { Meteor } from "meteor/meteor"

export default class LoginButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      refreshApp: this.props.refreshApp,
    }
  }

  showLoginPopup = () => {
    if (Meteor.userId()) {
      Meteor.logout(this.state.refreshApp);
      this.setState({ active: false });
      return;
    }
    this.setState({ active: !this.state.active });
  }

  render() {
    let loginText = (Meteor.userId()) ? "Se déconnecter" : "Se connecter";
    return (
      <div className="login-button-master">
        <div className="login-button-container" onClick={ this.showLoginPopup } >
          <i className="material-icons">account_box</i>
          <p>{ loginText }</p>
        </div>
        <Login active={ this.state.active } refreshApp={ this.state.refreshApp } />
      </div>
        );
  }

}
