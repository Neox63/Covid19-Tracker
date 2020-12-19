import './App.css';
import { React, useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import StatItem from './StatItem';
import Button from './Button';

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
        setInterval(() => { fetchData() }, 30000);
    }, []);

    return ( 
        <div className = "App">
            <h1>Global Covid19 Tracker</h1>
            {(typeof data.Global != "undefined") ? ( <p>Dernière mise à jour à { data.Date.substring(11, 16) }.</p> ) : ('Récupération des données en cours...')} 
            
            <div className = "itemContainer">
                <StatItem 
                    color = "#e1f3ff" 
                    title = "Nombre de cas" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalConfirmed.toLocaleString() ) : ('Récupération des données en cours...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( data.Global.NewConfirmed.toLocaleString() ) : ('Récupération des données en cours...')}  
                />

                <StatItem 
                    color = "#ffb5b6" 
                    title = "Nombre de décès" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalDeaths.toLocaleString() ) : ('Récupération des données en cours...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( data.Global.NewDeaths.toLocaleString() ) : ('Récupération des données en cours...')}  
                />

                <StatItem 
                    color="#b7ffe8" 
                    title="Guéris" 
                    statTotal = {(typeof data.Global != "undefined") ? ( data.Global.TotalRecovered.toLocaleString() ) : ('Récupération des données en cours...')} 
                    statNew = {(typeof data.Global != "undefined") ? ( data.Global.NewRecovered.toLocaleString() ) : ('Récupération des données en cours...')}  
                />
            </div>

            <Button action = {fetchData}  text = "Rafraîchir les données"/>
            <p>Actualisation automatique toute les 30 secondes.</p>
            <p>Données récupérées depuis <a href="https://api.covid19api.com/summary">Covid19API</a></p>
        </div>
    );
}

export default App;