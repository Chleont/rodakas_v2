import React, {useEffect, useState} from "react";
import './FrogTroll.scss'
import trollBody from './fb.png'
import trollJumping from './fj.png'
import trollMouthClosed from './fmc.png'
import trollMouthOpen from './fmo.png'

export default function FrogTroll({options}){

    var propOption = {
        units: options.units? options.units : 'em',
        size: options.size? options.size: 10,
        startingPosition:{
            x: options.startingPosition.x? options.startingPosition.x : 0,
            y: options.startingPosition.y? options.startingPosition.y : 0
        }
    }

    var canvas = null,
        width =  Math.max(window.screen.width, window.innerWidth),
        height =  Math.max(window.screen.height, window.innerHeight),
        units = propOption.units,
        x = null,
        y = null,
        ctx = null,
        pointer = null, 
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
        hitInterval= null,
        mouthCenter = [],
        trollWidth = null,
        offsety = null,
        offsetx = null,
        fontSize = null

    if(width < 1024){
        fontSize = 16
    }else if(width >= 1024 && width < 1280){
        fontSize = 19
    }else if(width >=1280){
        fontSize = 20
    }
        
    var trollSize = units === 'em'? propOption.size * fontSize : propOption.size,
        frogx = units === 'em'? propOption.startingPosition.x * fontSize : propOption.startingPosition.x,
        frogy = units === 'em'? propOption.startingPosition.y * fontSize : propOption.startingPosition.y,
        navbarHeight = 4.8 * fontSize

    if(Math.abs(frogx) > (width - trollSize) /2){
        frogx = Math.sign(frogx) * (width - trollSize) / 2
    }

    if(Math.abs(frogy) > (height - trollSize) /2 - navbarHeight){
        frogy = Math.sign(frogy) * (height - 1.28 * trollSize - 2 * navbarHeight) / 2
    }

    console.log(frogx,frogy,width,height,trollSize)

    function start(){
        clearInterval(interval)
        interval = setInterval(function(){
            document.getElementById('frog-troll-head').src = trollMouthOpen
            clearInterval(hitInterval)
            hitInterval = setInterval(function(){
                killPointer()
            },2000)
        }, 3000);
    }

    function killPointer(){
        canvas = document.getElementById('canvas')
        canvas.width = document.getElementById('frog-troll-container').clientWidth;
        canvas.height = document.getElementById('frog-troll-container').clientHeight
        ctx = canvas.getContext("2d");
        x = document.getElementById('dot').getBoundingClientRect().x + document.getElementById('dot').getBoundingClientRect().width/2
        y = document.getElementById('dot').getBoundingClientRect().y + document.getElementById('dot').getBoundingClientRect().height/2
        ctx.beginPath();
        offsety = navbarHeight +  (200 - trollWidth) * (Math.cos(radians) * 0.1 - 0.2) - frogy
        // offsety = 0
        offsetx = Math.sin(radians) * (200 - trollWidth) * 0.08 - frogx
        // offsetx = 0
        ctx.moveTo(x - offsetx,y - offsety);
        ctx.lineWidth = propOption.size + 2;
        ctx.strokeStyle = "#ff7887";
        ctx.lineTo(mouseX, mouseY - navbarHeight);
        ctx.stroke();
        setTimeout(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },100)
        document.getElementById('frog-troll-container').style.cursor = 'none'
        document.getElementById('frog-troll-container').removeEventListener('mousemove', listener)
        document.getElementById('frog-troll-container').removeEventListener('mouseleave', stopHunting)
        setTimeout(function(){
            document.getElementById('frog-troll-head').src = trollMouthClosed
        },300)
        clearInterval(interval)
        clearInterval(hitInterval)
        setTimeout(
            function(){
                rotateBack()
            },300
        )
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
        mouthCenter = [Math.sin(radians) * fontSize, (Math.cos(radians) - 2) * fontSize]
        document.getElementById('dot').style.transform = 'translate(' + mouthCenter[0] + 'px, ' + mouthCenter[1]+ 'px)'
    }

    function rotateBack(e) {
        pointer = document.getElementById("frog-troll-head")
        pointer.style.transitionDuration = '0.4s'
        pointer.style.transform = 'rotate('+0+'deg)';
        setTimeout(
            function(){
                pointer.style.transitionDuration = '0s'
            },400
        )
    }

    function listener(e){
        document.getElementById('frog-troll-head').src = trollMouthClosed
        clearInterval(hitInterval)
        rotatePointer(e)
        start()
    }


    function stopHunting(e){
        document.getElementById('frog-troll-head').src = trollMouthClosed
        clearInterval(interval)
        clearInterval(hitInterval)
        rotateBack(e)
    }


    useEffect(()=>{
        document.getElementById('frog-troll-container').addEventListener('mousemove', listener );
        trollWidth = document.getElementById('frog-troll').offsetWidth
    },[listener])

    useEffect(()=>{
        document.documentElement.style.setProperty('--frog-width',`${trollSize}px`)
        document.getElementById('frog-troll').style.transform = `translate(${frogx}px,${frogy}px)` 
        return () => {
            clearInterval(interval)
            clearInterval(hitInterval)
        }
    },[])


    return(
        <div id='frog-troll-container' onMouseLeave={stopHunting}>
            <canvas id='canvas'/>
            <div id='dot'/>
            <div id='frog-troll'>
                <img alt='head' id='frog-troll-head' src={trollMouthClosed}/>
                <img alt='body' id='frog-troll-body' src={trollBody}/>
            </div>
        </div>
    )
}