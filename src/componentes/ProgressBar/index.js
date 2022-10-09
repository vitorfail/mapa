import React, {useEffect, useState} from "react";
import './index.css'
export default function ProgressBar(props){
    const [click , setclick] =useState(false)
    const [cord, setcord] = useState({x:0, y:0 })
  
    function mouseClick(e){
        setclick(e)
    }
    function moverMouse(e){
        var direita = document.querySelector('.progressbar').getBoundingClientRect()
        if(click === true){
            if(e.clientX >= direita.width-15){

            }
            else{
                props.zoom(10)
                setcord({
                    x: e.clientX,
                    y: e.clienty
                })        
            }
        }
    }
    function moverTouch(e){
        var direita = document.querySelector('.progressbar').getBoundingClientRect()
        if(click === true){
            if(e.changedTouches[0].clientX >= direita.width-15 || e.changedTouches[0].clientX <0){
            }
            else{
                setcord({
                    x: e.changedTouches[0].clientX,
                    y: e.changedTouches[0].clientY
                })
                console.log(direita.width)
                console.log(e.changedTouches[0].clientX)
            }
        }
    }
    return(
        <div className='progressbar'  onMouseMove={(event) => moverMouse(event)}
        onTouchMove={(event) => moverTouch(event)} >
            <div className='display' style={{left:cord.x}}
            onDragLeave={() => mouseClick(false)}
            onTouchStart={() => mouseClick(true)}
            onTouchEnd={() => mouseClick(false)}
            onMouseDown={() => mouseClick(true)}
            onMouseUp={() => mouseClick(false)}
           ></div>
        </div>
    )
}