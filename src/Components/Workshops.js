import React, { useEffect, useState } from "react";
import '../Styles/App.scss'
import '../Styles/Workshops.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl';

export default function Workshops(){

    const [workshops,setWorkshops ] = useState(Object.keys(langfileGreek.workshops).map((key) => langfileGreek.workshops[key]))
    var lang = useIntl()
    var locale = lang.locale
    const [wIndex, setIndex] = useState(workshops.length - 1)

    function showWorkshop(index){
        let img = document.createElement('img')
        document.getElementById('title').innerHTML = ''
        document.getElementById('title').append(workshops[index].title)
        document.getElementById('dates').innerHTML = ''
        document.getElementById('dates').append(workshops[index].dates)
        img.setAttribute('src',workshops[index].image1)
        document.getElementById('single-image').innerHTML = ''
        document.getElementById('single-image').append(img)
    }
    useEffect(()=>{
        if(locale == 'el')
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
            img.setAttribute('src',workshops[workshops.length - 1].image1)
            document.getElementById('single-image').innerHTML = ''
            document.getElementById('single-image').append(img)
            document.getElementById('all-workshops-view').innerHTML = ''
            workshops.map(each =>{
                let img = document.createElement('img')
                img.setAttribute('src',each.image1)
                img.onclick = () => {
                    setIndex(workshops.indexOf(each))
                }
                document.getElementById('all-workshops-view').prepend(img)
            })
    },[])

    useEffect(()=>{
        showWorkshop(wIndex)
    },[workshops])

    useEffect(()=>{
        showWorkshop(wIndex)
    },[wIndex])

    return(
        <div id="workshop-page-container">
            <div id="single-workshop-view">
                <div id='single-image'></div>
                <div id='info'>
                    <span id='title'></span>
                    <span id='dates'></span>
                </div>
            </div>
            <div id="all-workshops-view">
            </div>
        </div>
    )
}