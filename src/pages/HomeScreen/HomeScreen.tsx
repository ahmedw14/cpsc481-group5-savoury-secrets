import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import './HomeScreen.css';

import Recipes from '../../data/recipe_data.json';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import NoResultsFoundCard from '../../components/NoResultsFoundCard/NoResultsFoundCard';
import { AlertColor, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Navbar from '../../components/Navbar/Navbar';
import Filter from '../../components/Filter/Filter';
import CustomAlert from '../../components/Alert/CustomAlert';


interface RecipeInfo {
  name: string;
  time: number;
  mealType: string;
  allergies: string[];
  ingredients: {
    amount: Number;
    label: string;
  }[];
  steps: string[];
  stepImg: string[];
  numberOfReviews: number;
  avgReviews: number;
  image: string;
}
const allergies = ['Vegan', 'Vegetarian', 'Halal', 'Nut Free', 'Gluten Free', 'Dairy Free'];
const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  
  const [allergyFilter, setAllergyFilter] = useState<string[]>([]);
  const [allergyFilterIndices, setAllergyFilterIndices] = useState<number[]>([]);
  const [maxTimeFilter, setMaxTimeFilter] = useState<number>(100);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(1);

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  
  var filteredRecipes = Recipes
                          .filter((recipe: RecipeInfo) => recipe.name.toLowerCase().includes(searchText))
                          .filter((recipe: RecipeInfo) => recipe.time<=maxTimeFilter)
                          .filter((recipe: RecipeInfo) => recipe.avgReviews>=minRatingFilter)
                          .filter((recipe: RecipeInfo) => allergyFilter.every(item => recipe.allergies.includes(item)));
  const [filterState, setFilterState] = useState<boolean>(false)

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  const handleRecipeClick = (selectedRecipe: string) => {
    localStorage.setItem('access', JSON.stringify(location.pathname));
    navigate(`/recipe/${selectedRecipe}`)
  };

  const openFilter = () => {
    setFilterState(true);
  };

  const handleSaveFilter = (checkedList: string[], maxTime: number, minRating: number) => {
    setAllergyFilter(checkedList);
    setMaxTimeFilter(maxTime);
    setMinRatingFilter(minRating);
    setFilterState(false);

    setMessage("Filter has been applied");
    setMessageOpen(true);
    setMessageSeverity("success");
  };

  useEffect(() => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
      const parsedLocal = JSON.parse(local);
      if(allergyFilter.length == 0){
        setAllergyFilter(parsedLocal.allergies);
        
        const matchingIndices: number[] = allergies.reduce((indices: number[], element: string, index: number) => {
        if (parsedLocal.allergies.includes(element)) {
          indices.push(index);
        }
          return indices;
        }, []);
        console.log(matchingIndices);
        setAllergyFilterIndices(matchingIndices);
      }
    }
  }, []);
  
  return (
    <div className="home_screen">
        <div className="top_bar">
            <div className="home_search_bar">
              <SearchBar searchText={searchText} placeholder='Search for recipe' onSearchTextChange={handleSearchChange}/>
            </div>
            <Button variant="contained" onClick={openFilter}
                sx={{
                width: "20%",
                display: 'flex',
                backgroundColor: "var(--secondary)",
                color: "var(--buttonText)",
                minWidth: "80px",
                borderRadius: "10px",
                border: "2px solid var(--inputBorder)",
                '&:hover': {
                    backgroundColor: 'var(--button)',
                    color: 'white'
                }
                }}
                >
                    <TuneIcon />
                    Filter
              </Button>
        </div>
        <div className='home_content'>
            <h2>Recipes</h2>
            <div className='home_recipes'>
              {filteredRecipes.length > 0 ? 
                (
                  filteredRecipes.map((recipe: RecipeInfo)=>(
                    <RecipeCard key={recipe.name} title={recipe.name} img={recipe.image} time={recipe.time} avgReviews={recipe.avgReviews} allergies={recipe.allergies} isDeletable={false} onCardClick={handleRecipeClick}/>
                  ))
                ):
                  <NoResultsFoundCard />
              }
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
        <Filter state={filterState} currFilter={allergyFilter} currIndices={allergyFilterIndices} toggleFilter={()=>setFilterState(false)} onSaveChangesClick={handleSaveFilter} />
        <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
        <Navbar active={'home'} />
    </div>
  );
};

export default HomeScreen;