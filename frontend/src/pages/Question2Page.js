
import React from 'react';
import { Typography, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import useStyles from '../styles';

const Question2Page = () => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    window.location.pathname = "/result/"
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
        <FormControlLabel value="red" control={<Radio />} label="Red" />
        <FormControlLabel value="blue" control={<Radio />} label="Blue" />
        <FormControlLabel value="green" control={<Radio />} label="Green" />
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
        Submit
      </Button>
    </div>
  );
};

export default Question2Page;
