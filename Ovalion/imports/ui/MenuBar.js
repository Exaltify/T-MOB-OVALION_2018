import React, { Component } from 'react';
import MenuBarItem from './MenuBarItem';

import Calendrier from "./Main-Contents/Calendrier";
import MesVoyages from "./Main-Contents/MesVoyages";
import MonEquipe from "./Main-Contents/MonEquipe";
import Parametres from "./Main-Contents/Parametres";
import Reserver from "./Main-Contents/Reserver";


export default class MenuBar extends Component {

    constructor(props) {
        super(props);
        this.calendrier = <Calendrier/>;
        this.voyage = <MesVoyages />;
        this.equipe = <MonEquipe/>;
        this.parametre = <Parametres/>;
        this.reserver = <Reserver/>;

    }

    render() {
        return (
                <div id="menu-bar">
                    <ul>
                        <MenuBarItem name="Calendrier" view={this.calendrier}/>
                        <MenuBarItem name="Mon Equipe"view={this.equipe}/>
                        <MenuBarItem name="Réserver"view={this.reserver}/>
                        <MenuBarItem name="Mes Voyages"view={this.voyage}/>
                        <MenuBarItem name="Paramètres"view={this.parametre}/>
                    </ul>
                </div>
        );
    }
}