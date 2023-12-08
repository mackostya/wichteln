import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import santa from '../images/santa.png';
import {LAMBDA_LINK} from '../config';
import { useNavigate } from "react-router-dom";
import { UserContext, QuestionContext } from "../context/Context";




function WelcomePage() {
  const [user, setUser] = React.useContext(UserContext);
  const [question, setQuestion] = React.useContext(QuestionContext);
  let navigate = useNavigate(); 
  React.useEffect(() => {
    if (question !== ''){
      navigate("/question/");
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
      alert("Falscher Name! Es muss einer der foldenden sein: 'Harry', 'Hermione', 'Ron', 'Nevil', 'Luna'");
      return;
    }
    else{
      let Description = await JSON.parse(data[0].Description);
      if (Description.GivesPresentTo === null){
        setQuestion(Description.Question);
        console.log(Description)
      } else{
        alert("Du hast schon einen Wichtel gezogen! Falls du vergessen hast, wen du gezogen hast - wende dich an den Moderator :)");
        return;
      }

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
        <h4>
            Willkommen beim Wichteln!
        </h4>
        <h6>
            Hiermit hast du eine einmalige Möglichkeit einen geeigneten Kandidaten für das Wichteln zu finden. Nach diesem Versuch wird dir der Kandidat zugewiesen, den du dann beschenken kannst. Falls du den Kandidaten vergessen hast, wende dich an den Moderator:)
        </h6>
        <h6>
            Tippe deinen Namen ein um zu starten!
        </h6>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Name" variant="outlined" InputProps={{ style: { color: 'white'} }} InputLabelProps={{ style: { color: 'white'} }} onChange={(event) => {
                  setUser(event.target.value);
                }}/>
        </Box>
        <Button variant="contained" onClick={handleButtonClick}>Kandidaten generieren</Button>
    </div>

  );
}

export default WelcomePage;
