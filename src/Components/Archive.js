import React, { useEffect, useState } from "react";
import '../Styles/App.scss'
import '../Styles/Archive.scss'
import { useIntl } from 'react-intl';
import {FormattedMessage} from 'react-intl';

export default function Workshops(){
    return(
        <div id="archive">
            <div className="archive-div">
                <span><FormattedMessage id="narratives-archive"/></span>
                <span><FormattedMessage id="not available"/></span>
                <span><FormattedMessage id="narratives-archive-text"/></span>
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="photo-archive"/></span>
                <span><FormattedMessage id="not available"/></span>
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="stone-house-title"/></span>
                <span><FormattedMessage id="stone-house-text"/></span>
            </div>
        </div>
    )
}
