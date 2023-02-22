import React, { useEffect } from "react";
import '../Styles/App.scss'
import '../Styles/Workshops.scss'
import langfile from '../Lang/el.json'


export default function Workshops(){

    const workshops  = Object.keys(langfile.workshops).map((key) => langfile.workshops[key])

    useEffect(()=>{
            let img = document.createElement('img')
            document.getElementById('title').innerHTML = ''
            document.getElementById('title').append(workshops[workshops.length - 1].title)
            document.getElementById('dates').innerHTML = ''
            document.getElementById('dates').append(workshops[workshops.length - 1].dates)
            img.setAttribute('src',workshops[workshops.length - 1].image1)
            document.getElementById('single-image').innerHTML = ''
            document.getElementById('single-image').append(img)
    },[])

    useEffect(()=>{
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

        document.getElementById('all-workshops-view').innerHTML = ''
        workshops.map(each =>{
            console.log(each.image1)
            let img = document.createElement('img')
            img.setAttribute('src',each.image1)
            img.onclick = () => {showWorkshop(workshops.indexOf(each))}
            document.getElementById('all-workshops-view').prepend(img)
        })
    },[workshops])

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