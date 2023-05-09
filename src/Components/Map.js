import React, {useEffect, useRef, useState} from "react";
import mapNoBack from '../Images/map/Map_no_back.png'
import '../Styles/Map.scss'
import ImageMapper from 'react-img-mapper';
import json from './ex.json'

export default function Map(){


    const map = {name:'Margarites',areas:json}
    const [width, setWidth] = useState(null)
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});
    const [houses, setHouses] = useState([])
    var realCoords = useRef([])

    useEffect(()=>{
        // let container = document.getElementById('map-page-container')
        // setWidth(container.offsetHeight * 1.51)
        // setWidth('1636')
        setWidth('3272')
        document.getElementById('mapper-container').style.width = width
    })

    const handleMouseMove = event => {
        setLocalCoords({
          x: event.clientX - document.getElementById('mapper-container').offsetLeft,
          y: event.clientY - document.getElementById('mapper-container').offsetTop,
        });
      };
    
    useEffect(() => {
      document.getElementById('mapper-container').addEventListener('mousemove', handleMouseMove);
      console.log(document.getElementById('mapper-container'))
      return () => {
          document.getElementById('mapper-container').removeEventListener(
          'mousemove',
          handleMouseMove,
        );
      };
    }, []);


    const passCoords = React.useCallback((e)=>{
        e.stopPropagation();
        e.preventDefault();
        realCoords.current.push(parseInt(document.getElementById('x').innerHTML.substring(1),10) + document.body.firstElementChild.firstElementChild.scrollLeft)
        realCoords.current.push(parseInt(document.getElementById('y').innerHTML.substring(0,document.getElementById('y').innerHTML.length),10)  + document.body.firstElementChild.firstElementChild.scrollTop )
        console.log(realCoords.current)
    })

    function startRec(){
      setHouses([])
      document.getElementById('mapper-container').addEventListener('click',passCoords);
    }

    function handleEnter(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        let houseis = houses
        houseis.push({
          id:e.target.value,
          name:e.target.value,
          shape: "poly",
          fillColor: "#eab54d4d",
          title:"",
          strokeColor: "transparent",
          coords:realCoords.current
        })
        setHouses(houseis)
        realCoords.current=[]
        console.log(houses,houseis)
      }
    }

    function completeRec(){
      document.getElementById('mapper-container').removeEventListener('click',passCoords)
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(houses)], {type: 'text/plain'}); 
      element.href = URL.createObjectURL(textFile);
      element.download = "userFile.txt";
      document.body.appendChild(element); 
      element.click();
    }

    function printMap(){
      console.log(map)
    }

    function handleClick(area){
      console.log(area)
    }

    function handleMouseEnter(area){
      //Display some info about the house in box somewhere
    }

    function handleMouseLeave(area){
      //Stop Displaying info
    }

    return(
        <div id="map-page-container">
            <span id='x'>({localCoords.x}</span><span>,</span><span id='y'>{localCoords.y})</span>
            <button onClick={()=>{printMap()}}>print Map</button>
            <button onClick={()=>{startRec()}}>Start</button>
            <button onClick={()=>{completeRec()}}>Completed</button>
            <input id="houseInput"
              onKeyDown={(e)=>{handleEnter(e)}}
            />

            <div id='mapper-container'>
                <ImageMapper id='mapper'
                    src={mapNoBack} 
                    map={map} 
                    responsive
                    parentWidth={width}
                    onMouseEnter={area=>{handleMouseEnter(area)}}
                    onMouseLeave={area=>{handleMouseLeave(area)}}
                    onClick={area=>{handleClick(area)}}
                />
            </div>
        </div>
    )
}