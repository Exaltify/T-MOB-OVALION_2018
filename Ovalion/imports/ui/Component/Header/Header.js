import React, { Component } from 'react';
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import './Header.css';


export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenubar: this.props.menuBarHandler,
      active: false,
    };
  }

    popMenuBar = () => {
        this.state.showMenubar();
        this.setState({ active: !this.state.active });
    }


    render() {
        let hamburgerCssClass = (this.state.active) ? "hamburger hamburger--collapse no-outline is-active" :
                                                      "hamburger hamburger--collapse no-outline";
        return(
            <div className="header-main-container">
              <button className={ hamburgerCssClass } type="button"  onClick={this.popMenuBar}>
                <span className="hamburger-box">
                  <span className="hamburger-inner"/>
                </span>
              </button>
              <div className="header-login-button">
               <AccountsUIWrapper />
              </div>
              <div className="header-logo-container">
                <img className="header-logo-image" src='assets/logo.png' />
              </div>
            </div>
        );
    }
}
