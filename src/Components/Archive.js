import React, { useEffect, useState } from "react";
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

    var photoIndex = 0
    var interval = null


    function leftArrow(){
        if(photoIndex > 0){
            document.getElementById(`photo${photoIndex}`).style.opacity = '0'
            document.getElementById(`photo${photoIndex - 1}`).style.opacity = '1'
            document.getElementById(`photo${photoIndex}`).style.zIndex = '1'
            document.getElementById(`photo${photoIndex - 1}`).style.zIndex = '2'
            photoIndex = photoIndex - 1
        }else{
            goToEnd()
        }
    }
    
    function rightArrow(){
        if(photoIndex < carouselImages.length - 1){
            document.getElementById(`photo${photoIndex}`).style.opacity = '0'
            document.getElementById(`photo${photoIndex + 1}`).style.opacity = '1'
            document.getElementById(`photo${photoIndex}`).style.zIndex = '1'
            document.getElementById(`photo${photoIndex + 1}`).style.zIndex = '2'
            photoIndex = photoIndex + 1
        }else{
            goToStart()
        }
    }

    function goToStart(){
        document.getElementById(`photo${photoIndex}`).style.opacity = '0'
        document.getElementById(`photo0`).style.opacity = '1'
        document.getElementById(`photo${photoIndex}`).style.zIndex = '1'
        document.getElementById(`photo0`).style.zIndex = '2'
        photoIndex = 0
    }

    function goToEnd(){
        document.getElementById(`photo${photoIndex}`).style.opacity = '0'
        document.getElementById(`photo${carouselImages.length - 1}`).style.opacity = '1'
        document.getElementById(`photo${photoIndex}`).style.zIndex = '1'
        document.getElementById(`photo${carouselImages.length - 1}`).style.zIndex = '2'
        photoIndex = carouselImages.length - 1
    }

    useEffect(()=>{
        console.log('a')
        document.getElementById('photo0').style.zIndex = 2;
        document.getElementById('photo0').style.opacity = 1;
        interval = setInterval(rightArrow,15000)
    },[])

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
                        {carouselImages.map( each =>{
                            return(
                                <div className='each-container' style={{opacity:0,zIndex:1}} key={carouselImages.indexOf(each)} id={'photo' + carouselImages.indexOf(each)}>
                                    <img id="carousel-photo" src={each.url}/>
                                    <span id="photo-name">{each.tag}</span>        
                                </div>
                            )
                        })}
                        <span id="ri-arr" className="workshop-page-arrow" onClick={()=>rightArrow()}/>
                    </div>
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
