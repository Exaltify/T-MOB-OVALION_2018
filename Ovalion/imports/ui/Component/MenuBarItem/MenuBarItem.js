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

    componentWillReceiveProps(props) {
      this.setState({ name: props.name });
    }

    setContent = () => {
      this.state.setContent(this.state.contentCode);
    }

    render() {
        return (
            <div className='menubaritem-master' onClick={ this.setContent }>
              <p>{ this.state.name }</p>
            </div>
        );
    }
}
