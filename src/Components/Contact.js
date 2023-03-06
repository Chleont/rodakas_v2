import React from "react";
import '../Styles/App.scss'
import '../Styles/Contact.scss'
import {useIntl} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import logo from './home_logo.png';
import Footer from './Footer.js'


export default function Contact(){
    var lang = useIntl()
    var locale = lang.locale

    return(
        <div id="contact-page">
            <img src={logo} className="app-logo" id="contactpage-logo" alt="logo" />
            <span id='contact-title'><FormattedMessage id="COMMUNICATION"/></span>
            <span className="contact-info"><FormattedMessage id="address"/>:&nbsp;<a id="address-link" href="https://goo.gl/maps/tYvfeehq4TCpodGm9" target="_blank"><FormattedMessage id="margarites"/></a></span>
            <span className="contact-info">Email: rodakas.koinsep@gmail.com</span>
            <span className="contact-info">Α.Γ.Ε.ΜΗ: 166370861000</span>
            <span className="contact-info"><FormattedMessage id="president-contact"/></span>
            <span className="contact-info"><FormattedMessage id="secretary-contact"/></span>
            <span className="contact-info"><FormattedMessage id="clerk-contact"/></span>
            <a id="contact-button" target="_blank" href="https://forms.gle/FLdCKXrDMk3euu7c6"><FormattedMessage id="send-us-message"/></a>
            <Footer/>
        </div>
    )
}