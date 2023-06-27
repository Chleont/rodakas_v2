import React, {useEffect, useRef, useState} from "react"
import '../Styles/Map.scss'
import ImageMapper from 'react-img-mapper'
import json from './ex.json'

import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl'

/** Maps */
import satellite from '../Images/map/Basemap.jpg'
import symbols from '../Images/map/Map_symbols.png'
import simple from '../Images/map/Map_simple.png'
import satellite_symbols from '../Images/map/Basemap_symbols.jpg'

export default function Map(){

    var lang = useIntl()
    var locale = lang.locale
    const[langFile, setlangfile] = useState(langfileGreek.map)

    useEffect(()=>{
        if(locale === 'el')
        {
            setlangfile(langfileGreek.map)
        }else{
            setlangfile(langfileEnglish.map)
        }
    },[locale])
  
    const [areasMap,setAreasMap] = useState({name:'Margarites',areas:json})
    const [displayedMap, setDisplayedMap] = useState(simple)
    const [width, setWidth] = useState(null)
    // const [localCoords, setLocalCoords] = useState({x: 0, y: 0})
    // const [houses, setHouses] = useState([])
    const [overflow, setOverflow] = useState(0)
    const [checkboxValues, setCheckboxValues] = useState({
        option1: false,
        option2: false,
        option3: false,
    })
    // var realCoords = useRef([])

    useEffect(()=>{
        let container = document.getElementById('mapper-container')

        setWidth(container.offsetHeight * 1.5)
        // setWidth(container.offsetWidth)
        // setWidth('1636')
        // setWidth('3272')
        document.getElementById('mapper-container').style.width = width
    },[])

    useEffect(()=>{
        if(checkboxValues.option1){
            if(checkboxValues.option2){
                if(checkboxValues.option3){
                    // All
                }else{
                    // Families - usages
                }
            }else{
                if(checkboxValues.option3){
                    setDisplayedMap(satellite_symbols)
                }else{
                    setDisplayedMap(symbols)
                }
            }
        }else{
            if(checkboxValues.option2){
                if(checkboxValues.option3){
                    // Families - satellite
                }else{
                    // Families
                }
            }else{
                if(checkboxValues.option3){
                    setDisplayedMap(satellite)
                }else{
                    setDisplayedMap(simple)
                }
            }
        }
    },[checkboxValues])

    /* Coordinates input code */

    // const handleMouseMove = event => {
    //     setLocalCoords({
    //         x: event.clientX - document.getElementById('mapper-container').offsetLeft,
    //         y: event.clientY - document.getElementById('mapper-container').offsetTop,
    //     })
    // }
    
    // useEffect(() => {
    //     document.getElementById('mapper-container').addEventListener('mousemove', handleMouseMove)
    //     console.log(document.getElementById('mapper-container'))
    //     return () => {
    //         document.getElementById('mapper-container').removeEventListener(
    //             'mousemove',
    //             handleMouseMove,
    //         )
    //     }
    // }, [])

    // const passCoords = React.useCallback((e)=>{
    //     e.stopPropagation()
    //     e.preventDefault()
    //     realCoords.current.push(parseInt(document.getElementById('x').innerHTML.substring(1),10) + document.body.firstElementChild.firstElementChild.scrollLeft)
    //     realCoords.current.push(parseInt(document.getElementById('y').innerHTML.substring(0,document.getElementById('y').innerHTML.length),10) + document.body.firstElementChild.firstElementChild.scrollTop )
    //     console.log(realCoords.current)
    // })

    // function startRec(){
    //     setHouses([])
    //     document.getElementById('mapper-container').addEventListener('click',passCoords)
    // }

    // function handleEnter(e){
    //     if(e.key === 'Enter'){
    //         e.preventDefault()
    //         let houseis = houses

    //         houseis.push({
    //             id:e.target.value,
    //             name:e.target.value,
    //             shape: "poly",
    //             fillColor: "#eab54d4d",
    //             title:"",
    //             strokeColor: "transparent",
    //             coords:realCoords.current
    //         })
    //         setHouses(houseis)
    //         realCoords.current=[]
    //         console.log(houses,houseis)
    //     }
    // }

    // function completeRec(){
    //     document.getElementById('mapper-container').removeEventListener('click',passCoords)
    //     const element = document.createElement("a")
    //     const textFile = new Blob([JSON.stringify(houses)], {type: 'text/plain'})
 
    //     element.href = URL.createObjectURL(textFile)
    //     element.download = "userFile.txt"
    //     document.body.appendChild(element) 
    //     element.click()
    // }

    // function printMap(){
    //     console.log(map)
    // }

    function handleClick(area){
        console.log(area)
    }

    function handleMouseEnter(area){
        //Display some info about the house in box somewhere
    }

    function handleMouseLeave(area){
        //Stop Displaying info
    }

    function zoom(type){
        if(type == 'in'){
            setOverflow(prev =>{return prev+1})
            setWidth(prev=>{return prev+150})
        }else{
            setOverflow(prev =>{return prev-1})
            setWidth(prev=>{return prev-150})
        }
        if(overflow > 0 && document.getElementById('map-container').style.overflowY == 'hidden'){
            document.getElementById('map-container').style.overflowY = 'visible'
        }else if(document.getElementById('map-container').style.overflowY == 'visible'){
            document.getElementById('map-container').style.overflowY = 'hidden'
        }
    }

    // const [isOpen, setIsOpen] = useState(false)

    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target

        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }))
    }
    
    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen)
    // }
    

    return(
        <div id="map-page-container">

            {/* Polygon input component - click start, click on all edges of polygon, fill the name field and hit enter, continue with next polygon */}

            {/* <span id='x'>({localCoords.x}</span><span>,</span><span id='y'>{localCoords.y})</span>
            <button onClick={()=>{printMap()}}>print Map</button>
            <button onClick={()=>{startRec()}}>Start</button>
            <button onClick={()=>{completeRec()}}>Completed</button>
            <input id="houseInput"
              onKeyDown={(e)=>{handleEnter(e)}}
            /> */}
            <div id='map-container'>
                <div id='legend'> 
                    <span>{langFile.legend}</span>
                </div>
                <div id='mapper-container'>
                    <ImageMapper id='mapper'
                        src={displayedMap} 
                        map={areasMap} 
                        responsive
                        parentWidth={width}
                        onMouseEnter={area=>{handleMouseEnter(area)}}
                        onMouseLeave={area=>{handleMouseLeave(area)}}
                        onClick={area=>{handleClick(area)}}
                    />
                </div>
                <div id='right-box'>
                    <div id='infobox'>
                        Λόγια
                    </div>
                    <div id="controls">
                        {/* <div className="dropdown">
                        <button className="dropdown-toggle" onClick={toggleDropdown}>
                            {langFile.display}
                        </button>
                        {isOpen && ( */}
                        <div className="dropdown-menu">
                            <form>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option1"
                                        checked={checkboxValues.option1}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.buildings}
                                    </span>
                                </label>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option2"
                                        checked={checkboxValues.option2}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.families}
                                    </span>
                                </label>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option3"
                                        checked={checkboxValues.option3}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.basemap}
                                    </span>
                                </label>
                            </form>
                        </div>
                        {/* )}
                    </div> */}
                        <div id='buttons-container'>
                            <button onClick={()=>{zoom('in')}}></button>
                            <button onClick={()=>{zoom('out')}}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}