
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  question: {
    marginBottom: theme.spacing(2),
  },
  options: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const QuestionPage = () => {
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

export default QuestionPage;
