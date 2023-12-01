import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Chip, Divider, Rating, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';


import './RecipeStep.css';
import FilledButton from '../Button/FilledButton';


interface RecipeStepCardProp {
  number: number;
  totalNumber: number;
  step: string;
  img: string;
  currRating: number;
  recipeName: string;
  handleReviewSubmit: (newRating: number) => void;
}
const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
const RecipeStepCard: React.FC<RecipeStepCardProp> = ({ number, totalNumber, step, img, currRating, recipeName, handleReviewSubmit }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  useEffect(() => {
    setValue(currRating);
  }, [currRating]);

  const handleClick = () => {
    handleReviewSubmit(value? value: 0);
  }
  return(
    <div className='recipe-step-card'>
        {
          number<totalNumber?
          <Card sx={{ height: "40vh" }}>
          <CardMedia
            sx={{ height:"25vh", width: "100vw", objectFit: "contain"  }}
            image={img}
            title="step"
          />
            <CardContent sx={{border: "0px"}}>
              <Typography variant="h5" fontWeight={'bold'} noWrap color="var(--cardHeading)" fontFamily="var(--fontFamily)"
                  sx={{
                  '@media (max-width: 600px)': {
                      fontSize: '20px', // Adjust the font size for smaller screens
                  },
                  '@media (min-width: 601px) and (max-width: 1024px)': {
                      fontSize: '24px', // Adjust the font size for medium screens
                  },
                  '@media (min-width: 1025px)': {
                      fontSize: '30px', // Default font size for larger screens
                  },}}>Step #{number+1}:
              </Typography>
              <Typography variant="body1" color="var(--card)">
                {step}
              </Typography>
            </CardContent>
          </Card>
          :
          <Card sx={{ width: "100%", height: "50%" , padding: "1rem" }}>
            <Avatar
              alt="Remy Sharp"
              src="https://upload.wikimedia.org/wikipedia/donate/thumb/a/a4/Checkmark-blue.svg/341px-Checkmark-blue.svg.png?20170216175728"
              sx={{ width: 56, height: 56, margin: "auto", padding: "1rem" }}
            />
            <CardContent sx={{border: "0px"}}>
            <Typography variant="h5" fontWeight={'bold'} noWrap color="var(--cardHeading)" fontFamily="var(--fontFamily)"
                  sx={{
                  '@media (max-width: 600px)': {
                      fontSize: '20px', // Adjust the font size for smaller screens
                  },
                  '@media (min-width: 601px) and (max-width: 1024px)': {
                      fontSize: '24px', // Adjust the font size for medium screens
                  },
                  '@media (min-width: 1025px)': {
                      fontSize: '30px', // Default font size for larger screens
                  },}}>You are Finished!
              </Typography>
              <Typography variant="body1" color="var(--card)">
                Feel free to leave a review for this recipe!
              </Typography>
              <Box
                sx={{
                  width: '100%', // Adjust the width as needed
                  height: '20%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto'
                }}
              >
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {
                  hover === -1 && value === 0 ?
                    <Box sx={{ ml: 2 }}>&nbsp;</Box>
                    :<></>
                }
                {value !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </Box>
            </CardContent>
            {
              value !== currRating?
                currRating !== 0?
                  <FilledButton buttonText='Change Review' onButtonClick={handleClick}/>
                : <FilledButton buttonText='Submit Review' onButtonClick={handleClick}/>
              :
              <></>
            }
            <br></br>
            <br></br>
            <FilledButton buttonText='Go back to Recipe Overview' onButtonClick={()=>{navigate(`/recipe/${recipeName}`)}}/>
          </Card>
        }
    </div>
  );
};

export default RecipeStepCard