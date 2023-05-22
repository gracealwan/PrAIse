import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import GoodAndBad from './pages/GoodAndBad';
import ActionItems from './pages/ActionItems';
import ToggleButton from './src/components/ToggleButton';
import {Typography, Box, TextField} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import tinycolor from 'tinycolor2';

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
  highlightedContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1
  },
  // highlighted: {
  //   backgroundColor: #0000,
  // }

});

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [text, setText] = useState("Default feedback");

  const {classes } = useStyles();
  const feedback = "I really liked how you walked us through your analysis. There are several interesting themes that you've uncovered that could either motivate your project or be used as guidelines. For scoping, I might recommend focusing on the most interesting one you'd like to explore further and revisiting the others to see how they might inform designs about this focus. Nice job gathering the perspectives and experiences from two users on challenges in the workplace! We did notice that both of your participants were PMs who joined the company recently. Totally understand that it's hard to recruit users in this space, so instead, it's a good idea to also include some sort of explicit reflection on how that might have shaped your needfinding. Not sure if being hired recently would affect things, but PMs might be especially concerned about progress and feedback, so might scope this as aimed for people who are managing processes or projects. Nice job synthesizing what you learned from each participant! Very clear steps on how your team went from the needfinding notes to the POV, which also surfaced several potential ideas to be brainstormed on. The concepts around direct feedback as well as up-to-date progress are really interesting areas to explore. One thing that didn't feel as clear (and was brought up during the presentation) was that it was a bit difficult to tell how this connects with the targeted problem space. In addition, during our feedback, someone brought up that a participant thought there was a lot of value in subjective tasks (creativity, potential for praise, etc.) - would this be something that's valuable to include in the story leading up to your POV, or even hint at with the POV itself? Lastly a word of caution: “no-work-added avenue” feels like a very large space! I get that it's broad for brainstorming purposes, but just keep in mind during your brainstorming about the time remaining to work on it for the quarter. Great organization of slides and using bolds to highlight key phrases/words in the later half of slides!"
 
  const actionItemList = {
    "creative": {
      "There are several interesting themes that you've uncovered that could either motivate your project or be used as guidelines. For scoping, I might recommend focusing on the most interesting one you'd like to explore further and revisiting the others to see how they might inform designs about this focus.": "Consider selecting the most interesting theme and exploring it further for the project. Revisit the other themes to identify ways they can inform the design within the chosen focus.",
      "The concepts around direct feedback as well as up-to-date progress are really interesting areas to explore.": "Further explore the concepts of direct feedback and up-to-date progress as potential areas of focus for your project.",
      "Someone brought up that a participant thought there was a lot of value in subjective tasks (creativity, potential for praise, etc.) - would this be something that's valuable to include in the story leading up to your POV, or even hint at with the POV itself?": "Consider incorporating the value of subjective tasks, such as creativity and potential for praise, into the story leading up to your Point of View (POV) or even hint at it within the POV itself.",
      "I get that it's broad for brainstorming purposes, but just keep in mind during your brainstorming about the time remaining to work on it for the quarter.": "When brainstorming, be mindful of the time constraints for the quarter and avoid overly broad ideas that may not be feasible to implement within the given timeframe."
    },
    "objective": {
      "It's a good idea to also include some sort of explicit reflection on how that might have shaped your needfinding.": "Include explicit reflection on how the fact that both participants were recently hired PMs might have influenced your needfinding.",
      "Might scope this as aimed for people who are managing processes or projects.": "Consider narrowing the scope to target individuals who manage processes or projects.",
      "One thing that didn't feel as clear (and was brought up during the presentation) was that it was a bit difficult to tell how this connects with the targeted problem space.": "Ensure clarity on how your findings connect with the targeted problem space.",
      "“No-work-added avenue” feels like a very large space! Just keep in mind during your brainstorming about the time remaining to work on it for the quarter.": "Consider the feasibility of exploring the broad concept of a 'no-work-added avenue' within the limited timeframe of the quarter.",
      "Great organization of slides and using bolds to highlight key phrases/words in the later half of slides!": "Continue utilizing effective slide organization techniques and the use of bold text to highlight key phrases/words."
    }
  }

  const goodBadList = {
    "positive": {
      "There are several interesting themes that you've uncovered that could either motivate your project or be used as guidelines. For scoping, I might recommend focusing on the most interesting one you'd like to explore further and revisiting the others to see how they might inform designs about this focus.": "Consider selecting the most interesting theme and exploring it further for the project. Revisit the other themes to identify ways they can inform the design within the chosen focus.",
      "The concepts around direct feedback as well as up-to-date progress are really interesting areas to explore.": "Further explore the concepts of direct feedback and up-to-date progress as potential areas of focus for your project.",
      "Someone brought up that a participant thought there was a lot of value in subjective tasks (creativity, potential for praise, etc.) - would this be something that's valuable to include in the story leading up to your POV, or even hint at with the POV itself?": "Consider incorporating the value of subjective tasks, such as creativity and potential for praise, into the story leading up to your Point of View (POV) or even hint at it within the POV itself.",
      "I get that it's broad for brainstorming purposes, but just keep in mind during your brainstorming about the time remaining to work on it for the quarter.": "When brainstorming, be mindful of the time constraints for the quarter and avoid overly broad ideas that may not be feasible to implement within the given timeframe."
    },
    "negative": {
      "It's a good idea to also include some sort of explicit reflection on how that might have shaped your needfinding.": "Include explicit reflection on how the fact that both participants were recently hired PMs might have influenced your needfinding.",
      "Might scope this as aimed for people who are managing processes or projects.": "Consider narrowing the scope to target individuals who manage processes or projects.",
      "One thing that didn't feel as clear (and was brought up during the presentation) was that it was a bit difficult to tell how this connects with the targeted problem space.": "Ensure clarity on how your findings connect with the targeted problem space.",
      "“No-work-added avenue” feels like a very large space! Just keep in mind during your brainstorming about the time remaining to work on it for the quarter.": "Consider the feasibility of exploring the broad concept of a 'no-work-added avenue' within the limited timeframe of the quarter.",
      "Great organization of slides and using bolds to highlight key phrases/words in the later half of slides!": "Continue utilizing effective slide organization techniques and the use of bold text to highlight key phrases/words."
    }
  }

  const [originalFb, setOriginalFb] = useState(feedback);

  const [feedb, setFeedb] = useState(originalFb);

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
          <Box className={classes.highlightedContainer}>
            <div dangerouslySetInnerHTML={{ __html: feedb }} />
          </Box>
        </Box>
        
        <Box className={classes.buttonContainer}>
          <ToggleButton handleClick={async () => {
            togglePageActionItems();
          }
          } name={"Generate Action Items"} />
          <ToggleButton handleClick={togglePageGoodAndBad} name={"Give me the main points"} />
        </Box>
        
        {currentPage === 'Home' && <HomePage />}
        {currentPage === 'Action' && <ActionItems itemsList={actionItemList} originalFb={originalFb} setFeedb={setFeedb} />}
        {currentPage === 'GoodBad' && <GoodAndBad  itemsList={goodBadList} originalFb={originalFb} setFeedb={setFeedb} />}
      </Box>
      
    </div>
  );
};

export default App;
