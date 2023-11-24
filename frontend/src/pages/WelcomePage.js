import React from 'react';
import Button from '@mui/material/Button';
import santa from '../images/santa.png';

function WelcomePage() {
  return (
    <div>
        <img src={santa} className="App-logo" alt="logo" />
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <p>
            Willkommen beim Wichteln!
        </p>
        <Button variant="contained" onClick={()=>{window.location.pathname = "/question/"}}>Kandidaten generieren</Button>
    </div>

  );
}

export default WelcomePage;
