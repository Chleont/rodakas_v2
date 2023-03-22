import React, { useEffect, useState } from "react";
import '../Styles/App.scss'
import '../Styles/Multimedia.scss'
import {FormattedMessage} from 'react-intl';

export default function Multimedia(){
    return(
        <div id="multimedia-page-container">
            <div className="multimedia-object">
                <span className="title"><FormattedMessage id='multimedia1-title'/></span>
                <span className="year">2019</span>
                <span className="text"><FormattedMessage id='multimedia1-text'/></span>
                <iframe className="video" src="https://www.youtube.com/embed/SwilYpx4inA"></iframe>
            </div>
            <div className="multimedia-object">
                <span className="title"><FormattedMessage id='multimedia2-title'/></span>
                <span className="year">2018</span>
                <span className="text"><FormattedMessage id='multimedia2-text'/></span>
                <iframe className="video" src="https://www.youtube.com/embed/REPS0llRMtY"></iframe>
            </div>
        </div>
    )

}