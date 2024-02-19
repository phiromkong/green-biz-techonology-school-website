import React from 'react';
import { Link } from 'react-router-dom'; 
import './css/NotFound.css';

const NotFound = () => {
return (
    <div className="permission_denied">
      <div id="tsparticles"></div>
      <div className="denied__wrapper">
        <h1>404</h1>
        <h3>
        Hmm, looks like that page doesn't
          exist.
        </h3>
        <img id="astronaut" src="../astronaut.svg" alt='Astronaunt' />
        <img id="planet" src="../planet.svg" alt='planent' />
        <Link to="/"><button className="denied__link">Go Home</button></Link> {/* This line is modified */}
      </div>
    </div>
  );
};

export default NotFound;