
import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import useStyles from '../styles';
import { LAMBDA_LINK } from '../config';
import { UserContext } from "../context/UserContext";

const Question4Page = () => {
    const [user, ] = React.useContext(UserContext);
    const classes = useStyles();
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleOptionChange = (event) => {
        console.log(user)
        setSelectedOption(event.target.value);
    };

    const fetchGeneratedUserForAGift = async () => {
        console.log(user)
        const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
        };

        const response = await fetch(`${LAMBDA_LINK}?` + new URLSearchParams({User: user, Type: "Generate"}), requestOptions);
        let data = await response.json();
        if (data.length === 0){
            alert("Something went wrong!");
        return;
        }
        else{
            console.log(data)
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
        <Typography variant="h5" className={classes.question}>
            What is your favorite color?
        </Typography>
        <RadioGroup
            aria-label="color"
            name="color"
            value={selectedOption}
            onChange={handleOptionChange}
            className={classes.options}
        >
            <FormControlLabel value="0" control={<Radio />} label="Red" />
            <FormControlLabel value="1" control={<Radio />} label="Blue" />
            <FormControlLabel value="2" control={<Radio />} label="Green" />
            <FormControlLabel value="3" control={<Radio />} label="Black" />
        </RadioGroup>
        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
            Submit
        </Button>
        </div>
    );
};

export default Question4Page;
