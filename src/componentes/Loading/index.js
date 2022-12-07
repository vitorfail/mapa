import React from "react";
import Covid from '../../icons/load.png'
import './index.css'
export default function Loading(){
    return(
        <div className="loading">
            <div className="ciculo">
                <img src={Covid}></img>
            </div>
        </div>
    )
}