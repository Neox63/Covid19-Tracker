import React from 'react'

const Button = (props) => {
    return (
        <div>
            <button onClick={props.action} className="button">{props.text}</button>
        </div>
    )
}

export default Button;