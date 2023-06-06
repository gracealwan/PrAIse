import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import GoodAndBad from './pages/GoodAndBad';
import ActionItems from './pages/ActionItems';
import ToggleButton from './src/components/ToggleButton';
import {Typography, Box, TextField} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import tinycolor from 'tinycolor2';
import jsonData from './tokens.json';


const useStyles = makeStyles()({
  container: {
      display: 'flex',
      flexDirection: 'row',
      padding: 50,
      width: "95vw",
      fontFamily: 'sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex:3,
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  textHolder: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  input: {
    width: '40%',
  },
  logo:{
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    paddingBottom: 20,
    flex:1
  },
  highlightedContainer: {
    flex:3,
    marginLeft:5,
    fontFamily: 'sans-serif',
    lineHeight: 1.7,
  },
  maintext: {
  },
  display: {
    flexGrow:4,
  }

});

const App = () => {
  const token = jsonData.openAI; 
  const [currentPage, setCurrentPage] = useState('Home');
  const [openAIfinished, setOpenAIfinished] = useState(true);
  const feedback = "Thanks so much for taking the time to present yesterday. It was really lucky that so many of the directors were able to come watch, and that really speaks to your talent. I thought the overall presentation flow was quite good, and the execs seemed excited about the possibility of this product. I really liked how you walked us through your analysis, and nice job synthesizing what you learned from each participant! Some of the organization, especially in between the middle two sections, was hard to follow and the main user frustration was unclear. I could tell that Emma and Josie were getting confused. For the next presentation, let's work on making those main points more clear. Also, we should do some more work on solidifying a name for this product. A name would really help introduce buy-in from the team and may help rally support behind the product. I'm thinking of some type of play on words, something short and punchy. Seems like the slides went over well. Overall, slide design was good and in line with the current branding. Some of the colors used were too light and it was hard to see the table of contents on the agenda slide. We might also want to think about how to reorganize the agenda slide to make it more visually interesting. Also, include slide numbers so that people can more easily refer back to slides in the Q&A portion. For the Q&A, you had strong answers to the branding questions but faltered a bit on the go-to-market strategy. Let's really work on solidifying the go-to-market and anticipating questions that might be asked in the future. Don't be afraid to ask for a minute to think about the question to compose a structured answer or to say that we don't know the answer yet. You could also brainstorm other users we could talk to from different user populations that use this product, since this was mentioned as a hole in user research from Emma. We'll also need to write up a product spec to forward to the development team."
  const {classes } = useStyles();
  const [highlightColor, setHighlightColor] = useState('yellow')
  
  const gatherOpenAIData = async(feedback, type) => {
    var prompt = ""; 
    if (type == "goodBad") {
      prompt = `Separate this feedback into one JSON object containing 2 nested JSON objects: one under key “positive” and one under key “negative”. Each object contains positive and negative (corresponding to the key) summary phrases for the employee based on the manager's feedback. Make the feedback points short and to the point and only provide the 3 most important points. Format the summary phrases as key: value pairs where the original string from the original feedback is the key and the generated phrase is the value`;
    } else {
      prompt = `Separate this feedback into one JSON object containing 2 nested JSON objects: one under key "creative" and one under key "objective". Each object contains creative and non-creative (corresponding to the key) action items for the employee based on the manager's feedback. Make the action items short and to the point and only provide the 3 most important points. Format the actions items as key: value pairs where the original string from the original feedback is the key and the generated action item is the value.`;
    }
    const question = prompt + " " + feedback; 
    console.log("token: " + token);
    const apiKey = token;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: question,
            }, 
            ],
            max_tokens: 500, // adjust the desired length of the response
            temperature: 0.7 // adjust the temperature for controlling the randomness
          })
        });
        const data = await response.json();
        const answer = data.choices[0].message['content'];
        console.log("answer: " + answer);
        console.log("OpenAI response received for" + type + " type of feedback");
        if (type == 'goodBad') {
          setOpenAIfinished(true);
        }

        return String(answer); 
    } catch (error) {
        console.error('Error:', error);
    }
  }; 
  
  const actionItemList = {
    "creative": {
        "Also, we should do some more work on solidifying a name for this product. A name would really help introduce buy-in from the team and may help rally support behind the product. I'm thinking of some type of play on words, something short and punchy.": "Brainstorm and finalize a creative, short, and punchy name for the product.",
        "We might also want to think about how to reorganize the agenda slide to make it more visually interesting.": "Consider creative ways to reorganize the agenda slide for more visual appeal.",
        "You could also brainstorm other users we could talk to from different user populations that use this product, since this was mentioned as a hole in user research from Emma.": "Brainstorm creative ways to reach out to other user populations for more comprehensive user research."
    },
    "objective": {
        "For the Q&A, you had strong answers to the branding questions but faltered a bit on the go-to-market strategy. Let's really work on solidifying the go-to-market and anticipating questions that might be asked in the future.": "Focus on solidifying the go-to-market strategy and anticipating potential questions for Q&A.",
        "Some of the organization, especially in between the middle two sections, was hard to follow and the main user frustration was unclear.": "Improve organization and clarify user frustrations.",
        "Include slide numbers so that people can more easily refer back to slides in the Q&A portion.": "Add slide numbers to make it easier for people to refer back to specific slides during Q&A."
    }
  }

  const goodBadList = {
    "positive": {
      "Thanks so much for taking the time to present yesterday.": "Great job on the presentation!",
      "I thought the overall presentation flow was quite good, and the execs seemed excited about the possibility of this product.": "Impressive presentation, and the executives showed enthusiasm!",
      "I really liked how you walked us through your analysis, and nice job synthesizing what you learned from each participant!": "Excellent analysis and synthesis of participant feedback!"
    },
    "negative": {
      "Some of the organization, especially in between the middle two sections, was hard to follow and the main user frustration was unclear. I could tell that Emma and Josie were getting confused.": "Improve organization and clarity in the middle sections for better audience understanding.",
      "For the Q&A, you had strong answers to the branding questions but faltered a bit on the go-to-market strategy. Let's really work on solidifying the go-to-market and anticipating questions that might be asked in the future. Don't be afraid to ask for a minute to think about the question to compose a structured answer or to say that we don't know the answer yet.": "Strengthen go-to-market strategy, prepare for future questions, and be confident in requesting time to think or admitting when information is not yet available.",
      "You could also brainstorm other users we could talk to from different user populations that use this product, since this was mentioned as a hole in user research from Emma.": "Consider exploring additional user populations for comprehensive user research.",
      "We'll also need to write up a product spec to forward to the development team.": "Please prepare a product specification document for the development team."
    }
  }

  const [originalFb, setOriginalFb] = useState(feedback);
  const [actionItemData, setActionItemData] = useState(actionItemList);
  const [goodBadListData, setGoodBadListData] = useState(goodBadList); 
  const [feedb, setFeedb] = useState(originalFb);
  const [highlighted, setHighlighted] = useState("")

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        var data = await gatherOpenAIData(feedback, "action");
        setActionItemData(JSON.parse(data));
        data = await gatherOpenAIData(feedback, "goodBad"); 
        setGoodBadListData(JSON.parse(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call the fetchData function only once when the component mounts
    //fetchData();
  }, []);

  useEffect(() => {
    let updatedFb = originalFb;
    document.getElementById("maintext").style["color"] = "black";
    if(highlighted && highlighted != "") {
      const regex = new RegExp(highlighted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      updatedFb = updatedFb.replace(regex, match => `<mark style="background: ${highlightColor}" transition: 'color 1s'>${match}</mark>`);
      const element = document.getElementById("maintext");
      element.style.transition = "color 2s";
      element.style.color = "#c6c6c6";
    }
    setFeedb(updatedFb)

  }, [highlighted]);

  const handleMouseOverKey = (value) => {
    setHighlighted(value);
  };
  


  const togglePageActionItems = () => {
    setCurrentPage('Action');
  };

  const togglePageGoodAndBad = () => {
    setCurrentPage('GoodBad');
  };
  
  return (
    <div className="App">
      <Box className={classes.container}>
        <Typography className={classes.title} variant="title"><strong className={classes.logo}>PrAIse</strong>: Feedback delivered how you want it</Typography>
        <Box className={classes.highlightedContainer}>
          <h3>Feedback from John Doe in Slack</h3>
          <div id="maintext" className={classes.maintext} dangerouslySetInnerHTML={{ __html: feedb }} />
        </Box>
        
        <Box className={classes.buttonContainer}>
          <Box className={classes.buttons}>
            
            <ToggleButton disabled={openAIfinished} handleClick={togglePageGoodAndBad} name={"Give me the main points"} />
            <ToggleButton disabled={openAIfinished} handleClick={async () => {
              togglePageActionItems();
            }
            } name={"Generate Action Items"} />
          </Box>
          <div className={classes.display}>
            {currentPage === 'Home' && <HomePage />}
            {currentPage === 'GoodBad' && <GoodAndBad  itemsList={goodBadListData} originalFb={originalFb} setFeedb={setFeedb} setHighlightColor={setHighlightColor} onMouseOverKey={handleMouseOverKey}/>}
            {currentPage === 'Action' && <ActionItems itemsList={actionItemData} originalFb={originalFb} setFeedb={setFeedb} setHighlightColor={setHighlightColor} onMouseOverKey={handleMouseOverKey}/>}
          </div>
        </Box>
      </Box>
      
    </div>
  );
};

export default App;
