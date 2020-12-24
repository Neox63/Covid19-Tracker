import './App.css';
import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import StatItem from '../StatItem/StatItem.jsx';
import Button from '../Button/Button.jsx';

const App = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const result = await Axios(
            'https://api.covid19api.com/summary'
        );

        setData(result.data);
    };

    useEffect(() => {
        fetchData();
        setInterval(() => fetchData(), 30000);
    }, []);

    return ( 
        <div className = "App">
            <h1>Global Covid19 Tracker</h1>

            {(typeof data.Global != "undefined" && Object.keys( data.Message ).length > 0) ? (<p className = "text-info">État de l'API : {data.Message}.</p>) : (<p className = "text-info">État de l'API : Fonctionnelle.</p>)}
            {(typeof data.Global != "undefined") ? ( <p className = "text-info">Dernière mise à jour à { data.Date.substring(11, 16) }.</p> ) : ( <p className = "text-info">Loading...</p>)} 
            
            <div className = "itemContainer">
                <StatItem 
                    color = "#4EACEA" 
                    title = "Nombre de cas" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalConfirmed.toLocaleString() ) : ('Loading...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( "+" + data.Global.NewConfirmed.toLocaleString() + " en 24h." ) : ('Loading...')}  
                />

                <StatItem 
                    color = "#D44042" 
                    title = "Nombre de décès" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalDeaths.toLocaleString() ) : ('Loading...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( "+" + data.Global.NewDeaths.toLocaleString() + " en 24h." ) : ('Loading...')}  
                />

                <StatItem 
                    color="#29FF4D" 
                    title="Nombre de guéris" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalRecovered.toLocaleString() ) : ('Loading...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( "+" + data.Global.NewRecovered.toLocaleString() + " en 24h." ) : ('Loading...')}  
                />
            </div>

            <Button action = { fetchData } text = "Rafraîchir les données" />
            
            <p>Actualisation toute les 30 secondes.</p>

            <div className = "github-icons">
                <div className = "icon">
                    <a 
                        className="github-button" 
                        href="https://github.com/Neox63/Covid19-Tracker" 
                        data-icon="octicon-star" 
                        data-size="large" 
                        data-show-count="true" 
                        aria-label="Star Neox63/Covid19-Tracker on GitHub">
                        Give it a Star
                    </a>    
                </div>

                <div className = "icon">
                    <a 
                        className="github-button" 
                        href="https://github.com/Neox63" 
                        data-size="large" 
                        data-show-count="true" 
                        aria-label="Follow @Neox63 on GitHub">
                        Follow me on GitHub
                    </a>
                </div>
            </div>
            
        </div>
    );
}

export default App;