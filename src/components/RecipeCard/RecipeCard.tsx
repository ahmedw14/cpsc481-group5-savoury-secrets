import React from 'react';
import { Chip, Divider, Rating, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';


import './RecipeCard.css';


interface RecipeCardProp {
  title: string;
  img: string;
  avgReviews: number;
  time: number;
  allergies: string[];
  isDeletable: boolean;
  onDelete?: (event: React.MouseEvent<HTMLImageElement>, recipeTitle: string) => void;
  onCardClick: (recipeTitle: string) => void;
}

const RecipeCard: React.FC<RecipeCardProp> = ({ title, img, avgReviews, time, allergies, isDeletable, onDelete = () => {}, onCardClick }) => {
  const handleRecipeClick = (recipeTitle: string) => {
    onCardClick(recipeTitle);
  };

  const handleDelete = (event: React.MouseEvent<HTMLImageElement>, recipeTitle: string) => {
    onDelete(event, recipeTitle);
  };
  return(
    <div className='recipe-card' onClick={()=>handleRecipeClick(title)}>
      <div className='recipe-img'>
        <img src={img}/>
      </div>
      <div className='recipe-content'>
        <Typography variant="h6" fontWeight={'bold'} noWrap 
          sx={{
            '@media (max-width: 600px)': {
              fontSize: '16px', // Adjust the font size for smaller screens
            },
            '@media (min-width: 601px) and (max-width: 1024px)': {
              fontSize: '20px', // Adjust the font size for medium screens
            },
            '@media (min-width: 1025px)': {
              fontSize: '24px', // Default font size for larger screens
            },}}
        >
          {title}  
        </Typography>
        <Stack direction='row' spacing={0} sx={{ overflow: "auto", gap: 1, width: "90%", display: 'flex', flexWrap: 'wrap'}}>
          {isDeletable?
            allergies.map((allergy) => {
              return(
                <Chip
                  key={allergy}
                  color="info"
                  label={allergy}
                  sx={{
                    width: "fit-content",
                  }}
                />
              )
            })
          :
            allergies.map((allergy) => {
              return(
                <Chip
                  key={allergy}
                  color="info"
                  label={allergy}
                  sx={{
                    width: "fit-content",
                  }}
                />
              )
            })
          }
        </Stack>
        <div className='card_recipe_time'>
          <AccessTimeIcon sx={{height: "100%"}}/>
          &nbsp;&nbsp;{time + " minutes"}
        </div>
        
        <div className='card_recipe_rating'>
          <Rating name="half-rating-read-recipe" value={avgReviews} precision={0.5} readOnly size='small' />
          <p>&nbsp;&#8729;&nbsp;{avgReviews}</p>
        </div>
        {isDeletable && (
          <>
            <div className='remove-recipe' onClick={(e: any)=>handleDelete(e, title)}>
              <Chip
                label="Remove From List"
                icon={<DeleteIcon />}
                variant="outlined"
                color='error'
                sx={{width:'100%'}}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeCard