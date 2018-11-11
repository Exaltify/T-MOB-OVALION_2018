import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import './Register.css';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localizedString: this.props.localizedString.Register,
    }
  }

  componentWillReceiveProps(props) {
    console.log(props);
    this.setState({ localizedString: props.localizedString.Register })
  }

  handleSubmit = () => {
    let mail = this.emailAddress.value;
    let password = this.password.value;
    let city = this.city.value;
    let admin = 0;

    Meteor.call('user.insert', admin, mail, password, city,
      (err) => {
        if (err) {
          console.log('error creating acc');
          console.log(err);
          Bert.alert( this.state.localizedString.errorcreate, 'danger', 'growl-top-right' );
        }else {
          Bert.alert(this.state.localizedString.createacc, 'success', 'growl-top-right');
        }
      })
  }

  render() {
    return (
      <div className="register-master-container">
        <div className="register-container">
          <div className="register-title">
            <p>{this.state.localizedString.bvn}</p>
          </div>
          <div className="register-form-container">
            <form
              className="register-form"
              ref={(form) => { this.form = form; return this.form; }}
              onSubmit={event => event.preventDefault()}
            >
              <label htmlFor="email">
                <input
                  className="register-input"
                  type="email"
                  id="email"
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
                className="register-input"
                id="password"
                type="password"
                name="password"
                placeholder={this.state.localizedString.mdp}
                ref={(password) => { this.password = password; return this.password; }}
              />
            </label>

            <label htmlFor="city">
              <input
                className="register-input"
                id="city"
                type="text"
                name="city"
                placeholder={this.state.localizedString.city}
                ref={(password) => { this.city = city; return this.city; }}
              />
            </label>
            <button className="register-button-submit" onClick={this.handleSubmit}><p>{this.state.localizedString.reg}</p></button>
          </form>
          </div>
        </div>
      </div>
    );
  }

}
