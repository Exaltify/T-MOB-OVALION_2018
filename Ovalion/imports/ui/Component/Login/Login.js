import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import './Login.css';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active,
      refreshApp: props.refreshApp,
      setInactive: props.setInactive,
      localizedString: this.props.localizedString.Login,

    }
  }

  componentWillReceiveProps(props) {
    this.setState({ active: props.active, localizedString: props.localizedString.Login });
  }


  handleSubmit = () => {
    Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
      if (error) {
        let alertMessage = "Erreur : ";
        if (error.error === 403)
          alertMessage += (error.reason === 'Incorrect password') ? 'Mot de passe incorrect.' : 'Adresse mail incorrecte.';
        else
          alertMessage += 'Identifiants incorrects.';
        Bert.alert( alertMessage, 'danger', 'growl-top-right' );
      }
      else {
        console.log('connection success!');
        this.setState({ active: false }, this.state.setInactive(), this.state.refreshApp());
      }
    });
  }

  render() {
    let popupCssClass = (this.state.active) ? 'login-master-container login-active' : 'login-master-container';
    return (
      <div className={ popupCssClass }>
        <div className="login-form-container">
          <form
            className="login-form"
            ref={(form) => { this.form = form; return this.form; }}
            onSubmit={event => event.preventDefault()}
          >
            <label htmlFor="email">
              <input
                className="login-input"
                type="email"
                id="login-email"
                name="emailAddress"
                placeholder={this.state.localizedString.addr}
                ref={(emailAddress) => {
                  this.emailAddress = emailAddress;
                  return this.emailAddress;
                }}
              />
            </label>

            <label htmlFor="password">
              <input
                className="login-input"
                id="login-password"
                type="password"
                name="password"
                placeholder={this.state.localizedString.mdp}
                ref={(password) => { this.password = password; return this.password; }}
              />
            </label>
            <button className="login-button-submit" onClick={this.handleSubmit}><p>{this.state.localizedString.log}</p></button>
          </form>
        </div>
      </div>
    );
  }

}
