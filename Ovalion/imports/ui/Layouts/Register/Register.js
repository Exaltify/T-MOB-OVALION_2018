import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

//import './Register.css';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',
      city: '',
    }
  }

  handleSubmit = () => {
    let mail = this.state.mail;
    let password = this.state.password;
    let city = this.state.city;

    Meteor.call('user.insert', admin, mail, password, city,
      (err) => {
        if (err)
          console.log('error creating acc');
      })
  }

  render() {
    return (
      <div className="login-master-container">
        <div className="login-title">
          <p>Bienvenue sur Ovalion !</p>
        </div>
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
                id="email"
                name="emailAddress"
                placeholder="Adresse email"
                ref={(emailAddress) => {
                  this.emailAddress = emailAddress;
                  return this.emailAddress;
                }}
              />
            </label>

            <label htmlFor="password">
              <input
                className="login-input"
                id="password"
                type="password"
                name="password"
                placeholder="Mot de passe"
                ref={(password) => { this.password = password; return this.password; }}
              />
            </label>
            <button className="login-button-submit" onClick={this.handleSubmit}><p>S'inscrire</p></button>
          </form>
        </div>
      </div>
    );
  }

}
