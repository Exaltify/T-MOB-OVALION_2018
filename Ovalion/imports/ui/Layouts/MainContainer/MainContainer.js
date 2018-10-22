import React, { Component } from 'react';
import './MainContainer.css';
import MenuBar from '../../Component/MenuBar/MenuBar.js';
import Calendrier from '../Calendrier/Calendrier';
import MesVoyages from "../../Layouts/MesVoyages/MesVoyages";
import MonEquipe from "../../Layouts/MonEquipe/MonEquipe";
import Parametres from "../../Layouts/Parametres/Parametres";
import Reserver from "../../Layouts/Reserver/Reserver";

let CONTENT = {
  HOME: 0,
  CALENDRIER: 1,
  EQUIPE: 2,
  RESERVER: 3,
  VOYAGE: 4,
  PARAMS: 5,
};

export default class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuBarActive: this.props.menuBarActive,
      content: CONTENT.HOME,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ menuBarActive: props.menuBarActive});
  }

  setContent = (content) => {
    this.setState({ content: content });
  }

  getContent = () => {
    switch (this.state.content) {
      case CONTENT.HOME:
        break;
      case CONTENT.CALENDRIER:
        return <Calendrier/>;
      case CONTENT.VOYAGE:
        return <MesVoyages/>;
      case CONTENT.EQUIPE:
        return <MonEquipe/>;
      case CONTENT.PARAMS:
        return <Parametres/>;
      case CONTENT.RESERVER:
        return <Reserver/>;
      default:
        break;
    }
  }

  render() {
    return(
      <div className="main">
        <div className="main-container">
          <MenuBar active={ this.state.menuBarActive } contentHandler={ this.setContent }/>
          <div className="main-content">
            { this.getContent() }
          </div>
        </div>
      </div>
    );
  }
}
