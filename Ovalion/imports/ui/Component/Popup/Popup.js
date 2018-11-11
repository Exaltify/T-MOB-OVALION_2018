import React, { Component } from 'react';
import dateParser from "../../../dateParser/dateParser";
import './Popup.css';

export default class Popup extends Component {

  stop  = e => {
    e.stopPropagation();
  }


  constructor(props) {
    super(props);
    this.state = {
      popupInfo: this.props.popupInfo,
      closePopup: this.props.closePopup,
      toggleReservation: this.props.toggleReservation,
    }
  }

  render() {
    let current = Date.now();
    let date = this.state.popupInfo.match.date;
    let userTeam = Meteor.user().profile.team;
    let userTeamMatch;

    if (userTeam === this.state.popupInfo.home._id)
      userTeamMatch = this.state.popupInfo.home;
    if (userTeam === this.state.popupInfo.away._id)
      userTeamMatch = this.state.popupInfo.away;

    console.log(userTeamMatch);


    return (
      <div className='popup' onClick={this.state.closePopup}>
        <div className='popup_inner'  onClick={this.stop} >
          <div className="popup-container">
            <div className="team-formater popup-team">
              <div className="popup-logo">
                <img src={ this.state.popupInfo.home.logoSrc } />
              </div>
              <div><p>{ this.state.popupInfo.home.name }</p></div>
            </div>

            {current > date ?
              <div className="popup-versus">

                {userTeamMatch ?
                  <div>

                  {this.state.popupInfo.match.result[0] > this.state.popupInfo.match.result[1] ?
                    <div>
                      {userTeamMatch._id === this.state.popupInfo.home._id ?
                        <div className="green"><b>{this.state.popupInfo.match.result[0]}</b> - {this.state.popupInfo.match.result[1]}</div>
                        :
                        <div className="red"><b>{this.state.popupInfo.match.result[0]}</b> - {this.state.popupInfo.match.result[1]}</div>
                      }

                      </div>
                    :
                    <div>

                      {userTeamMatch._id === this.state.popupInfo.away._id ?
                        <div className="green">{this.state.popupInfo.match.result[0]} - <b>{this.state.popupInfo.match.result[1]}</b></div>
                        :
                        <div className="red">{this.state.popupInfo.match.result[0]} - <b>{this.state.popupInfo.match.result[1]}</b></div>
                      }


                    </div>

                  }

                  </div>

                  :
                    <div>{this.state.popupInfo.match.result[0]} - {this.state.popupInfo.match.result[1]}</div>
                }


                <p>{dateParser.getDateEvent(this.state.popupInfo.match.date, 'Fr')}</p>
                <p>{this.state.popupInfo.match.cityLocation}</p>

              </div>
              :
              <div className="popup-versus">
                <p>XX - YY</p>

                <p>{dateParser.getDateEvent(this.state.popupInfo.match.date, 'Fr')}</p>
                <p>{this.state.popupInfo.match.cityLocation}</p>

              </div>

            }

            <div className="team-formater popup-team">
              <div className="popup-logo">
                <img src={ this.state.popupInfo.away.logoSrc } />
              </div>
              <div><p>{ this.state.popupInfo.away.name }</p></div>
            </div>


          </div>

          {current < date ?
            <button className="popup-button-reserver" onClick={this.state.toggleReservation.bind(this, this.state.popupInfo.match)}>Reserver</button>
            :
            null
          }
        </div>
      </div>
    );
  }
}
