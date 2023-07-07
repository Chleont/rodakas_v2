import React, {useEffect, useRef, useState} from "react"
import '../Styles/Map.scss'
import ImageMapper from 'react-img-mapper'
import json from './MapData/mapdata.json'

import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl'

/** Map data */
import json_hover from './MapData/mapdata.json'
import json_families from './MapData/mapdata_families.json'

/** Maps */
import satellite from '../Images/map/Basemap_simple.jpg'
import symbols from '../Images/map/Map_symbols.png'
import simple from '../Images/map/Map_simple.png'
import satellite_symbols from '../Images/map/Basemap_symbols.jpg'
import islands from '../Images/map/Map_islands.png'
import islands_symbols from '../Images/map/Map_islands_symbols.png'

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
  
    const [areasMap,setAreasMap] = useState({name:'Margarites',areas:json_hover})
    const [displayedMap, setDisplayedMap] = useState(simple)
    const [width, setWidth] = useState(null)
    const [overflow, setOverflow] = useState(0)
    const [checkboxValues, setCheckboxValues] = useState({
        option1: false,
        option2: false,
        option3: false,
    })

    useEffect(()=>{
        let container = document.getElementById('mapper-container')

        // setWidth(container.offsetHeight * 1.5)
        setWidth(container.offsetWidth - 10)
        // setWidth('1636')
        // setWidth('3272')
        document.getElementById('mapper-container').style.width = width
    },[])

    useEffect(()=>{

        if(checkboxValues.option1){
            if(checkboxValues.option2){
                setDisplayedMap(islands_symbols)
            }
            if(checkboxValues.option3){
                setDisplayedMap(satellite_symbols)
            }else{
                setDisplayedMap(symbols)
            }
        }else{
            if(checkboxValues.option3){
                setDisplayedMap(satellite)
            }else if(checkboxValues.option2){
                setDisplayedMap(islands)
            }else{
                setDisplayedMap(simple)
            }
        }

    },[checkboxValues])

    // useEffect(()=>{
    //     if(checkboxValues.option2){
    //         setAreasMap({name:'Margarites',areas:json_families})
    //     }else if(!checkboxValues.option2){
    //         setAreasMap({name:'Margarites',areas:json_hover})
    //     }
    // },[checkboxValues])

    /* Coordinates input code */

    // const [localCoords, setLocalCoords] = useState({x: 0, y: 0})
    // const [houses, setHouses] = useState([])

    // var realCoords = useRef([])

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

    /** Map */

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

    /** Controls */
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target

        if(name == 'option2' && checked && checkboxValues.option3){
            setCheckboxValues({
                option1:checkboxValues.option1,
                option2: checked,
                option3: false
            })
        }else if(name == 'option3' && checked && checkboxValues.option2){
            setCheckboxValues({
                option1:checkboxValues.option1,
                option2: false,
                option3: checked
            })
        }else{
            setCheckboxValues((prevState) => ({
                ...prevState,
                [name]: checked,
            }))
        }
    }

    /** Legend */

    function hideLegend(){
        document.getElementById('legend').style.display = 'none'
        document.getElementById('toggle-legend').style.display = 'flex'
    }

    function showLegend(){
        document.getElementById('legend').style.display = 'flex'
        document.getElementById('toggle-legend').style.display = 'none'       
    }

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
                <div id='mapper-container'>
                    <ImageMapper
                        src={displayedMap} 
                        map={checkboxValues.option2?{name:'Margarites',areas:json_families}:{name:'Margarites',areas:json_hover}} 
                        responsive
                        parentWidth={width}
                        onMouseEnter={area=>{handleMouseEnter(area)}}
                        onMouseLeave={area=>{handleMouseLeave(area)}}
                        onClick={area=>{handleClick(area)}}
                    />
                </div>
                <div id='right-box'>
                    <div id='infobox-scroll-container'>
                        <div id='infobox'>
                        Δημιουργήθηκε το 2017 από μια ομάδα κατοίκων του χωριού Μαργαρίτες Ρεθύμνου. Στόχος ήταν η καταγραφή Ιστορικών ζωής των πιο μεγάλων σε ηλικία κατοίκων της Κοινότητας.Κίνητρο για τη δημιουργία αυτού του αρχείου, ήταν η συνειδητοποίηση ότι με το τέλος της γενιάς των ανθρώπων που το 2017 είναι από 80 ετών και επάνω, χάνεται η ζωντανή μνήμη ιστορικών γεγονότων που ξεκινούν από το Β’ Παγκόσμιο Πόλεμο, την Κατοχή, τον εμφύλιο και προχωρουν ως τις μέρες μας. Χάνεται επίσης η ζωντανή μνήμη κοινωνικών γεγονότων και σχέσεων κατά τη διάρκεια μιας περιόδου που οι Μαργαρίτες και οι γύρω κοινότητες ήταν πολυπληθέστερες, ο βιοπορισμός βασιζόταν στη γεωργική παραγωγή και την αγγειοπλαστική και οι συναλλαγές γινόταν ως επι το πλείστον με ανταλλαγή προϊόντων. Επιλέον με τη γενιά αυτή τελειώνει και η ζωντανή μνήμη επαγγελματων, και πρακτικών καθημερινής ζωής όπως και η μνήμη της μορφής του οικισμού, πριν τα μέσα του 20ου αιώνα.Ισχυρό κίνητρο επίσης ήταν η ανάγκη αποτύπωσης του λόγου των ανθρώπων, που αφηγούνται. Λόγου ανεπηρρέαστου συνήθως από την εγκύκλια παιδεία και που όσο αφορά το περιεχόμενο, το λεκτικό και την προσωδία του, απηχεί την εποχή της Προφορικότητας, εποχή που η γνώση, η πληροφορία, η δράση, το συναίσθημα αλλά και κάθε είδους σχέση αναδύονταν και αποτυπώνονταν μέσα από την ζωντανη και συνεχή προφορική αφήγηση στην Κοινότητα.
                        </div>
                    </div>
                    <div id="controls">
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
                        <div id='buttons-container'>
                            <button onClick={()=>{zoom('in')}}></button>
                            <button onClick={()=>{zoom('out')}}></button>
                        </div>
                    </div>
                </div>
                <div id='legend'>
                    <div id='hide-legend' onClick={()=>{hideLegend()}}>
                        <span/>
                    </div>
                    <div id='legend-contents'>
                        {langFile.legend} 
                    </div>
                </div>
                <div id='toggle-legend' onClick={()=>{showLegend()}}> 
                    <span>
                        <span>
                            {langFile.legend}&nbsp;&nbsp;
                        </span>
                        <span className="rot180"></span>   
                    </span>
                </div>
            </div>
        </div>
    )
}