import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'

function Countries() {
    const [data, setData] = useState([])
    const [rangeValue, setRangeValue]=useState(36)
    const [seletedRadio, setSelectedRadio] = useState("")
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]


    useEffect(()=>{
        axios.get(" https://restcountries.com/v3.1/all")
        .then((res)=>setData(res.data))
    })
  return (
    <div className="countries">
        <ul className="radio-container">
            <input 
              type="range" 
              min="1" 
              max="250" 
              defaultValue={rangeValue} 
              onChange={(e)=>setRangeValue(e.target.value)} 
            />
            {radios.map((continent)=>(
                <li>
                    <input 
                      type="radio"
                      checked={continent === seletedRadio}
                      id={continent} 
                      name='inputRadio'
                      onChange={(e)=> setSelectedRadio(e.target.id)}
                    />
                    <label htmlFor={continent}>{continent}</label>
                </li>))
            }
        </ul>
        {seletedRadio && <button onClick={()=>setSelectedRadio("")}>Annuler la recherche</button>}
        <ul>
            {data
                 .filter((country)=> country.continents[0].includes(seletedRadio))
                 .sort((a,b)=>(b.population-a.population))
                 .slice(0,rangeValue)
                 .map((country, index)=>(
                    <Card key={index } country={country}/>
                ))
            }
        </ul>
    </div>
  )
}

export default Countries