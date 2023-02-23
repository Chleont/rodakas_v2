import React, {useEffect} from "react";
import './FrogTroll.scss'
import trollBody from './fb.png'
import trollJumping from './fj.png'
import trollMouthClosed from './fmc.png'
import trollMouthOpen from './fmo.png'

export default function FrogTroll(){

    const [headType,setHead] = React.useState('closed')

    var pointer = null, 
        mouseX = null,
        mouseY = null,
        pointerBox = null,
        centerPoint = null,
        centers = null,
        centerX = null,
        centerY = null,
        radians = null,
        degrees = null,
        interval = null,
        mouthCenter = []


    // Function to start setInterval call
    function start(){
        interval = setInterval(function(){
            document.getElementById('frog-troll-head').src = trollMouthOpen
            setHead('open')
        }, 3000);
    }

    function rotatePointer(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        pointer = document.getElementById("frog-troll-head")
        pointerBox = pointer.getBoundingClientRect()
        centerPoint = window.getComputedStyle(pointer).transformOrigin
        centers = centerPoint.split(" ")
        centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset
        centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset
        radians = Math.atan2(mouseX - centerX, mouseY - centerY)
        degrees = (radians * (180 / Math.PI) * -1); 
        pointer.style.transform = 'rotate('+degrees+'deg)';
        mouthCenter = [pointerBox.x + pointerBox.width/2, pointerBox.y + pointerBox.height/2]
        document.getElementById('dot').style.transform = 'translate(' + Math.sin(radians) + 'em, ' + (1 * Math.cos(radians) - 2)+ 'em)'
        console.log(Math.sin(radians), Math.cos(radians))
    }

    useEffect((e)=>{
        window.addEventListener('mousemove', function(e){
            document.getElementById('frog-troll-head').src = trollMouthOpen
            // document.getElementById('frog-troll-head').src = trollMouthClosed
            setHead('closed')
            rotatePointer(e)
            clearInterval(interval)
            start()
        });
    },[headType])




    return(
        <div id='frog-troll-container'>
            <div id='dot'/>
            <div id='frog-troll'>
                <img alt='head' id='frog-troll-head' src={trollMouthOpen}/>
                {/* <img alt='head' id='frog-troll-head' src={trollMouthClosed}/> */}
                <img alt='body' id='frog-troll-body' src={trollBody}/>
            </div>
        </div>
    )
}