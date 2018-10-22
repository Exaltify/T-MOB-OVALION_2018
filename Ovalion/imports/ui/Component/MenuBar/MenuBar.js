import React, { Component } from 'react';
import MenuBarItem from '../MenuBarItem/MenuBarItem';
import "./MenuBar.css";
import LocalizedStrings from 'react-localization';
import { MenuBarStrings } from '../../../localization/strings';

export default class MenuBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
          active: this.props.active,
          setContent: this.props.contentHandler,
        };
    }

  componentWillReceiveProps(props) {
    this.setState({ active: props.active});
  }

  setParentContent = (content) => {
      this.state.setContent(content);
  }


  render() {
      let menuBarCssClass = (this.state.active) ? "menu-bar active" : "menu-bar";
        return (
                <div className={ menuBarCssClass }>
                    <ul>
                        <MenuBarItem name={MenuBarStrings.Cal} contentHandler={ this.setParentContent } contentCode={1} />
                        <MenuBarItem name={MenuBarStrings.Eq} contentHandler={ this.setParentContent } contentCode={2} />
                        <MenuBarItem name={MenuBarStrings.Res} contentHandler={ this.setParentContent } contentCode={3} />
                        <MenuBarItem name={MenuBarStrings.Voy} contentHandler={ this.setParentContent } contentCode={4} />
                        <MenuBarItem name={MenuBarStrings.Par} contentHandler={ this.setParentContent } contentCode={5} />
                    </ul>
                </div>
        );
    }
}
