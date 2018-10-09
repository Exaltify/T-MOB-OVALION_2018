import React, { Component } from 'react';
import { render } from 'react-dom';

export default class MenuBarItem extends Component {

    handlerClick() {
        render(
            this.props.view,
            document.getElementById("main-content")
        )
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <li onClick={this.handlerClick.bind(this)}>{this.props.name}</li>
        );
    }
}