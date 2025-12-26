import React from "react";
import "../styles/MainContainer.css";
import { getIcon } from "../iconMapping";

function WeatherCard(props) {
  return (
    <div className='forecast-card'>
      <div className='forecast-date'>{props.day}</div>
      <div className='forecast-icon'>
        <img src={getIcon(props.icon)} alt={props.description} />
      </div>
      <div className='forecast-temp'>{Math.round(props.high)}° to {Math.round(props.low)}°</div>
    </div>
  );
}

export default WeatherCard;