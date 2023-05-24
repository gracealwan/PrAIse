import React, { useState, useEffect } from 'react';
import {Typography, Box, TextField} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from 'tss-react/mui';
import tinycolor from 'tinycolor2';
import {Button} from '@mui/material';



const useStyles = makeStyles()({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headercontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex:7
  },
  column: {
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    borderRadius: 8,
    lineHeight: 1.5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'sans-serif',
  },
  listItem: {
    marginBottom: 10,
    '&:hover': {
      fontWeight: "bold",
   },
  },
  header: {
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  goodbadcontainer: {
    flex:4
  },


});

function generateColorsArray(count, type) {
  const colorRange = [];
  var options = ["rgb(253, 244, 170)",
  "rgb(247, 195, 138)",
  "rgb(241, 150, 112)"];
  if (type == 'positive') {
    options = [
      "rgb(248, 204, 183)",
      "rgb(253, 244, 170)",
      "rgb(247, 195, 138)",
      "rgb(241, 150, 112)",
      "rgb(220, 230, 81)"];
    } else if (type == 'negative') {
      options = [
      "rgb(185, 152, 219 )", 
      "rgb(158, 146, 223)",
      "rgb(97, 176, 249)",
      "rgb(154, 214, 251)",
      "rgb(130, 218, 217 )"
      
    ]
      
  }; 
  for (let i = 0; i <= count; i++) {
    var cur_color = options[i % 4]; 
    colorRange.push(cur_color);
  }
  return colorRange;
}


const GoodAndBad = (props) => {
  const {classes } = useStyles();
  const [alignment, setAlignment] = useState('left');

  const positiveList = props.itemsList['positive'];
  const negativeList = props.itemsList['negative'];

  const handleMouseOver = (key) => {
    if(key == 'null') {
      props.onMouseOverKey("");
      props.setHighlightColor("white")
    }
    if (alignment == 'left') {
      const colors = generateColorsArray(6, 'positive')
      props.setHighlightColor(colors[key%6])
      props.onMouseOverKey(Object.keys(positiveList)[key]);
    }
    else if (alignment == 'right') {
      const colors = generateColorsArray(6, 'negative')
      props.setHighlightColor(colors[key%6])
      props.onMouseOverKey(Object.keys(negativeList)[key]);
    }
    
  };

  return (
        
      <Box className={classes.container}>
        <Box className={classes.headercontainer}>
          <Typography className={classes.header} variant='h4'>Action Items</Typography>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={(event, value) => {if (value != null) setAlignment(value)}}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Positive
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              Negative
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box className={classes.goodbadcontainer}>

            {(alignment == "left" || alignment == "center") && <Box className={classes.column}  >
                <Typography variant='h6'>Positive</Typography>
                <ul>
                {Object.entries(positiveList).map(([key, value],i) => <li key={i} onMouseOut={() => handleMouseOver(null)} onMouseOver={() => handleMouseOver(i)} className={classes.listItem}>{value}</li>)}
                </ul>
            </Box>}
      
            {(alignment == "right" || alignment == "center") && <Box className={classes.column}>
                <Typography variant='h6'>Negative</Typography>
                <ul>
                  {Object.entries(negativeList).map(([key, value],i) => <li key={i} onMouseOut={() => handleMouseOver(null)} onMouseOver={() => handleMouseOver(i)} className={classes.listItem}>{value}</li>)}
                </ul>
            </Box>}
        </Box>
      </Box>
  );
};

export default GoodAndBad;
