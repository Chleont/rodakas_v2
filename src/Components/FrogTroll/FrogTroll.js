import React, {useEffect} from "react";
import './FrogTroll.scss'
import trollBody from './fb.png'
import trollJumping from './fj.png'
import trollMouthClosed from './fmc.png'
import trollMouthOpen from './fmo.png'

export default function FrogTroll(){

    // const [headType,setHead] = React.useState('closed')

    var canvas = null,
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
        fontSize = null,
        mouthCenter = []     



        var width =  Math.max(window.screen.width, window.innerWidth)
        if(width < 1024){
            fontSize = 16
        }else if(width >= 1024 && width < 1280){
            fontSize = 19
        }else if(width >=1280){
            fontSize = 20
        }
        var navbarHeight = 4.8 * fontSize


    function start(){
        clearInterval(interval)
        interval = setInterval(function(){
            document.getElementById('frog-troll-head').src = trollMouthOpen
            // setHead('open')
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
        ctx.moveTo(x,y - navbarHeight);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#ff7887";
        ctx.lineTo(mouseX, mouseY - navbarHeight);
        ctx.stroke();
        setTimeout(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },100)
        document.getElementById('frog-troll-container').style.cursor = 'none'
        document.getElementById('frog-troll-container').removeEventListener('mousemove', listener)
        setTimeout(function(){
            document.getElementById('frog-troll-head').src = trollMouthClosed
            // setHead('closed')
        },300)
        clearInterval(interval)
        clearInterval(hitInterval)
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

    

    function listener(e){
        document.getElementById('frog-troll-head').src = trollMouthClosed
        // setHead('closed')
        rotatePointer(e)
        start()
    }

    useEffect(()=>{
        console.log('a')
        document.getElementById('frog-troll-container').addEventListener('mousemove', listener );
    },[listener])

    useEffect(()=>{
        return () => {
            clearInterval(interval)
            clearInterval(hitInterval)
        }
    },[])


    return(
        <div id='frog-troll-container'>
            <canvas id='canvas'/>
            <div id='dot'/>
            <div id='frog-troll'>
                <img alt='head' id='frog-troll-head' src={trollMouthClosed}/>
                <img alt='body' id='frog-troll-body' src={trollBody}/>
            </div>
        </div>
    )
}