import React from "react";
import '../Styles/App.scss'
import '../Styles/About.scss'
import padouva from '../Images/Members/members_padouva.jpg';
import efasouli from '../Images/Members/members_efasouli.jpg';
import papadakis from '../Images/Members/members_papadakis.jpg';
import cleontidis from '../Images/Members/members_cleontidis.jpg';
import {FormattedMessage} from 'react-intl';

export default function About(){
    return(
        <div id="about-page-container">
            <div id="about-texts">
                <div className="about-object">
                    <span className="title"><FormattedMessage id='about1-title'/></span>
                    <span className="text"><FormattedMessage id='about1-text1'/></span>
                    <span className="text"><FormattedMessage id='about1-text2'/></span>
                    <span className="text"><FormattedMessage id='about1-text3'/></span>
                </div>
                <div className="about-object">
                    <span className="title"><FormattedMessage id='about2-title'/></span>
                    <span className="text"><FormattedMessage id='about2-text1'/></span>
                    <span className="text"><FormattedMessage id='about2-text1'/></span>
                </div>
            </div>
            <div id="members">
                <span className="title"><FormattedMessage id='members'/></span>
                <div className="member-line">
                    <div className="member">
                        <img className="member-photo" src={padouva}/>
                        <div className="member-text">
                            <span><FormattedMessage id='members1-mame'/></span>
                            <span><FormattedMessage id='president'/></span>
                            <span><button>More</button></span>
                        </div>
                    </div>
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members2-mame'/></span>
                            <span><FormattedMessage id='secretary'/></span>
                        </div>
                    </div>
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members3-mame'/></span>
                            <span><FormattedMessage id='treasurer'/></span>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members4-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members5-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                    <div className="member">
                        <img className="member-photo" src={efasouli}/>
                        <div className="member-text">
                            <span><FormattedMessage id='members6-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member">
                        <img className="member-photo" src={papadakis}/>
                        <div className="member-text">
                            <span><FormattedMessage id='members7-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                            </div>
                    </div>
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members8-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members9-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member">
                        <img className="member-photo"/>
                        <div className="member-text">
                            <span><FormattedMessage id='members10-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>                
                    <div className="member">
                        <img className="member-photo" src={cleontidis}/>
                        <div className="member-text">
                            <span><FormattedMessage id='members11-mame'/></span>
                            <span><FormattedMessage id='member'/></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}