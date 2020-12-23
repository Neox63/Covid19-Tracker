import './StatItem.css';

const StatItem = ({color, title, statTotal, statNew}) => {
    return (
        <div className="item" style={{backgroundColor: color}}>
            <h3>{title}</h3>
            <h2>{statTotal}</h2>
            <p>{statNew}</p>
        </div>
    )
}

export default StatItem;