import React, {useState} from 'react';
import axios from 'axios';

import './App.css';
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Weather from './components/weather.component'; importation des donnees d'un autre component


function App() {
  const [data,setData]=useState({}) 
    const [lieu, setLieu]= useState('')
    const api= `https://api.openweathermap.org/data/2.5/weather?q=${lieu}&appid=c5685a3c183e8d4ee998a0def75b3c94`

    //recuperation de donnees input apres avoir cliqué sur enter
    const recherche = (event)=>{
      if (event.key === `Enter`){
        axios.get(api).then((response) =>{
          setData(response.data)
          console.log(response.data)
        })
        //enleve le nom du lieu apres envoi du formulaire
        setLieu('')
      }
      
    }
 
    return (
      <div className="App">
        <div className='recherche'>
          <input
          type="text"
          onKeyPress={recherche}
          value={lieu}
          onChange={event =>setLieu(event.target.value)}
          placeholder='entrer un lieu'
          />
        </div>
        {(typeof data.main != "undefined") ? (
          <div className='meteo'>
            <div className='lieu'>
                <h1>{data.name} {data.sys ?  `,${data.sys.country}`  : null} </h1>
            </div>
            <div className='temp'>
                {data.main ? <h2> {Math.round((data.main.temp)-273.15)}°C </h2> : null} 
            </div>
            <div className='clair_nuage'>
              {data.weather[0].main}
              
            </div>
            <div className='minmax'>
              <div className='tempmin'>
                  {data.main ? <h3> {Math.round((data.main.temp_min)-273.15)}°C </h3> : null} 
                  <label>température minimale</label>
              </div>
              <div className='tempmax'>
                  {data.main ? <h3> {Math.round((data.main.temp_max)-273.15)}°C  </h3> : null}
                  <label>température maximale</label>
              </div>
            </div>
            <div className='moment'>
              <div className='humidite'>
                  {data.main ? <h3> {Math.round(data.main.humidity)}% </h3> : null} 
                  <label>Humidité</label>
              </div>
              <div className='vent'>
                  {data.main ? <h3> {Math.round(data.wind.speed)}KM/H </h3> : null}
                  <label>vent</label> 
              </div>
              <div className='bourrasque'>
                  {data.main ? <h3> {Math.round(data.wind.gust)}% </h3> : null}
                  <label>Bourrasque</label> 
              </div>
            </div>
           </div>
        ) : ('veuillez saisir un lieu')}
        
      </div>
    );
}

export default App;
