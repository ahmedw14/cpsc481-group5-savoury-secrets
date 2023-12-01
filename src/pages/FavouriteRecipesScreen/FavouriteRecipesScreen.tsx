import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import { AlertColor, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoResultsFoundCard from '../../components/NoResultsFoundCard/NoResultsFoundCard';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import Filter from '../../components/Filter/Filter';
import Navbar from '../../components/Navbar/Navbar';

import Recipes from '../../data/recipe_data.json';
import './FavouriteRecipesScreen.css'
import Confirmation from '../../components/Confirmation/Confirmation';
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

const FavouriteRecipesScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { listName } = useParams<{ listName: string }>();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');
  const [deleteRecipeName, setDeleteRecipeName] = useState('')
  
  const [searchText, setSearchText] = useState('');
  const [filterState, setFilterState] = useState<boolean>(false);
  const [filteredRecipes, setFilterRecipes] = useState<RecipeInfo[]>([]);

  const [allergyFilter, setAllergyFilter] = useState<string[]>([]);
  const [allergyFilterIndices, setAllergyFilterIndices] = useState<number[]>([]);
  const [maxTimeFilter, setMaxTimeFilter] = useState<number>(100);
  const [minRatingFilter, setMinRatingFilter] = useState<number>(1);

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  
  const openFilter = () => {
    setFilterState(true);
  };

  const handleBack = () => {
    navigate(`/favourites/`);
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

  const handleRecipeClick = (recipeName: string) => {
    localStorage.setItem('access', JSON.stringify(location.pathname));
    navigate(`/recipe/${recipeName}`)
  };

  const handleConfirmRemoveRecipe = () => {
    const uniqueRecipeNames = (filteredRecipes.map((recipe: RecipeInfo) => recipe.name));
    var newRecipes = uniqueRecipeNames.filter((recipe: string) => recipe !== deleteRecipeName);
  
    const local = localStorage.getItem('loggedInUser');

    if (local) {
      const parsedLocal = JSON.parse(local);
      const updatedFavourites = { ...parsedLocal.favourites };
  
      if (listName && updatedFavourites[listName]) {
        // Create a new object for newFavourites
        const newFavourites = { [listName]: newRecipes };
        delete updatedFavourites[listName]
  
        // Merge the existing favourites with the new favourites
        const newFavouriteList = { ...updatedFavourites, ...newFavourites };
  
        parsedLocal.favourites = newFavouriteList;
        localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
        setFilterRecipes(filteredRecipes.filter((recipe: RecipeInfo) => recipe.name !== deleteRecipeName));
      }
    }
    setOpenConfirm(false);
    setMessage(`Recipe \'${deleteRecipeName}\' has been removed from \'${listName}\'`);
    setMessageOpen(true);
    setMessageSeverity("success");

  }
  const handleRemoveRecipe = (event: React.MouseEvent<HTMLImageElement>, recipeName: string) => {
    (event as React.MouseEvent).stopPropagation();
    setConfirmationText(`Are you sure you want to remove \'${recipeName}\' from the \'${listName}\' list?`);
    setDeleteRecipeName(recipeName);
    setOpenConfirm(true);
  }


  useEffect(() => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
        const parsedLocal = JSON.parse(local);
        const favoriteRecipes = listName? parsedLocal.favourites[listName] : [];
        console.log(favoriteRecipes);
        var selectedRecipes = Recipes.filter((recipe: RecipeInfo) => favoriteRecipes.includes(recipe.name));
        setFilterRecipes(selectedRecipes);

        if(allergyFilter.length == 0){
          setAllergyFilter(parsedLocal.allergies);

          const matchingIndices: number[] = allergies.reduce((indices: number[], element: string, index: number) => {
            if (parsedLocal.allergies.includes(element)) {
              indices.push(index);
            }
              return indices;
            }, []);
            setAllergyFilterIndices(matchingIndices);
        }

    }
  }, []);

  var searchedRecipes = filteredRecipes
                          .filter((recipe: RecipeInfo) => recipe.name.toLowerCase().includes(searchText))
                          .filter((recipe: RecipeInfo) => recipe.time<=maxTimeFilter)
                          .filter((recipe: RecipeInfo) => recipe.avgReviews>=minRatingFilter)
                          .filter((recipe: RecipeInfo) => allergyFilter.every(item => recipe.allergies.includes(item)));
  
  return (
    <div className="home_screen">
        <div className="top_bar">
          <Button variant="contained"
            onClick={handleBack}
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
                <ArrowBackIcon />
                Back
          </Button>
          <div className="favourite_search_bar">
            <SearchBar searchText={searchText} placeholder='Search for favourite recipe' onSearchTextChange={handleSearchChange}/>
          </div>
          <Button variant="contained"
            onClick={openFilter}
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
            <h2>{listName}</h2>
            <div className='home_recipes'>
              {searchedRecipes.length > 0 ? 
                (
                  searchedRecipes.map((recipe: RecipeInfo)=>(
                    <RecipeCard title={recipe.name} img={recipe.image} time={recipe.time} avgReviews={recipe.avgReviews} allergies={recipe.allergies} isDeletable={true} onDelete={handleRemoveRecipe} onCardClick={handleRecipeClick}/>
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
        {openConfirm?
          <Confirmation status={openConfirm} text={confirmationText} handleConfirmClick={handleConfirmRemoveRecipe} closeModal={()=>{setOpenConfirm(false)}}/>
        :
          <></>
        }
        <Filter state={filterState} currFilter={allergyFilter} currIndices={allergyFilterIndices} toggleFilter={()=>setFilterState(false)} onSaveChangesClick={handleSaveFilter} />
        <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
        <Navbar active={"favourites"}/>
    </div>
  );
};
export default FavouriteRecipesScreen