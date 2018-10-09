import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.js';


export default class Header extends Component {

    handleClick(e) {
        e.preventDefault();
        this.popMenuBar();
    }

    popMenuBar(){
        menubar = document.getElementById('menu-bar');
        menubar.style.width = (menubar.style.width != '30%') ? '30%' : '0%';
    }


    render() {
        return(
            <header>
                <div id="menu-btn" onClick={this.handleClick.bind(this)}>
                    <h1>MENU</h1>
                </div>

                <AccountsUIWrapper />

                <div id="title">
                    <h1>Ovalion</h1>
                </div>


            </header>
        );
    }
}