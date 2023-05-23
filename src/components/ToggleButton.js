import React from 'react';
import {Typography, Box, TextField, Button} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  button: {
      fontWeight: 'bold',
      marginRight: 20,
  },

});

const ToggleButton = ({disabled, handleClick, name }) => {
  const {classes } = useStyles();

  return (
    <Button disabled={!disabled} variant="contained" className={classes.button} onClick={handleClick}>
      {name}
    </Button>
  );
};

export default ToggleButton;
