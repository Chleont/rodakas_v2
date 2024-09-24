import React, {useEffect, useState} from "react"
import langfileGreek from '../Lang/el.json'
import { useIntl} from 'react-intl'
import langfileEnglish from '../Lang/en.json'
import '../Styles/Feast23.scss'

export default function Feast23Page(){

    var lang = useIntl()
    var locale = lang.locale
    const[speech, setSpeech] = useState([])
    

    function changeLang(){
        let arr = []
        let speechObject = null

        if(locale === 'el')
        {
            speechObject = langfileGreek.speech
        }else{
            speechObject = langfileEnglish.speech
        }
        Object.values(speechObject).forEach(value => arr.push({value: value}))
        setSpeech(arr)
    }

    useEffect(()=>{
        changeLang()
    },[])
    
    useEffect(()=>{
        changeLang()
    },[locale])



    return(
        <div id='feast23-container'>
            <iframe allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen" 
                msallowfullscreen="msallowfullscreen" 
                oallowfullscreen="oallowfullscreen" 
                webkitallowfullscreen="webkitallowfullscreen" id="feast23-video" src="https://www.youtube.com/embed/CZkJqF2TJpA"></iframe>
            {speech.length > 0?
                speech.map(each=>{
                    return(
                        <span className="feast-text-container" key={speech.indexOf(each)}>{each.value}</span>
                    )
                }):
                <></>
            }
        </div>
    )
}
