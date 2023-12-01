
import { Button, Checkbox, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material'
import FilledButton from '../Button/FilledButton';
import { useEffect, useState } from 'react';

import './Filter.css'

interface FilterProps {
  currFilter: string[];
  currIndices: number[];
  state: boolean;
  toggleFilter: () => void;
  onSaveChangesClick: (checkedList: string[], maxTime: number, minRating: number) => void;
}

const Filter: React.FC<FilterProps> = ({ currFilter, currIndices, state, toggleFilter, onSaveChangesClick }) => {
  const RatingMarks = [
    {
      value: 1,
      label: '1+',
    },
    {
      value: 1.5,
      label: '1.5+',
    },
    {
      value: 2,
      label: '2+',
    },
    {
      value: 2.5,
      label: '2.5+',
    },
    {
      value: 3,
      label: '3+',
    },
    {
      value: 3.5,
      label: '3.5+',
    },
    {
      value: 4,
      label: '4+',
    },
    {
      value: 4.5,
      label: '4.5+',
    },
    {
      value: 5,
      label: '5',
    }
  ];
  const allergies = ['Vegan', 'Vegetarian', 'Halal', 'Nut Free', 'Gluten Free', 'Dairy Free'];
  const [checked, setChecked] = useState<number[]>(currIndices);

  const [ratingFilter, setRatingFilter] = useState<number>(1);
  const [timeFilter, setTimeFilter] = useState<number>(100);

  const handleSaveClick = () => {
    const checkedList = checked.map(check => allergies[check]);
    onSaveChangesClick(checkedList, timeFilter, ratingFilter);
  };
  useEffect(() => {
    setChecked(currIndices);
  }, [currIndices]);

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
    const matchingIndices: number[] = allergies.reduce((indices: number[], element: string, index: number) => {
      if (currFilter.includes(element)) {
        indices.push(index);
      }
      return indices;
    }, []);
    setChecked(matchingIndices)
    toggleFilter();
  };
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
    newChecked.push(value);
    } else {
    newChecked.splice(currentIndex, 1);
    }
    
    setChecked(newChecked);
    
  };

  const handlClearFilter = () => {
    setRatingFilter(1);
    setTimeFilter(100);
    setChecked([]);
    onSaveChangesClick([], 100, 1);
  }
  return(
    <Drawer
      anchor={'bottom'}
      open={state}
      onClose={toggleDrawer(false)}
    >
      <List sx={{width: "85%", margin: "auto", color: "var(--cardHeading)"}}>
        <Typography variant='h5'>Dietary</Typography>
        {allergies.map((allergy, index)=>{
          return(
            <ListItem onClick={handleToggle(index)}  disablePadding>
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
        <Typography variant='h5'>Maximum Time (in minutes)</Typography>
        <ListItem disablePadding>
          <Slider
            marks
            max={100}
            step={10}
            min={10}
            value={timeFilter}
            valueLabelDisplay="auto"
            onChange={(e, value) => setTimeFilter(Number(value))}
            sx={{
              color: "var(--background)",
              '& .MuiSlider-track': {
                  color: "var(--background)"
              },
              '& .MuiSlider-rail': {
                  backgroundColor: "gray",
                  borderColor: "gray",
              },
              '& .MuiSlider-valueLabel': {
                opacity: 1,
                backgroundColor: 'black',
              }
            }}
          />
        </ListItem>
        <div>
        <Typography variant='h5'>Minimum Star Rating</Typography>
          <ListItem disablePadding>
            <Slider
              marks={RatingMarks}
              track="inverted"
              onChange={(e, value) => setRatingFilter(Number(value))}
              value={ratingFilter}
              max={5}
              min={1}
              step={0.5}
              valueLabelDisplay="auto"
              sx={{
                color: "var(--background)",
                '& .MuiSlider-track': {
                  backgroundColor: "lightGray",
                  borderColor: "lightGray",
                },
                '& .MuiSlider-rail': {
                    backgroundColor: "var(--background)"
                },
                '& .MuiSlider-valueLabel': {
                  opacity: 1,
                  backgroundColor: 'black',
                }
                }}
            />
          </ListItem>
          <br></br>
        </div>
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
            <FilledButton buttonText='Apply Filter' onButtonClick={handleSaveClick}/>
          </div>
        </div>
        <br></br>
        <br></br>
      </List>
    </Drawer>
  );
};

export default Filter