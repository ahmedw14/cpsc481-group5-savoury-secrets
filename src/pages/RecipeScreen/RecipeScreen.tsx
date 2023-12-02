import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertColor, Button, Divider, FormControl, InputLabel, List, ListItem, ListItemText, NativeSelect, Paper, Tab, Tabs } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';


import Recipes from '../../data/recipe_data.json';
import './RecipeScreen.css'
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import SaveRecipe from '../../components/SaveRecipe/SaveRecipe';
import CustomAlert from '../../components/Alert/CustomAlert';
import SearchBar from '../../components/SearchBar/SearchBar';
import SharePopOver from '../../components/SharePopOver/SharePopOver';

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

const RecipeScreen = () => {
  const navigate = useNavigate();
  const { recipeName } = useParams<{ recipeName: string }>();
  const [selectedRecipes, setSelectedRecipe] = useState<RecipeInfo>();
  const [openFavourite, setOpenFavourite] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openShareAnchor, setOpenShareAnchor] = useState<HTMLButtonElement | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [servingSize, setServingSize] = useState(1);

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleOpenFavourite = () => setOpenFavourite(true);
  const handleCloseFavourite = () => setOpenFavourite(false);

  const handleOpenShare = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenShareAnchor(event.currentTarget);
    setOpenShare(true)
  };
  const handleCloseShare = () => setOpenShare(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStartCooking = () => {
    navigate(`/cooking/${selectedRecipes?.name}/1`)
  };
  
  useEffect(() => {
    const currRecipe = Recipes.filter((recipe: RecipeInfo) => recipe.name === recipeName);
    setSelectedRecipe(currRecipe[0]);
  }, []);

  const handleBack = () => {
    const page = localStorage.getItem('access');
    if(page){
      const parsedLocal = JSON.parse(page);
      navigate(parsedLocal);
    }
    
  };
  
  const handleSave = () => {
    setMessage(`\'${recipeName}\' has been saved`);
    setMessageOpen(true);
    setMessageSeverity("success");
  };
  
  return (
    <div className="recipe_screen">
      <div className="top_layer">
        <Button variant="contained"
            onClick={handleBack}
            sx={{
            width: "20%",
            display: 'flex',
            height: '100%',
            backgroundColor: "var(--secondary)",
            color: "var(--buttonText)",
            minWidth: "100px",
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
          <Button variant="contained"
            onClick={handleOpenShare}
            sx={{
            width: "20%",
            display: 'flex',
            backgroundColor: "var(--secondary)",
            color: "var(--buttonText)",
            minWidth: "100px",
            borderRadius: "10px",
            border: "2px solid var(--inputBorder)",
            '&:hover': {
                backgroundColor: 'var(--button)',
                color: 'white'
            }
            }}
          >
                <ShareIcon />
                Share
          </Button>
            
          <Button variant="contained"
            onClick={handleOpenFavourite}
            sx={{
            width: "20%",
            display: 'flex',
            backgroundColor: "var(--secondary)",
            color: "var(--buttonText)",
            minWidth: "100px",
            borderRadius: "10px",
            border: "2px solid var(--inputBorder)",
            '&:hover': {
                backgroundColor: 'var(--button)',
                color: 'white'
            }
            }}
          >
                <FavoriteBorderIcon />
                Save
          </Button>
      </div>
      <div className='recipe_top_card'>
        {selectedRecipes?
          <RecipeCard title={selectedRecipes.name} img={selectedRecipes.image} time={selectedRecipes.time} avgReviews={selectedRecipes.avgReviews} allergies={selectedRecipes.allergies} isDeletable={false} onCardClick={(name: string)=>{}}/>
          :<></>
        }
      </div>
      <div className='recipe_middle_layer'>
        <FormControl 
          sx={{width: "45%",
              height: "80%",
              backgroundColor: "var(--button)", 
              border: "2px solid var(--inputBorder)",
              borderRadius: "10px",
              boxShadow: "2"
              }} >
          <InputLabel variant="standard" htmlFor="uncontrolled-native"  
          sx={{color: "var(--buttonText)", display:"flex", width:"130%",justifyContent:"center", height: "80%",alignItems:"center", fontSize:"20px", '&.Mui-focused':{color: "var(--buttonText)"}}}>
              Number of Servings
          </InputLabel>
          <NativeSelect
              disableUnderline
              sx={{color: "var(--buttonText)", justifyContent: "center", display: "flex", width: "fit-content", height:"100%", margin: "auto", fontSize:"20px"}}
              onChange={(event: React.ChangeEvent<{ value: unknown }>)=>setServingSize(event.target.value as number)}
              value={servingSize}
              inputProps={{
              name: 'serving size',
              id: 'uncontrolled-native',
              }}
          >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
          </NativeSelect>
        </FormControl>
          <Button className="start_cooking_button" variant="contained"
            onClick={handleStartCooking}
            sx={{
            width: "45%",
            height: "80%",
            backgroundColor: "var(--button)",
            color: "var(--buttonText)",
            minWidth: "120px",
            borderRadius: "10px",
            border: "2px solid var(--buttonText)",
            '&:hover': {
                backgroundColor: 'var(--buttonText)',
                color: 'white'
            }
            }}
            >
                Start Cooking
        </Button>
        
      </div>
      <div className="recipe_content">
        <Tabs value={tabValue} 
            onChange={handleTabChange} 
            TabIndicatorProps={{
            style: { display: 'none' }
            }}
            sx={{
            borderRadius: "50px", 
            backgroundColor: "transparent", 
            width: "80%", 
            maxHeight: "20%",
            border: "2px solid var(--inputBorder)", 
            margin: "1rem auto",
            color: "var(--inputText)"}}
            variant="fullWidth"
            >
            <Tab label="Ingredients" sx={{width: "100%",color: "var(--inputText)", margin: "auto", fontFamily: 'var(--fontFamily)', border: "0", borderRadius: "50px", '&.Mui-selected': {background: 'var(--inputText)', color: "white"}}}/>
            <Tab label="Directions" sx={{width: "100%",color: "var(--inputText)", margin: "auto", fontFamily: 'var(--fontFamily)', border: "0", borderRadius: "50px", '&.Mui-selected': {background: 'var(--inputText)', color: "white"}}}/>
        </Tabs>
        {tabValue==0?
          <div className="ingredients" key={"ingredients"}>
            <Paper style={{maxHeight: "100%", overflow: 'auto', boxShadow: "none" }}>
              <List
                sx={{
                    width: '80%',
                    margin: "auto",
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
                >
                {selectedRecipes?.ingredients?.map((ingredient, index)=>(
                    <div key={`ingredient-${index}`}>
                        <ListItem >
                            <ListItemText primary={(ingredient.amount.valueOf()*servingSize) + " " + ingredient.label} />
                        </ListItem>
                        <Divider light/>
                    </div>
                    ))}
              </List>
            </Paper>
          </div>
            : 
          <div className="directions"  key={"directions"}>
            <Paper style={{maxHeight: "100%", overflow: 'auto', boxShadow: "none" }}>
              <List
                  sx={{
                      width: '80%',
                      margin: "auto",
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                  >
                  {selectedRecipes?.steps.map((step, index)=>(
                    <div key={`step-${index}`}>
                      <ListItem>
                          <ListItemText key={index} primary={(index+1) + ") " +step} />
                      </ListItem>
                      <Divider light/>
                    </div>
                  ))}
              </List>
            </Paper>
          </div>
        }
      </div>
      {
        openFavourite?
          <SaveRecipe status={openFavourite} closeModal={handleCloseFavourite} savedRecipe={handleSave}/>:<></>
      }
      {
        openShare?
          <SharePopOver link={window.location.href} img={selectedRecipes?selectedRecipes.image: ''} status={openShare} anchor={openShareAnchor} onclose={handleCloseShare}/>: <></>
      }
      <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
    </div>
  );
};
export default RecipeScreen