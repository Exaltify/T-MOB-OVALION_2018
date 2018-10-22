import React, { Component } from 'react';
import './MenuBarItem.css';

export default class MenuBarItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: this.props.name,
          contentCode: this.props.contentCode,
          setContent: this.props.contentHandler,
        }

    }

    setContent = () => {
      this.state.setContent(this.state.contentCode);
    }

    render() {
        return (
            <li onClick={ this.setContent }>{ this.state.name }</li>
        );
    }
}
