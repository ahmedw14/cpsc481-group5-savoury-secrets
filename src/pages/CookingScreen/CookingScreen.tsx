import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Recipes from '../../data/recipe_data.json';
import { AlertColor, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './CookingScreen.css'
import CookingNavbar from '../../components/CookingNavbar/CookingNavbar';
import RecipeStepCard from '../../components/RecipeStep/RecipeStep';
import Timer from '../../components/Timer/Timer';
import AllSteps from '../../components/AllSteps/AllSteps';
import CustomAlert from '../../components/Alert/CustomAlert';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';

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

const CookingScreen = () => {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const { recipeName, stepNumber } = useParams<{ recipeName: string; stepNumber: string }>();
  const [selectedRecipes, setSelectedRecipe] = useState<RecipeInfo>();
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);
  const [currStep, setCurrStep] = useState<number>();
  const [rating, setRating] = useState<number>(0);

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  useEffect(() => {
    SpeechRecognition.startListening({continuous: true});
    if (recipeName !== undefined && stepNumber) {

      const parsedStepNumber = parseInt(stepNumber, 10);
      setCurrStep(parsedStepNumber - 1);
      const currRecipe = Recipes.filter((recipe: RecipeInfo) => recipe.name === recipeName);
      setSelectedRecipe(currRecipe[0]);

      const local = localStorage.getItem('loggedInUser');
      if (local) {
          const parsedLocal = JSON.parse(local);
          if(recipeName in parsedLocal.reviewed){
            setRating(parsedLocal.reviewed[recipeName]);
          }
      }
    }
    if(!browserSupportsSpeechRecognition){
      setMessage(`Speech Recognition is not supported on this browser.`);
      setMessageOpen(true);
      setMessageSeverity("warning");
    }else{
      setMessage(`Speech Recognition is activated.`);
      setMessageOpen(true);
      setMessageSeverity("warning");
    }
    
  }, []);


  useEffect(() => {
    console.log({listening})
    console.log({transcript})
    if (transcript.toLowerCase().includes('next step')) {
      stepClick(currStep?(currStep+1):1);
      console.log("next step detected");
    }else if (transcript.toLowerCase().includes('previous step')) {
      stepClick(currStep?(currStep-1):1);
      console.log("next step detected");
    }if (transcript.toLowerCase().includes('stop cooking')) {
      console.log("help me")
    }

  }, [transcript, listening])

  const handleReviewSubmit = (value: number) => {
    const local = localStorage.getItem('loggedInUser');
      if (local) {
          const parsedLocal = JSON.parse(local);
          if (recipeName !== undefined){
            if(parsedLocal.reviewed[recipeName]){
              setMessage("Review Rating has been changed");
              setMessageOpen(true);
              setMessageSeverity("success");          
            }else{
              setMessage("Review Rating has been submitted");
              setMessageOpen(true);
              setMessageSeverity("success");   
            }
            parsedLocal.reviewed[recipeName] = value;
            setRating(value);
            localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
            console.log(value)
          }
          
      }
  };

  const stepClick = (index: number) => {
    if(selectedRecipes){
      if(selectedRecipes.steps.length < index){
        setMessage(`No more steps`);
        setMessageOpen(true);
        setMessageSeverity("error");
        return;
      }
    }
    setCurrStep(index);
    resetTranscript();
  };

  const handleChangeStep = (index: number) => {
    if(selectedRecipes){
      if(selectedRecipes.steps.length < index){
        setMessage(`No more steps`);
        setMessageOpen(true);
        setMessageSeverity("error");
        return;
      }
    }
    setCurrStep(index);
    resetTranscript();
  } 
  const disableSpeech = () => {
    SpeechRecognition.stopListening();
    setMessage(`Speech recognition is stopped`);
    setMessageOpen(true);
    setMessageSeverity("warning");
  }

  const enableSpeech = () => {
    SpeechRecognition.startListening({continuous: true});
    setMessage(`Speech recognition resumed`);
    setMessageOpen(true);
    setMessageSeverity("warning");
  }

  return (
    <div className='cooking_screen'>
      <div className='cooking_content'>
        <div className='title'>
          <Typography variant="h5" fontWeight={'bold'} 
            sx={{
              '@media (max-width: 600px)': {
                fontSize: '20px', // Adjust the font size for smaller screens
              },
              '@media (min-width: 601px) and (max-width: 1024px)': {
                fontSize: '24px', // Adjust the font size for medium screens
              },
              '@media (min-width: 1025px)': {
                fontSize: '36px', // Default font size for larger screens
              },}}>{recipeName}
          </Typography>
          <div className='all_steps_button'>
          <Button variant="contained"
              onClick={()=>setShowAllSteps(true)}
              sx={{
              width: "100%",
              display: 'flex',
              backgroundColor: "var(--secondary)",
              color: "var(--buttonText)",
              minWidth: "130px",
              borderRadius: "10px",
              border: "2px solid var(--inputBorder)",
              fontSize: "12px",
              '&:hover': {
                  backgroundColor: 'var(--button)',
                  color: 'white'
              }
              }}
              >
                  <FormatListNumberedIcon />
                  All Steps
            </Button>
            {
              listening?
              <Button variant="contained"
                onClick={()=>disableSpeech()}
                sx={{
                width: "100%",
                display: 'flex',
                backgroundColor: "var(--secondary)",
                color: "red",
                minWidth: "130px",
                borderRadius: "10px",
                marginTop: "1rem",
                border: "2px solid var(--inputBorder)",
                fontSize: "12px",
                '&:hover': {
                    backgroundColor: 'var(--button)',
                    color: 'white'
                }
                }}
                >
                  <MicOffIcon />
                  Disable Mic
              </Button>:
              <Button variant="contained"
                onClick={()=>enableSpeech()}
                sx={{
                width: "100%",
                display: 'flex',
                backgroundColor: "var(--secondary)",
                color: "var(--buttonText)",
                minWidth: "130px",
                borderRadius: "10px",
                marginTop: "1rem",
                border: "2px solid var(--inputBorder)",
                fontSize: "12px",
                '&:hover': {
                    backgroundColor: 'var(--button)',
                    color: 'white'
                }
                }}
                >
                  <MicIcon />
                  Enable Mic
              </Button>
            }
        </div>
        </div>
       
        <Stepper activeStep={currStep} alternativeLabel >
          {selectedRecipes?.steps.map((label, index) => (
            <Step key={label} onClick={()=>stepClick(index)}
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'var(--cardBackground)', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'var(--cardBackground)', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'var(--cardBackground)', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'var(--cardBackground)', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'black', // circle's number (ACTIVE)
              },
              "& .Mui-disabled .MuiStepIcon-root": { color: "var(--navBar)" },
              '& .MuiStepLabel-label.Mui-disabled.MuiStepLabel-alternativeLabel':
                {
                  color: 'var(--cardBackground)', // Just text label (ACTIVE)
                },
            }}>
              <StepLabel>{`Step #${index+1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className='step'>
          <RecipeStepCard  
            number={currStep? currStep: 0} 
            totalNumber={selectedRecipes? selectedRecipes.steps.length: 0} 
            step={selectedRecipes? selectedRecipes.steps[currStep? currStep: 0]: ''} 
            img={selectedRecipes? selectedRecipes.stepImg[currStep?currStep: 0]: ''}
            currRating = {rating}
            recipeName={recipeName? recipeName: ''}
            handleReviewSubmit={handleReviewSubmit}/>
            {(selectedRecipes) ?
              currStep !== selectedRecipes.steps.length?
                <Timer />
              : <></>
              :<></>
            }
        </div>
        <div className='allSteps'>
        <AllSteps state={showAllSteps} steps={selectedRecipes? selectedRecipes.steps: []} toggleAllSteps={()=>setShowAllSteps(false)}/>
        </div>
      </div>
      <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
      <CookingNavbar recipeName={recipeName? recipeName: ''} step={currStep? currStep: 0} totalSteps={selectedRecipes? selectedRecipes.steps.length: 0} setStep={handleChangeStep}/>
    </div>
  );
}

export default CookingScreen