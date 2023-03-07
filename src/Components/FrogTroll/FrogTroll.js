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
        },
        timeToOpenMouth: options.timeToOpenMouth? options.timeToOpenMouth : 2000,
        timeToAttack: options.timeToAttack? options.timeToAttack : 1000
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


    function start(){
        clearInterval(interval)
        interval = setInterval(function(){
            document.getElementById('frog-troll-head').src = trollMouthOpen
            clearInterval(hitInterval)
            hitInterval = setInterval(function(){
                killPointer()
            },propOption.timeToAttack)
        }, propOption.timeToOpenMouth);
    }

    function killPointer(){
        canvas = document.getElementById('canvas')
        // canvas.width = document.getElementById('frog-troll-container').clientWidth
        // canvas.height = document.getElementById('frog-troll-container').clientHeight
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight
        ctx = canvas.getContext("2d");

        // Calculate center of frog's mouth coordinates
        x = document.getElementById('dot').getBoundingClientRect().x + document.getElementById('dot').getBoundingClientRect().width/2
        y = document.getElementById('dot').getBoundingClientRect().y + document.getElementById('dot').getBoundingClientRect().height/2
        
        // Add offset depending on frog's position and on frog's head rotation
        offsety = navbarHeight +  (200 - trollWidth) * (Math.cos(radians) * 0.1 - 0.2) - frogy
        offsetx = Math.sin(radians) * (200 - trollWidth) * 0.08 - frogx
        
        // Draw tongue
        ctx.beginPath();
        // ctx.moveTo(x - offsetx,y - offsety);
        ctx.moveTo(x - offsetx,y + offsety);
        ctx.lineWidth = propOption.size + 2;
        ctx.strokeStyle = "#ff7887";
        ctx.lineTo(mouseX, mouseY - navbarHeight);
        ctx.stroke();
        setTimeout(function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },100)

        // Tongue's hit aftermath
        // document.getElementById('frog-troll-container').style.cursor = 'none'
        // document.getElementById('frog-troll-container').removeEventListener('mousemove', listener)
        // document.getElementById('frog-troll-container').removeEventListener('mouseleave', stopHunting)
        document.body.style.cursor = 'none'
        document.body.removeEventListener('mousemove', listener)
        document.body.removeEventListener('mouseleave', stopHunting)
        setTimeout(
            function(){
                document.getElementById('frog-troll-head').src = trollMouthClosed
            },300
        )
        clearInterval(interval)
        clearInterval(hitInterval)
        setTimeout(
            function(){
                rotateBack()
            },300
        )
    }

    function generatePosition(){
        let randX = Math.random() * (width - trollSize) - (width - trollSize) / 2
        let randY = Math.random() * ((height - trollSize) - 2 * navbarHeight) - ((height - trollSize) - 2 * navbarHeight) / 2
        let transitionTime = Math.round(Math.max(Math.abs(frogx - randX),Math.abs(frogy - randY)) / 100) / 10 + 0.1
        if (randX === frogx){
            randX = randX + 10 
        }
        if (randY === frogy){
            randY = randY + 10 
        }
        return {
            x:randX,
            y:randY,
            t: transitionTime      
        }
    }

    function jump(){
        rotateBack(0.1)
        let newPositionData = generatePosition() 
        
        setTimeout(
            function(){
                clearInterval(interval)
                clearInterval(hitInterval)
            },(propOption.timeToAttack * 0.8)
        )

        document.getElementById('frog-troll-body').src = trollJumping
        document.getElementById('frog-troll-head').style.visibility = 'hidden'
        
        let dx = (newPositionData.x - frogx),
        dy = (newPositionData.y - frogy),
        halfDist = Math.sqrt((newPositionData.x - frogx)**2 + (newPositionData.y - frogy)**2)/2,
        φ = -Math.atan(dy/dx),
        ω = Math.PI/2 - φ,
        centery = null,
        r = null,         
        centerx = null,
        instances = newPositionData.t * 20,
        xinterval = dx / instances,
        θinterval= Math.abs(2 * φ / instances),
        θ = null,
        points = []
        

        //Calculate jumpin circular curve's center and radious

        if(newPositionData.y <= frogy && Math.abs(φ) < Math.PI/4){
            console.log('1')
            centerx = newPositionData.x
            r = Math.abs(halfDist/Math.cos(ω))
            centery = newPositionData.y + r 
        }else if(newPositionData.y <= frogy && Math.abs(φ) >= Math.PI/4){
            console.log('2')
            centery = frogy
            r = Math.abs(halfDist/Math.cos(φ))
            centerx = frogx + Math.sign(Math.sin(φ)) * r
        }else if(newPositionData.y >= frogy && Math.abs(φ) < Math.PI/4){
            console.log('3')
            r = Math.abs(halfDist/Math.cos(ω))
            centerx = frogx
            centery = frogy + r
        }else if(newPositionData.y >= frogy && Math.abs(φ) >= Math.PI/4){
            console.log('3')
            r = Math.abs(halfDist/Math.cos(ω))
            centery = newPositionData.y
            centerx = newPositionData.x + Math.sign(Math.sin(φ)) * r
        }



        for(let i = 0; i <= instances; i++){

            // Calculate frog body rotation
            if(dx > 0){
                θ = Math.abs(φ) >= Math.PI/4 ? (Math.abs(Math.PI/2 - φ) - i * θinterval) * 180/Math.PI : (Math.abs(φ) - i * θinterval) * 180/Math.PI
            }else{
                θ = Math.abs(φ) >= Math.PI/4 ? (Math.PI - Math.abs(Math.PI/2) + i * θinterval) * 180/Math.PI : (Math.PI - Math.abs(φ) + i * θinterval) * 180/Math.PI
            }

            points.push({

                // Calculate coordinates of points
                x:frogx + i * xinterval,
                y: -1 * (Math.sqrt(Math.pow(r,2) - Math.pow((frogx + i * xinterval - centerx),2)) - Math.abs(centery)),
                bodyAngle: θ,

                // Move frog to next point and recall function for next position
                func: function(){
                    document.getElementById('frog-troll').style.transform = `translate(${this.x}px,${this.y}px)`
                    if(points.indexOf(this) < points.length - 1){
                        setTimeout(
                            ()=>{
                                points[points.indexOf(this)+1].func()
                            },15
                        )
                    }else{
                        // document.getElementById('frog-troll-container').addEventListener('mousemove', listener )
                        document.body.addEventListener('mousemove', listener )
                        setTimeout(()=>{
                            document.getElementById('frog-troll-body').src = trollBody
                            document.getElementById('frog-troll-head').style.visibility = 'visible'
                        },newPositionData.t*100)
                    }
                }
            })
        }
        console.log(points, φ *180/Math.PI)
        // Call jump
        points[0].func()

        // Set new position
        frogx = newPositionData.x
        frogy = newPositionData.y 
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
        if(Math.abs(mouseX - centerX) < (0.8 * trollSize) && Math.abs(mouseY - centerY) < (0.8 * trollSize)){
            // document.getElementById('frog-troll-container').removeEventListener('mousemove', listener)
            document.body.removeEventListener('mousemove', listener)
            jump()
        }else{
            radians = Math.atan2(mouseX - centerX, mouseY - centerY)
            degrees = (radians * (180 / Math.PI) * -1);
            
            // Turn head
            pointer.style.transform = 'rotate('+degrees+'deg)';
            
            //Set position of mouth
            mouthCenter = [Math.sin(radians) * fontSize, (Math.cos(radians) - 2) * fontSize]
            document.getElementById('dot').style.transform = 'translate(' + mouthCenter[0] + 'px, ' + mouthCenter[1]+ 'px)'
        }
    }

    function rotateBack(time) {
        var seconds = isNaN(time)?0.4:time
        pointer = document.getElementById("frog-troll-head")
        pointer.style.transitionDuration = `${seconds}s`
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

    function stopHunting(){
        document.getElementById('frog-troll-head').src = trollMouthClosed
        clearInterval(interval)
        clearInterval(hitInterval)
        rotateBack()
    }

    useEffect(()=>{
        // document.getElementById('frog-troll-container').addEventListener('mousemove', listener );
        document.body.addEventListener('mousemove', listener );
        document.body.addEventListener('mouseleave', stopHunting );
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