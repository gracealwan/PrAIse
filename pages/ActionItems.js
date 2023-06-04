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
    marginRight: 80,
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
    marginLeft: 80,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,

  },
  actioncontainer: {
    flex:4
  },


});

function generateColorsArray(count, type) {
  const colorRange = [];
  var options = ["rgb(253, 244, 170)",
  "rgb(247, 195, 138)",
  "rgb(241, 150, 112)"];
  if (type == 'creative') {
    options = [
      "rgb(240, 160, 188, 0.7)",
      "rgb(236, 181, 183, 0.7)",
      "rgb(221, 205, 239, 0.7)",
      "rgb(158, 146, 223, 0.7)"
    ];
  } else if (type == 'objective') {
    options = [
    "rgb(220, 230, 81, 0.7)",
    "rgb(162, 216, 118, 0.7)",
    "rgb(130, 218, 217, 0.7)",
    
  ]
  }; 
  for (let i = 0; i <= count; i++) {
    var cur_color = options[i % 4]; 
    colorRange.push(cur_color);
  }
  return colorRange;
}


const ActionItems = (props) => {
  const {classes } = useStyles();
  const [alignment, setAlignment] = useState('left');

  const creativeList = props.itemsList['creative'];
  const objList = props.itemsList['objective'];

  const handleMouseOver = (key) => {
    if(key == 'null') {
      props.onMouseOverKey("");
      props.setHighlightColor("white")
    }
    if (alignment == 'left') {
      const colors = generateColorsArray(6, 'creative')
      props.setHighlightColor(colors[key%6])
      props.onMouseOverKey(Object.keys(creativeList)[key]);
    }
    else if (alignment == 'right') {
      const colors = generateColorsArray(6, 'objective')
      props.setHighlightColor(colors[key%6])
      props.onMouseOverKey(Object.keys(objList)[key]);
    }
    
  };

  return (
        
      <Box className={classes.container}>
        <Box className={classes.headercontainer}>
          <Typography className={classes.header} variant='h4'>Action Items</Typography>
          <ToggleButtonGroup
            
            value={alignment}
            fullWidth="1"
            exclusive
            onChange={(event, value) => {if (value != null) setAlignment(value)}}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Creative tasks
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              Serious tasks
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box className={classes.actioncontainer}>

            {(alignment == "left" || alignment == "center") && <Box className={classes.column}  >
                <Typography variant='h6'>Tasks for when you're feeling creative</Typography>
                <ul>
                {Object.entries(creativeList).map(([key, value],i) => <li key={i} onMouseOut={() => handleMouseOver(null)} onMouseOver={() => handleMouseOver(i)} className={classes.listItem}>{value}</li>)}
                </ul>
            </Box>}
      
            {(alignment == "right" || alignment == "center") && <Box className={classes.column}>
                <Typography variant='h6'>Tasks for when you're feeling less creative</Typography>
                <ul>
                  {Object.entries(objList).map(([key, value],i) => <li key={i} onMouseOut={() => handleMouseOver(null)} onMouseOver={() => handleMouseOver(i)} className={classes.listItem}>{value}</li>)}
                </ul>
            </Box>}
        </Box>
      </Box>
  );
};

export default ActionItems;
