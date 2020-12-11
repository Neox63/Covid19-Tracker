import './StatItem.css';
import React from 'react'

const StatItem = (props) => {
    return (
        <div className="item" style={{backgroundColor: props.color}}>
            <h3>{props.title}</h3>
            <h2>{props.statTotal}</h2>
            <p>+{props.statNew} en 24 heures</p>
        </div>
    )
}

export default StatItem;