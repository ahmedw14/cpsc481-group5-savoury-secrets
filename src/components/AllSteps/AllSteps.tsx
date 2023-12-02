
import { Button, Checkbox, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material'
import FilledButton from '../Button/FilledButton';
import { useEffect, useState } from 'react';


interface AllStepsProps {
  state: boolean;
  steps: string[];
  toggleAllSteps: () => void;
}

const AllSteps: React.FC<AllStepsProps> = ({ state, steps, toggleAllSteps }) => {

  const togglePopup = (open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    toggleAllSteps();
  };

  return(
    <Drawer
      anchor={'bottom'}
      open={state}
      onClose={togglePopup(false)}
    >
      <List sx={{width: "85%", maxHeight:"70vh", overflow:"scroll", margin: "auto", color: "var(--cardHeading)"}}>
        <Typography variant='h5'>Steps</Typography>
        {steps.map((step, index)=>{
          return(
            <div key={index}>
              <ListItem>
                <ListItemText primary={`${index+1}) ${step}`} sx={{color: "black"}}/>
              </ListItem>
              {
                index< (steps.length-1)?
                  <Divider />
                :<></>
              }
              
            </div>
            
          );
        })}
      </List>
    </Drawer>
  );
};

export default AllSteps