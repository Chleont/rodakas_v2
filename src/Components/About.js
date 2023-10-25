import React from "react"
import '../Styles/App.scss'
import '../Styles/About.scss'
import padouva from '../Images/Members/members_padouva.jpg'
import papadakis from '../Images/Members/members_papadakis.jpg'
import cleontidis from '../Images/Members/members_cleontidis.jpg'
import defaultIcon from './home_logo.png'
import {FormattedMessage} from 'react-intl'

export default function About(){

    function showCv(e){
        let id = e.target.parentElement.parentElement.parentElement.id

        document.getElementById(id).lastElementChild.style.display = 'flex'
        document.getElementById(id).firstElementChild.lastElementChild.lastElementChild.style.display = 'none'
    }

    function hideCv(e){
        let id = e.target.parentElement.parentElement.id

        document.getElementById(id).lastElementChild.style.display = 'none'
        document.getElementById(id).firstElementChild.lastElementChild.lastElementChild.style.display = 'block'
    }

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
                    <span className="text"><FormattedMessage id='about2-text2'/></span>
                </div>
            </div>
            <div id="members">
                <span className="title"><FormattedMessage id='members'/></span>
                <div className="member-line">
                    <div className="member" id='padouva'>
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={padouva}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members1-mame'/></span>
                                <span><FormattedMessage id='president'/> - <FormattedMessage id='members1-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members1-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id='stamataki'>
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members2-mame'/></span>
                                <span><FormattedMessage id='secretary'/> - <FormattedMessage id='members2-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members2-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id='vfasouli'>
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members3-mame'/></span>
                                <span><FormattedMessage id='treasurer'/> - <FormattedMessage id='members3-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members3-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member" id="skepetzaki">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members4-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members4-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members4-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id="aleontidis">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members5-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members5-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members5-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id="efasouli">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members6-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members6-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members6-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member" id="papadakis">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={papadakis}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members7-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members7-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members7-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id="tzanidakis">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members8-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members8-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members8-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                    <div className="member" id="kavgalaki">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members9-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members9-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members9-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                </div>
                <div className="member-line">
                    <div className="member" id="touloupa">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={defaultIcon}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members10-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members10-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members10-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>                
                    <div className="member" id="cleontidis">
                        <div className="member-text-photo-container">
                            <img className="member-photo" src={cleontidis}/>
                            <div className="member-text">
                                <span><FormattedMessage id='members11-mame'/></span>
                                <span><FormattedMessage id='member'/> - <FormattedMessage id='members11-title'/></span>
                                <span id="do-arr" onClick={event=>showCv(event)} className="about-page-arrow"/>
                            </div>
                        </div>
                        <div className="member-cv-container">
                            <span><FormattedMessage id='members11-text'/></span>
                            <span id="up-arr" onClick={event=>hideCv(event)} className="about-page-arrow"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}