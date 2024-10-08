import React, { useEffect } from "react";
import '../Styles/App.scss';
import '../Styles/Contact.scss';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import logo from './home_logo.png';
import Footer from './Footer.jsx';
import geopark from './geopark.png';
import globalGeoparks from './global-geoparks.png';
import europeanGeoparks from './european-geoparks.png';


export default function Contact() {
    var lang = useIntl();
    var locale = lang.locale;

    return (
        <div id="contact-page">
            <img src={logo} className="app-logo" id="contactpage-logo" alt="logo" />
            <span id='contact-title'><FormattedMessage id="COMMUNICATION" /></span>
            <span className="contact-info"><FormattedMessage id="address" />:&nbsp;<a id="address-link" href="https://goo.gl/maps/tYvfeehq4TCpodGm9" target="_blank"><FormattedMessage id="margarites" /></a></span>
            <span className="contact-info">Email: rodakas.org@gmail.com</span>
            <span className="contact-info">Α.Γ.Ε.ΜΗ: 169024650000</span>
            <span className="contact-info"><FormattedMessage id="president-contact" /></span>
            <span className="contact-info"><FormattedMessage id="secretary-contact" /></span>
            <span className="contact-info"><FormattedMessage id="clerk-contact" /></span>
            <a id="contact-button" target="_blank" href="https://forms.gle/FLdCKXrDMk3euu7c6"><FormattedMessage id="send-us-message" /></a>
            <Footer />
            <div className="logos-container">
                <div id='double-logo'>
                    <img src={globalGeoparks} className='logo' alt='global-geoparks' />
                    <img src={europeanGeoparks} className='logo' alt='european-geoparks' />
                </div>
                <a href='https://www.psiloritisgeopark.gr/' target='_blank'><img src={geopark} className='logo' id='geopark-logo' alt='geopark' /></a>
            </div>
        </div>
    );
}