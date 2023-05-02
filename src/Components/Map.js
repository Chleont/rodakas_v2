import React, {useEffect, useState} from "react";
import mapNoBack from '../Images/map/Map_no_back.png'
import '../Styles/Map.scss'
import ImageMapper from 'react-img-mapper';
import json from './ex.json'

export default function Map(){


    const map = {name:'aa',areas:json}
    const [width, setWidth] = useState(null)
    const [localCoords, setLocalCoords] = useState({x: 0, y: 0});
    

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


    return(
        <div id="map-page-container">
            <span>({localCoords.x}, {localCoords.y})</span>
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