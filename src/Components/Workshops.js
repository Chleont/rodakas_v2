import React, { useEffect, useState } from "react";
import '../Styles/App.scss'
import '../Styles/Workshops.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl';
import {useNavigate } from 'react-router-dom';

export default function Workshops(){

    const [workshops,setWorkshops ] = useState(Object.keys(langfileGreek.workshops).map((key) => langfileGreek.workshops[key]))
    var lang = useIntl()
    var locale = lang.locale
    const [wIndex, setIndex] = useState(workshops.length - 1)
    const [imageIndex, setImageIndex] = useState(0)
    const [isMobile, setWidth] = useState(window.innerWidth < 1000);
    const navigate = useNavigate()

    function toggleArrows(index){
        let arrows = document.getElementsByClassName('workshop-page-arrow')
        if(workshops[index].images.length > 1){
            arrows[0].style.visibility = 'visible'
            arrows[1].style.visibility = 'visible'
         }else{
            arrows[0].style.visibility = 'hidden'
            arrows[1].style.visibility = 'hidden'
         }
    }

    function leftArrow(){
        if(imageIndex > 0){
            let img = document.createElement('img')
            img.setAttribute('src',workshops[wIndex].images[imageIndex - 1])
            img.onclick = ()=>{window.open(workshops[wIndex].images[imageIndex - 1], '_blank').focus()}
            document.getElementById('single-image').innerHTML = ''
            document.getElementById('single-image').append(img)
            setImageIndex(imageIndex - 1)
        }
    }

    function rightArrow(){
        if(workshops[wIndex].images.length - 1 > imageIndex ){
            let img = document.createElement('img')
            img.setAttribute('src',workshops[wIndex].images[imageIndex + 1])
            img.onclick = ()=>{window.open(workshops[wIndex].images[imageIndex + 1], '_blank').focus()}
            document.getElementById('single-image').innerHTML = ''
            document.getElementById('single-image').append(img)
            setImageIndex(imageIndex + 1)
        }
    }

    function showWorkshop(index){
        let img = document.createElement('img')
        document.getElementById('title').innerHTML = ''
        document.getElementById('title').append(workshops[index].title)
        document.getElementById('dates').innerHTML = ''
        document.getElementById('dates').append(workshops[index].dates)
        img.setAttribute('src',workshops[index].images[0])
        img.onclick = ()=>{window.open(workshops[index].images[0], '_blank').focus()}
        document.getElementById('single-image').innerHTML = ''
        document.getElementById('single-image').append(img)
        if(workshops[index].button){
            let button = document.createElement('button')
            button.innerHTML = workshops[index].button
            button.onclick = () =>{
                navigate(workshops[index].navigate)
            }
            document.getElementById('button').innerHTML = ''
            document.getElementById('button').append(button)
        }else{
            document.getElementById('button').innerHTML = ''  
        }
        setImageIndex(0)
        toggleArrows(index)
    }

    useEffect(()=>{
        if(locale === 'el')
        {
            setWorkshops(Object.keys(langfileGreek.workshops).map((key) => langfileGreek.workshops[key]))
        }else{
            setWorkshops(Object.keys(langfileEnglish.workshops).map((key) => langfileEnglish.workshops[key]))
        }
    },[locale])

    useEffect(()=>{
            let img = document.createElement('img')
            document.getElementById('title').innerHTML = ''
            document.getElementById('title').append(workshops[workshops.length - 1].title)
            document.getElementById('dates').innerHTML = ''
            document.getElementById('dates').append(workshops[workshops.length - 1].dates)
            img.setAttribute('src', '../Images/workshops/stone_summer_2023'
            // workshops[workshops.length - 1].images[0]
            )
            if(workshops[workshops.length - 1].button){
                let button = document.createElement('button')
                button.innerHTML = workshops[workshops.length - 1].button
                button.onclick = () =>{
                    navigate(workshops[workshops.length - 1].navigate)
                }
                document.getElementById('button').innerHTML = ''
                document.getElementById('button').append(button)
            }else{
                document.getElementById('button').innerHTML = ''  
            }
            img.onclick = ()=>{window.open(workshops[workshops.length - 1].images[0], '_blank').focus()}
            document.getElementById('single-image').innerHTML = ''
            document.getElementById('single-image').append(img)
            toggleArrows(workshops.length - 1)
            document.getElementById('all-workshops-view').innerHTML = ''
            workshops.map(each =>{
                let img = document.createElement('img')
                img.setAttribute('src',each.images[0])
                img.onclick = () => {
                    setIndex(workshops.indexOf(each))
                }
                document.getElementById('all-workshops-view').prepend(img)
            })
    },[])

    useEffect(()=>{
        showWorkshop(wIndex)
    },[workshops,wIndex])

    return(
        <div id="workshop-page-container">
            {isMobile ? 
                <div id="single-workshop-view">
                    <div id='info'>
                        <span id='title'></span>
                        <span id='dates'></span>
                        <span id='button'></span>
                    </div>
                    <div id='single-image'/>
                    <div id = 'arrow-container'>
                        <span id="le-arr" className="workshop-page-arrow" onClick={()=>leftArrow()}/>
                        <span id="ri-arr" className="workshop-page-arrow" onClick={()=>rightArrow()}/>
                    </div>
                </div>
                :
                <div id="single-workshop-view">
                <div id='info'>
                    <span id='title'></span>
                    <span id='dates'></span>
                    <span id='button'></span>
                </div>
                <span id="le-arr" className="workshop-page-arrow" onClick={()=>leftArrow()}/>
                <div id='single-image'/>
                <span id="ri-arr" className="workshop-page-arrow" onClick={()=>rightArrow()}/>
            </div>
            }
            <div id="all-workshops-view">
            </div>
        </div>
    )
}
