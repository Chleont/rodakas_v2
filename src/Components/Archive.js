import React, { useState } from "react";
import '../Styles/App.scss'
import '../Styles/Archive.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl } from 'react-intl';
import {FormattedMessage} from 'react-intl';

export default function Workshops(){

    var lang = useIntl()
    const carouselImages = [
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

    const [photoIndex, setIndex] = useState(0)

    function leftArrow(){
        if(photoIndex > 0){
            document.getElementById('photo-carousel').firstElementChild.src = carouselImages[photoIndex - 1].url
            document.getElementById('photo-carousel').lastElementChild.innerHTML = carouselImages[photoIndex - 1].tag
            setIndex(photoIndex - 1)
        }
    }
    
    function rightArrow(){
        if(photoIndex < carouselImages.length - 1){
            document.getElementById('photo-carousel').firstElementChild.src = carouselImages[photoIndex + 1].url
            document.getElementById('photo-carousel').lastElementChild.innerHTML = carouselImages[photoIndex  + 1].tag

            setIndex(photoIndex + 1)  
        }
    }

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
                <span id="photo-carousel">
                    <div className="photo-container">
                        <span id="le-arr" className="workshop-page-arrow" onClick={()=>leftArrow()}/>
                        <img className="carousel-photo" src={carouselImages[photoIndex].url}/>
                        <span id="ri-arr" className="workshop-page-arrow" onClick={()=>rightArrow()}/>
                    </div>
                    <span className="photo-name">{carouselImages[photoIndex].tag}</span>        
                </span>
            </div>
            <div className="archive-div">
                <span><FormattedMessage id="stone-house-title"/></span>
                <span><FormattedMessage id="stone-house-text"/></span>
                <a target="_blank" data-method="get" href="https://rodakasdotorg.files.wordpress.com/2021/05/katoikia-margarites.pdf"><FormattedMessage id="download"/></a>
            </div>
        </div>
    )
}
