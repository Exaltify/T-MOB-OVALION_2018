import React, { Component } from 'react';
import MenuBarItem from '../MenuBarItem/MenuBarItem';
import "./MenuBar.css";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        Cal:"Calendar",
        Eq:"My team",
        Res:"Reservation",
        Voy:"My trips",
        Par:"Parameters",
    },
    fr: {
        Cal:"Calendrier",
        Eq:"Mon equipe",
        Res:"Reservation",
        Voy:"Mes voyages",
        Par:"Paramètres",
    }
});

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
                        <MenuBarItem name={strings.Cal} contentHandler={ this.setParentContent } contentCode={1} />
                        <MenuBarItem name={strings.Eq} contentHandler={ this.setParentContent } contentCode={2} />
                        <MenuBarItem name={strings.Res} contentHandler={ this.setParentContent } contentCode={3} />
                        <MenuBarItem name={strings.Voy} contentHandler={ this.setParentContent } contentCode={4} />
                        <MenuBarItem name={strings.Par} contentHandler={ this.setParentContent } contentCode={5} />
                    </ul>
                </div>
        );
    }
}
