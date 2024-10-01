import React, { useEffect, useState } from "react";
import '../Styles/App.scss';
import '../Styles/Archive.scss';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { FormattedMessage } from 'react-intl';
import PhotoCarousel from './photoCarousel';

export default function Workshops() {

    const images = [
        {
            url: process.env.PUBLIC_URL + '/Images/Archive/Mavrogiannis.jpg',
            tagEn: langfileEnglish.mavrogiannis,
            tagGr: langfileGreek.mavrogiannis
        },
        {
            url: process.env.PUBLIC_URL + '/Images/Archive/PaKarfakis.jpg',
            tagEn: langfileEnglish.karfakis,
            tagGr: langfileGreek.karfakis
        },
        {
            url: process.env.PUBLIC_URL + '/Images/Archive/ElDrosaki.jpg',
            tagEn: langfileEnglish.drosaki,
            tagGr: langfileGreek.drosaki
        }
    ];

    return (
        <div id="archive">
            <div className="archive-div">
                <span><FormattedMessage id="narratives-archive" /></span>
                <span className="unavailable"><FormattedMessage id="not available" /></span>
                <span><FormattedMessage id="narratives-archive-text" /></span>
            </div>
            <div className="archive-div h-fit">
                <span><FormattedMessage id="photo-archive" /></span>
                <span className="unavailable"><FormattedMessage id="not available" /></span>
                <span><FormattedMessage id="photo-archive-text" /></span>
                <PhotoCarousel carouselImages={images} title={''} />
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="stone-house-title" /></span>
                <span><FormattedMessage id="stone-house-text" /></span>
                <a target="_blank" data-method="get" href="https://rodakasdotorg.files.wordpress.com/2021/05/katoikia-margarites.pdf">
                    <FormattedMessage id="download" />
                </a>
            </div>
        </div>
    );
}
