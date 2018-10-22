import React, { Component } from 'react';
import MenuBarItem from '../MenuBarItem/MenuBarItem';
import "./MenuBar.css";

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
                        <MenuBarItem name="Calendrier" contentHandler={ this.setParentContent } contentCode={1} />
                        <MenuBarItem name="Mon Equipe" contentHandler={ this.setParentContent } contentCode={2} />
                        <MenuBarItem name="Réserver" contentHandler={ this.setParentContent } contentCode={3} />
                        <MenuBarItem name="Mes Voyages" contentHandler={ this.setParentContent } contentCode={4} />
                        <MenuBarItem name="Paramètres" contentHandler={ this.setParentContent } contentCode={5} />
                    </ul>
                </div>
        );
    }
}
