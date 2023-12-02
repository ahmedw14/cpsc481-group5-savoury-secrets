
import { Button, Checkbox, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material'
import FilledButton from '../Button/FilledButton';
import { useEffect, useState } from 'react';

interface SavedFilterProps {
  state: boolean;
  toggleFilter: () => void;
  onSaveChangesClick: (checkedList: number[]) => void;
}

const SavedFilter: React.FC<SavedFilterProps> = ({ state, toggleFilter, onSaveChangesClick }) => {

  const allergies = ['Vegan', 'Vegetarian', 'Halal', 'Nut Free', 'Gluten Free', 'Dairy Free'];
  const [checked, setChecked] = useState<number[]>([]);
  useEffect(() => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
      const parsedLocal = JSON.parse(local);
      const matchingIndices: number[] = allergies.reduce((indices: number[], element: string, index: number) => {
        if (parsedLocal.allergies.includes(element)) {
          indices.push(index);
        }
        return indices;
      }, []);
      setChecked(matchingIndices);
    }
  }, []);
  const handleSaveClick = () => {
    onSaveChangesClick(checked);
  };
  const toggleDrawer = (open: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    toggleFilter();
  };
  const handlClearFilter = () => {
    setChecked([]);
    onSaveChangesClick([]);
  };
  
  const handleToggle = (value: number) => () => {
    console.log(checked)
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    
};
  return(
    <Drawer
      anchor={'bottom'}
      open={state}
      onClose={toggleDrawer(false)}
    >
      <List sx={{width: "90%", margin: "auto", color: "var(--cardHeading)"}}>
        <Typography variant='h5'>Dietary</Typography>
        {allergies.map((allergy, index)=>{
          return(
            <ListItem onClick={handleToggle(index)}  disablePadding key={index}>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(index) !== -1}
                    tabIndex={-1}
                    disableRipple
                    sx={{color: "var(--background)", '&.Mui-checked': {color: 'var(--background)'}}}
                    />
                </ListItemIcon>
                <ListItemText primary={allergy} sx={{color: "black"}}/>
              </ListItemButton>
            </ListItem>
          );
        })}
        <br></br>
        <div className="bottom_buttons">
          <Button variant="contained"
              onClick={()=>{handlClearFilter()}}
              sx={{
              width: "45%",
              height: "100%",
              backgroundColor: "var(--secondary)",
              color: "var(--buttonText)",
              minWidth: "150px",
              borderRadius: "10px",
              border: "2px solid var(--inputBorder)",
              '&:hover': {
                  backgroundColor: 'var(--button)',
                  color: 'white'
              }
              }}
          >
            Clear Filter
          </Button>
          <div className="apply_filter_button">
            <FilledButton buttonText='Save Filter' onButtonClick={handleSaveClick}/>
          </div>
        </div>
        <br></br>
        <br></br>
      </List>
    </Drawer>
  );
};

export default SavedFilter