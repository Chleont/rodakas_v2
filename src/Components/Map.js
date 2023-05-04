import React, {useEffect, useState} from "react";
import mapNoBack from '../Images/map/Map_no_back.png'
import '../Styles/Map.scss'
import ImageMapper from 'react-img-mapper';
import json from './ex.json'

export default function Map(){


    const map = {name:'aa',areas:json}
    const [width, setWidth] = useState(null)
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});
    const [houses, setHouses] = useState([])
    const [coords, setCoords] = useState([])
    const [newHouse, setNewHouse] = useState(true)


    useEffect(()=>{
        let container = document.getElementById('map-page-container')
        setWidth(container.offsetHeight * 1.51)
        setWidth(container.offsetHeight * 3)
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


    function passCoords(){
      if(!newHouse){
        let coordis = coords
        coordis.push(parseInt(document.getElementById('x').innerHTML.substring(1),10))
        coordis.push(parseInt(document.getElementById('y').innerHTML.substring(0,document.getElementById('y').innerHTML.length - 1),10))
        setCoords(coordis)
      }else{
        console.log('inNewHouse')
        let coordis = []      
        coordis.push(parseInt(document.getElementById('x').innerHTML.substring(1),10))
        coordis.push(parseInt(document.getElementById('y').innerHTML.substring(0,document.getElementById('y').innerHTML.length - 1),10))
        setCoords(coordis)
        setNewHouse(false)
      }
    }

    function startRec(){
      setHouses([])
      setCoords([])
      document.getElementById('mapper-container').addEventListener('click',passCoords);
    }

    function handleEnter(e){
      if(e.key === 'Enter'){
        e.preventDefault();
        let houseis = houses
        let ccoo = coords
        houseis.push({
          id:e.target.value,
          name:e.target.value,
          coords:[...ccoo]
        })
        setHouses(houseis)
        setNewHouse(true)
        console.log(houses,houseis)
      }
    }

    function completeRec(){
      const element = document.createElement("a");
      const textFile = new Blob([JSON.stringify(houses)], {type: 'text/plain'}); 
      element.href = URL.createObjectURL(textFile);
      element.download = "userFile.txt";
      document.body.appendChild(element); 
      element.click();
    }

    return(
        <div id="map-page-container">
            <span id='x'>({localCoords.x}</span><span>,</span><span id='y'>{localCoords.y})</span>
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
                />
            </div>
        </div>
    )
}