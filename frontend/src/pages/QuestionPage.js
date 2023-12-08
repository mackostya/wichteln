
import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import useStyles from '../styles';
import { LAMBDA_LINK } from '../config';
import { useNavigate } from "react-router-dom";
import { UserContext, QuestionContext, GeneratedUserContext } from "../context/Context";
import { WichtelnQuestions } from './questions';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const QuestionPage = () => {
    const [user, ] = React.useContext(UserContext);
    const [question, ] = React.useContext(QuestionContext);
    const [generatedUser, setGeneratedUser] = React.useContext(GeneratedUserContext);
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = React.useState('');
    let navigate = useNavigate(); 
    React.useEffect(() => {
        if (generatedUser !== ''){
          navigate("/result/");
          //window.location.pathname = "/question" + question + "/";
        }
      }, [generatedUser, navigate]);

    const handleOptionChange = (event) => {
        console.log(user)
        setSelectedOption(event.target.value);
    };

    const fetchGeneratedUserForAGift = async () => {
        console.log(user)
        const requestOptions = {
        method: "GET",
        };

        const response = await fetch(`${LAMBDA_LINK}?` + new URLSearchParams({User: user, Type: "Generate"}), requestOptions);
        let data = await response.json();
        if (data.length === 0){
            alert("Something went wrong!");
        return;
        }
        else{
            let GenUser = await data.GeneratedUser;
            console.log("Data ", data)
            console.log("User for ", user, " is ", GenUser);
            setGeneratedUser(GenUser);
        }
    };

    const handleSubmit = () => {
        console.log(selectedOption)
        if(selectedOption==="")
        {
            alert("Please select an option")
        }
        else
        {
            fetchGeneratedUserForAGift();
            //window.location.pathname = "/result/"
        }
    };

    return (
        <div className={classes.root}>

            <NotificationImportantIcon style={{ color: "green"}}/>
            <Typography variant="h6" className={classes.question} style={{ color: "green" }}>
                Deine Aufgabe ist jetzt die folgende Frage zu beantworten. Abhängig davon was du auswählst, wird dir ein Wichtel zugewiesen. Für die Zuweisung werden sehr sehr sehr komplizierte Algorithmen verwendet.
            </Typography>

        <span>&nbsp;&nbsp;</span>
        <Typography variant="h5" className={classes.question}>
            So, {user}, {WichtelnQuestions[question].question}
        </Typography>
        <RadioGroup
            aria-label="color"
            name="color"
            value={selectedOption}
            onChange={handleOptionChange}
            className={classes.options}
        >
            <FormControlLabel value="0" control={<Radio />} label={WichtelnQuestions[question].options[0]} />
            <FormControlLabel value="1" control={<Radio />} label={WichtelnQuestions[question].options[1]} />
            <FormControlLabel value="2" control={<Radio />} label={WichtelnQuestions[question].options[2]} />
            <FormControlLabel value="3" control={<Radio />} label={WichtelnQuestions[question].options[3]} />
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
            Submit
        </Button>
        </div>
    );
};

export default QuestionPage;
