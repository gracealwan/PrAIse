import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GoodAndBad from './pages/GoodAndBad';
import ActionItems from './pages/ActionItems';
import ToggleButton from './src/components/ToggleButton';
import {Typography, Box, TextField} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  container: {
      display: 'flex',
      flexDirection: 'column',
      width: "100vw",
      margin: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textHolder: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  input: {
    width: '40%',
  },
  title: {
    fontSize: 40,
    paddingBottom: 20,
  },
  highlightedConatiner: {
    paddingLeft: 20,
    paddingRight: 20,

  }

});

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [text, setText] = useState("Default feedback");
  const {classes } = useStyles();

  const togglePageActionItems = () => {
    setCurrentPage('Action');
  };

  const togglePageGoodAndBad = () => {
    setCurrentPage('GoodBad');
  };

  return (
    <div className="App">
      <Box className={classes.container}>
        <Typography className={classes.title} variant="title">PrAIse: Feedback delivered how you want it</Typography>
        <Box className={classes.textHolder}>
          <TextField 
            className={classes.input}
            label="Enter your feedback here" 
            defaultValue={"Default feedback"} 
            variant='filled' 
            multiline 
            rows={10} 
            value={text}
            onChange={(event) => {
              setText(event.target.value); // "text" contains the feedback blurb
          }}/>
          <Box className={classes.highlightedConatiner}>
            <Typography>insert the highlighted stuff here once it's generated</Typography>
          </Box>
        </Box>
        
        <Box className={classes.buttonContainer}>
          <ToggleButton handleClick={togglePageActionItems} name={"Generate Aciton Items"} />
          <ToggleButton handleClick={togglePageGoodAndBad} name={"Give me the main points"} />
        </Box>
        
        {currentPage === 'Home' && <HomePage />}
        {currentPage === 'Action' && <ActionItems />}
        {currentPage === 'GoodBad' && <GoodAndBad />}
      </Box>
      
    </div>
  );
};

export default App;
