import React, { useRef, useEffect, useState } from 'react'
import {FormattedMessage} from 'react-intl'
import { useIntl } from 'react-intl'


export function PhotoCarousel(props){
    
    var lang = useIntl()
    var locale = lang.locale
    const carouselImages = props.carouselImages
    const photoIndex = useRef(0)
    const [image,setImage] = useState(carouselImages[0])
    var timer = useRef(null)

    useEffect(()=>{
        timer.current = setTimeout(()=>{rightArrow()}, 5000)
        return (() =>{clearTimeout(timer.current)})
    },[])
    
    useEffect(()=>{
        setImage(carouselImages[photoIndex.current])
    },[carouselImages])

    function leftArrow() {
        if (photoIndex > 0) {
            photoIndex.current = photoIndex.current - 1
            setImage(carouselImages[photoIndex.current])
        } else {
            photoIndex.current = carouselImages.length - 1
            setImage(carouselImages[photoIndex.current])
        }
    }

    function rightArrow(){
        clearTimeout(timer.current)
        if (photoIndex.current < 2) {
            photoIndex.current = photoIndex.current + 1
            setImage(carouselImages[photoIndex.current])
        } else {
            photoIndex.current = 0 
            setImage(carouselImages[photoIndex.current])
        }
        timer.current = setTimeout(()=>{rightArrow()}, 5000)
    }

    return (
        <span id="photo-carousel" className='h-fit'>
            <span className='category-title'>{props.title!=''?<FormattedMessage id={props.title}/>:''}</span>
            <div className="photo-container">
                <span id="ca-le-arr" className="workshop-page-arrow" onClick={()=>{leftArrow()}} />
                <div
                    className="each-container"
                    style={{ height:'610px', display:'flex', flex:'100%', flexDirection:'row', justifyContent:'center'}}
                    key={carouselImages.indexOf(image)}
                    id={image.url}
                >
                    <img id="carousel-photo" src={image.url} onClick={props.click?()=>props.click(image.index):()=>{}}/>
                    <span id="photo-name">{locale === 'el'? image.tagGr:image.tagEn}</span>
                </div>
                <span id="ca-ri-arr" className="workshop-page-arrow" onClick={()=>{rightArrow()}} />
            </div>
        </span>
    )
}


export default PhotoCarousel