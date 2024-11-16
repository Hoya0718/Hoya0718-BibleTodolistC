import React, { useState, useEffect } from 'react';

const Map = () => {
  const [palettes, setPalettes] = useState([]);

  useEffect(() => {
    fetch('/api/Map')
      .then(response => response.json())
      .then(data => {
        const paletteArray = Object.entries(data);  
        setPalettes(paletteArray);  
      });
  }, []);

  return (
    <ul>
      {palettes.map(([color, hex], index) => (
        <li key={index}>
          {color}: <span style={{ color: hex }}>{hex}</span>
        </li>
      ))}
    </ul>
  );
};

export default Map;
