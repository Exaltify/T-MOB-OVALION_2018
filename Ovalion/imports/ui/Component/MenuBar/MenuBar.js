import React, { Component } from 'react';
import MenuBarItem from '../MenuBarItem/MenuBarItem';
import "./MenuBar.css";

export default class MenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
          active: this.props.active,
          setContent: this.props.contentHandler,
          localizedString: this.props.localizedString.Menubar,
        };
    }

  componentWillReceiveProps(props) {
      this.setState({ active: props.active, localizedString: props.localizedString.Menubar });
  }

  setParentContent = (content) => {
      this.state.setContent(content);
  }

  render() {
      let menuBarCssClass = (this.state.active) ? "menu-bar active" : "menu-bar";
        return (
                <div className={ menuBarCssClass }>
                    <div>
                        <MenuBarItem name={this.state.localizedString.Cal } contentHandler={ this.setParentContent } contentCode={1} />
                        <MenuBarItem name={this.state.localizedString.Eq} contentHandler={ this.setParentContent } contentCode={2} />
                        <MenuBarItem name={this.state.localizedString.Res} contentHandler={ this.setParentContent } contentCode={3} />
                        <MenuBarItem name={this.state.localizedString.Voy} contentHandler={ this.setParentContent } contentCode={4} />
                        <MenuBarItem name={this.state.localizedString.Par} contentHandler={ this.setParentContent } contentCode={5} />
                    </div>
                </div>
        );
    }
}
