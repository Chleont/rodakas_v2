import React, { useEffect, useState } from "react"
import '../Styles/App.scss'
import '../Styles/Archive.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl } from 'react-intl'
import {FormattedMessage} from 'react-intl'
import PhotoCarousel from './photoCarousel'

export default function Workshops(){

    var lang = useIntl()

    const images = [
        {
            url:'https://i.imgur.com/YT6HFdA.jpg',
            tag: lang.locale === 'el' ? langfileGreek.mavrogiannis : langfileEnglish.mavrogiannis
        },
        {
            url:'https://i.imgur.com/ifExjq3.jpg',
            tag: lang.locale === 'el' ? langfileGreek.karfakis : langfileEnglish.karfakis
        },
        {
            url:'https://i.imgur.com/DeY4Pcc.jpg',
            tag: lang.locale === 'el' ? langfileGreek.drosaki : langfileEnglish.drosaki
        }
    ]

    return(
        <div id="archive">
            <div className="archive-div">
                <span><FormattedMessage id="narratives-archive"/></span>
                <span className="unavailable"><FormattedMessage id="not available"/></span>
                <span><FormattedMessage id="narratives-archive-text"/></span>
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="photo-archive"/></span>
                <span className="unavailable"><FormattedMessage id="not available"/></span>
                <span><FormattedMessage id="photo-archive-text"/></span>
                <PhotoCarousel carouselImages = {images} title={''}/>
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="stone-house-title"/></span>
                <span><FormattedMessage id="stone-house-text"/></span>
                <a target="_blank" data-method="get" href="https://rodakasdotorg.files.wordpress.com/2021/05/katoikia-margarites.pdf"><FormattedMessage id="download"/></a>
            </div>
        </div>
    )
}
