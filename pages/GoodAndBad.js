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
    marginBottom: 10
  },
  header: {
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  goodbadcontainer: {
    flex:4
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
    var cur_color = options[i % 5]; 
    colorRange.push(cur_color);
  }
  return colorRange;
}


const GoodAndBad = (props) => {
  const {classes } = useStyles();
  const [creativeList, setCreativeList] = useState(Object.values(props.itemsList['positive']));
  const [objList, setObjList] = useState(Object.values(props.itemsList['negative']));
  const [alignment, setAlignment] = useState('left');

  function highlightSubstring(fb, textList, color1, color2, listType) {
    let updatedFb = fb;
    //const colors = generatePastelColors(textList.length, color1, color2);
    const colors = generateColorsArray(textList.length, listType); 
    console.log("colors: " + colors);
    textList.forEach((searchString, i) => {
      const regex = new RegExp(searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      console.log("color at i: ", colors[i]);
      updatedFb = updatedFb.replace(regex, match => `<mark style="background:${colors[i]}"><strong>${match}</strong></mark>`);
    });
    let list = listType == "positive"? creativeList : objList;
    let newList = list.map((item,i) => <mark style={{background:colors[i]}}>{item}</mark>)
    listType == "positive"? setCreativeList(newList):setObjList(newList);
    return updatedFb;
  }

  function highlightSection(reset, type, _feedback) {
    let feedbackToDisplay = _feedback ? _feedback :props.originalFb;
    let updatedFb = "";
    if (type == "positive") {
      updatedFb = highlightSubstring(feedbackToDisplay, Object.keys(props.itemsList['positive']), '#ABC7A2', "#E5F5DF", type)
    }
    else {
      updatedFb = highlightSubstring(feedbackToDisplay, Object.keys(props.itemsList['negative']),'#DB8385', "#F6E0E0" , type)
    }
    props.setFeedb(updatedFb);
    return updatedFb;
  }

  useEffect(() => {
    if(alignment == 'center') {
      let updatedFb = highlightSection(false, "positive");
      highlightSection(false, "negative", updatedFb);
    }
    else {
      highlightSection(true, alignment == 'left'? "positive":"negative");
    }
      
  }, [alignment]);

  return (
    <Box className={classes.container}>
      <Box className={classes.headercontainer}>
        <Typography className={classes.header} variant='h4'>FB Summary</Typography>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={(event, value) => {if(value!=null) setAlignment(value)}}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            Positive
          </ToggleButton>
          {/* <ToggleButton value="center" aria-label="centered">
            All
          </ToggleButton> */}
          <ToggleButton value="right" aria-label="right aligned">
            Negative
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
        <Box className={classes.goodbadcontainer}>

          {(alignment == "left" || alignment == "center") && 
          <Box className={classes.column}>
          <Typography variant='h6'>Positive</Typography>
          <ul>
            {creativeList.map(item => <li className={classes.listItem}>{item}</li>)}
          </ul>
          </Box>}
      
          {(alignment == "right" || alignment == "center") && <Box className={classes.column}>
                <Typography variant='h6'>Negative</Typography>
                <ul>
                  {objList.map(item => <li className={classes.listItem}>{item}</li>)}
                </ul>
          </Box>}
        </Box>

    </Box>
  );
};

export default GoodAndBad;
