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

    console.log(data);

    return ( 
        <div className = "App">
            {(typeof data.Global != "undefined") ? (
                <Fragment>
                    <h1>Global Covid19 Tracker</h1>
                    <p>Dernière mise à jour à { data.Date.substring(11, 16) }.</p>
                    {(Object.keys( data.Message ).length > 0) ? (<p>Message : {data.Message}</p>) : ('')}
                    <div className = "itemContainer">
                        <StatItem 
                            color = "#e1f3ff" 
                            title = "Nombre de cas" 
                            statTotal = {data.Global.TotalConfirmed.toLocaleString()} 
                            statNew = {(data.Global.NewConfirmed.toLocaleString())} 
                        />

                        <StatItem 
                            color = "#ffb5b6" 
                            title = "Nombre de décès" 
                            statTotal = {data.Global.TotalDeaths.toLocaleString()} 
                            statNew = {(data.Global.NewDeaths.toLocaleString())} 
                        />

                        <StatItem 
                            color="#b7ffe8" 
                            title="Guéris" 
                            statTotal = {data.Global.TotalRecovered.toLocaleString()} 
                            statNew = {(data.Global.NewRecovered.toLocaleString())} 
                        />
                    </div>
                </Fragment>
            ):('')}

            <Button action = {fetchData}  text = "Rafraîchir les données"/>
            <p>Actualisation automatique toute les 30 secondes.</p>
            <p>Data fetched from <a href="https://api.covid19api.com/summary">Covid19API</a></p>
        </div>
    );
}

export default App;