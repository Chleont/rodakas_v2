import React, { useEffect } from "react";
import '../Styles/App.scss'
import '../Styles/Workshops.scss'
import langfile from '../Lang/el.json'


export default function Workshops(){

    const workshops  = Object.keys(langfile.workshops).map((key) => langfile.workshops[key])

    useEffect(()=>{
        document.getElementById('all-workshops-view').innerHTML = ''
        workshops.map(each =>{
            console.log(each.image1)
            let img = document.createElement('img')
            img.setAttribute('src',each.image1)
            img.setAttribute('width','200')
            document.getElementById('all-workshops-view').append(img)
        })
    },[workshops])

    return(
        <div id="workshop-page-container">
            <div id="single-workshop-vue">
            </div>
            <div id="all-workshops-view">
            </div>
        </div>
    )
}