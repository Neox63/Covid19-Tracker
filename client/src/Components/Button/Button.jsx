import './Button.css';

const Button = ({action, text}) => {
    return (
        <div>
            <button onClick = { action } className="button"> { text } </button>
        </div>
    )
}

export default Button;