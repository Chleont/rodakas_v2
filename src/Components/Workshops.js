import React, { useEffect, useState } from "react"
import '../Styles/App.scss'
import '../Styles/Workshops.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl'
import StoneworkshopPage from "./stoneWorkshopPage"
import LoomworkshopPage from "./loomWorkshopPage"
import StonecurvingPage from "./stoneCurvingPage"
import Feast23 from "./Feast23"

export default function Workshops(props){

    const [workshops,setWorkshops ] = useState(Object.keys(langfileGreek.workshops).map((key) => langfileGreek.workshops[key]))
    var lang = useIntl()
    var locale = lang.locale
    const [wIndex, setIndex] = useState(workshops.length - 1)
    const [imageIndex, setImageIndex] = useState(0)
    const [isMobile, setWidth] = useState(window.innerWidth < 1000)
    const [routedToComponent, setRoutedToComponent] = useState(false)
    const [specialComponentDisplayed, setSpecialComponentDisplayed] = useState(<></>)

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

    function renderWorkshopPage(url){
        window.history.replaceState(null, "workshop", "/activity" + url)
        setRoutedToComponent(true)
        if(url == '/stoneworkshop'){
            setSpecialComponentDisplayed(<StoneworkshopPage/>)
            setRoutedToComponent(true)
        }else if(url == '/feast23'){
            setSpecialComponentDisplayed(<Feast23/>)
            setRoutedToComponent(true)
        }else if(url == '/loomworkshop'){
            setSpecialComponentDisplayed(<LoomworkshopPage/>)
            setRoutedToComponent(true)
        }else if(url == '/stonecurving'){
            setSpecialComponentDisplayed(<StonecurvingPage/>)
            setRoutedToComponent(true)
        }
    }

    function renderSingleImagePage(){
        if(props.url == ''){
            window.history.replaceState(null, "activity", "/activity")
            setRoutedToComponent(false)    
        }else if(props.url != '' && !routedToComponent){
            window.history.replaceState(null, "activity", "/activity")
        }
    }

    useEffect(()=>{
        if(!routedToComponent){
            document.getElementById('single-workshop-view').style.padding = '2em 0 1em 0'
            if(props.url == ''){
                let img = document.createElement('img')

                document.getElementById('title').append(workshops[wIndex].title)
                if(workshops[wIndex].subtitle){
                    document.getElementById('title2').append(workshops[wIndex].subtitle)
                }
                document.getElementById('dates').append(workshops[wIndex].dates)
                img.setAttribute('src',workshops[wIndex].images[0])
                img.onclick = ()=>{window.open(workshops[wIndex].images[0], '_blank').focus()}
                document.getElementById('single-image').innerHTML = ''
                document.getElementById('single-image').append(img)
                if(workshops[wIndex].button){
                    let button = document.createElement('button')

                    button.innerHTML = workshops[wIndex].button
                    button.onclick = () =>{
                        renderWorkshopPage(workshops[wIndex].navigate)
                    }
                    document.getElementById('button').innerHTML = ''
                    document.getElementById('button').append(button)
                }else{
                    document.getElementById('button').innerHTML = ''  
                }
                setImageIndex(0)
                toggleArrows(wIndex)
                setSpecialComponentDisplayed(<></>)
            }
        }else if(routedToComponent){
            document.getElementById('single-workshop-view').style.padding = '1.5em 0 1em 0'
        }
    },[routedToComponent])



    function showWorkshop(index){
        if(!routedToComponent){
            let img = document.createElement('img')

            document.getElementById('title').innerHTML = ''
            document.getElementById('title').append(workshops[index].title)
            if(workshops[index].subtitle){
                document.getElementById('title2').innerHTML = ''
                document.getElementById('title2').append(workshops[index].subtitle)
            }
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
                    renderWorkshopPage(workshops[index].navigate)
                }
                document.getElementById('button').innerHTML = ''
                document.getElementById('button').append(button)
            }else{
                document.getElementById('button').innerHTML = ''  
            }
            setImageIndex(0)
            toggleArrows(index)
        }else{
            renderSingleImagePage()
        }
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
        if(props.url == ''){
            let img = document.createElement('img')

            document.getElementById('title').innerHTML = ''
            document.getElementById('title').append(workshops[workshops.length - 1].title)
            if(workshops[workshops.length - 1].subtitle){
                document.getElementById('title2').innerHTML = ''
                document.getElementById('title2').append(workshops[workshops.length - 1].title)
            }
            document.getElementById('dates').innerHTML = ''
            document.getElementById('dates').append(workshops[workshops.length - 1].dates)
            img.setAttribute('src', '../Images/workshops/stone_summer_2023'
            // workshops[workshops.length - 1].images[0]
            )
            if(workshops[workshops.length - 1].button){
                let button = document.createElement('button')

                button.innerHTML = workshops[workshops.length - 1].button
                button.onclick = () =>{
                    renderWorkshopPage(workshops[workshops.length - 1].navigate)
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
        }else if(props.url == '/stoneworkshop'){
            setSpecialComponentDisplayed(<StoneworkshopPage/>)
            setRoutedToComponent(true)
        }else if(props.url == '/feast23'){
            setSpecialComponentDisplayed(<Feast23/>)
            setRoutedToComponent(true)
        }else if(props.url == '/loomworkshop'){
            setSpecialComponentDisplayed(<LoomworkshopPage/>)
            setRoutedToComponent(true)
        }else if(props.url == '/stonecurving'){
            setSpecialComponentDisplayed(<StonecurvingPage/>)
            setRoutedToComponent(true)
        }
        document.getElementById('all-workshops-view').innerHTML = ''
        workshops.map(each =>{
            let img = document.createElement('img')

            img.setAttribute('src',each.images[0])
            img.onclick = () => {
                setRoutedToComponent(false)  
                window.history.replaceState(null, "activity", "/activity")
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
            {routedToComponent?
                <div id="single-workshop-view">
                    {specialComponentDisplayed}
                </div>
                :
                isMobile ? 
                    <div id="single-workshop-view">
                        <div id='info'>
                            <span id='title'></span>
                            <span id='title2'></span>
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
                            <span id='title2'></span>
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
