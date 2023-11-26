import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import santa from '../images/santa.png';
import {LAMBDA_LINK} from '../config';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


function WelcomePage() {
  const [user, setUser] = React.useContext(UserContext);
  const [question, setQuestion] = React.useState('');
  let navigate = useNavigate(); 
  React.useEffect(() => {
    if (question !== ''){
      navigate("/question" + question + "/");
      //window.location.pathname = "/question" + question + "/";
    }
  }, [question, navigate]);

  React.useEffect(() => {
    console.log(user)
  }, [user]);

  const fetchUser = async () => {
    console.log(user);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    const response = await fetch(`${LAMBDA_LINK}?` + new URLSearchParams({User: user, Type: "REST"}), requestOptions);
    let data = await response.json();
    if (data.length === 0 || user === ""){
      alert("Falscher Name! Es muss einer der foldenden sein: 'Helena', 'Mario', 'Fabio', 'Andi', 'Viola'");
      return;
    }
    else{
      let Description = await JSON.parse(data[0].Description);
      setQuestion(Description.Question);
      console.log(data);
      console.log(Description);
    }
  };


  function handleButtonClick(event) {
    fetchUser();
  }

  return (
    <div>
        <img src={santa} className="App-logo" alt="logo" />
        <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
        <p>
            Willkommen beim Wichteln!
        </p>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => {
                  setUser(event.target.value);
                }}/>
        </Box>
        <Button variant="contained" onClick={handleButtonClick}>Kandidaten generieren</Button>
    </div>

  );
}

export default WelcomePage;
