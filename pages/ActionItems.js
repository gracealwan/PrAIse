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
    width: "100vw",
    marginTop: 20,
  },
  goodbadcontainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  headercontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column: {
    width: '45%',
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    lineHeight: 1.5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'sans-serif',
  },
  listItem: {
    marginBottom: 10
  }

});



function generatePastelColors(count, color1, color2) {
  const startColor = tinycolor(color1);
  const endColor = tinycolor(color2);
  const colorRange = [];

  for (let i = 0; i <= count; i++) {
    const color = tinycolor.mix(startColor, endColor, i * (100 / count));
    colorRange.push(color.toHexString());
  }

  return colorRange;
}

function generateColorsArray(count, type) {
  const colorRange = [];
  var options = ["rgb(253, 244, 170)",
  "rgb(247, 195, 138)",
  "rgb(241, 150, 112)"];
  if (type == 'creative') {
    options = [
      "rgb(240, 160, 188)",
      "rgb(236, 181, 183)",
      "rgb(221, 205, 239)",
      "rgb(158, 146, 223)"
    ];
  } else if (type == 'objective') {
    options = [
    "rgb(220, 230, 81)",
    "rgb(162, 216, 118)",
    "rgb(130, 218, 217)",
    
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
  const [creativeList, setCreativeList] = useState(Object.values(props.itemsList['creative']));
  const [objList, setObjList] = useState(Object.values(props.itemsList['objective']));
  const [alignment, setAlignment] = useState(null);

  function highlightSubstring(fb, textList, color1, color2, listType) {
    let updatedFb = fb;
    // const colors = generatePastelColors(textList.length, color1, color2);
    const colors = generateColorsArray(textList.length, listType); 
    textList.forEach((searchString, i) => {
      const regex = new RegExp(searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      updatedFb = updatedFb.replace(regex, match => `<mark style="background:${colors[i]}"><strong>${match}</strong></mark>`);
    });
    let list = listType == "creative"? creativeList : objList;
    let newList = list.map((item,i) => <mark style={{background:colors[i]}}>{item}</mark>)
    listType == "creative"? setCreativeList(newList):setObjList(newList);
    return updatedFb;
  }

  function highlightSection(reset, type, _feedback) {
    let feedbackToDisplay = _feedback ? _feedback :props.originalFb;
    let updatedFb = "";
    if (type == "creative") {
    
      updatedFb = highlightSubstring(feedbackToDisplay, Object.keys(props.itemsList['creative']),'#FCC981', "#FEEBD0" , type)
    }
    else {
      updatedFb = highlightSubstring(feedbackToDisplay, Object.keys(props.itemsList['objective']),'#AE99BE', "#EBE5EF", type)
    }
    props.setFeedb(updatedFb);
    return updatedFb;
  }

  useEffect(() => {
    if(alignment == 'center') {
      let updatedFb = highlightSection(false, "creative");
      highlightSection(false, "objective", updatedFb);
    }
    else {
      highlightSection(true, alignment == 'left'? "creative":"objective");
    }
      
  }, [alignment]);

  return (
    <Box className={classes.container}>
        
      <Box className={classes.headercontainer}>
        <Typography variant='h4'>Action Items</Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(event, value) => setAlignment(value)}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            Creative
          </ToggleButton>
          {/* <ToggleButton value="center" aria-label="centered">
            All
          </ToggleButton> */}
          <ToggleButton value="right" aria-label="right aligned">
            Objective
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={classes.goodbadcontainer}>

          <Box className={classes.column} style={{ visibility: (alignment == "left" || alignment == "center")? 'visible':'hidden' }} >
              <Typography variant='h6'>Creative</Typography>
              <ul>
                {creativeList.map(item => <li className={classes.listItem}>{item}</li>)}
              </ul>
          </Box>
    
          <Box className={classes.column}  style={{ visibility: (alignment == "right" || alignment == "center")? 'visible':'hidden' }}>
              <Typography variant='h6'>Objective</Typography>
              <ul>
                {objList.map(item => <li className={classes.listItem}>{item}</li>)}
              </ul>
          </Box>
      </Box>
    </Box>
  );
};

export default ActionItems;
