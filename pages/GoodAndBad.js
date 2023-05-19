import React from 'react';
import {Typography, Box, TextField} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

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
  column: {
    width: '40%',
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid'
  }

});
const GoodAndBad = () => {
    const {classes } = useStyles();

    return (
      <Box className={classes.container}>
        <Typography variant='h4'>Feedback Summary</Typography>
        <Box className={classes.goodbadcontainer}>
            <Box className={classes.column}>
                <Typography variant='h6'>Good Points</Typography>
                <Typography variant='body'>insert good points once generated</Typography>
            </Box>
            <Box className={classes.column}>
                <Typography variant='h6'>Points to Improve</Typography>
                <Typography variant='body'>insert bad points once generated</Typography>
            </Box>
        </Box>
      </Box>
    );
};

export default GoodAndBad;
