import React, { useState } from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Confirmation from "../Confirmation/Confirmation";
import { useNavigate } from "react-router-dom";

interface CookingNavbarProps {
  recipeName: string;
  step: number;
  totalSteps: number;
  setStep: (step: number) => void;
}

const CookingNavbar: React.FC<CookingNavbarProps> = ({ recipeName, step, totalSteps, setStep }) => {
  const prevStep = step - 1;
  const nextStep = step + 1;
  const navigate = useNavigate()

  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const handleConfirmDelete = () => {
    navigate(`/recipe/${recipeName}`);
  }

  const handleStopCooking = () => {
    setConfirmationText(`Are you sure you want to stop cooking?`);
    setOpenConfirm(true);
  }

  const changeStep = (newStep: number) => {
    setStep(newStep);
  }
  return(
    <div className='main_navbar'>
      <Box 
      sx={{ 
        width: "90%",
        left: "0",
        right: "0",
        margin: "auto",
        position: "absolute",
        bottom: "5%",
        WebkitBoxShadow: "0px 11px 30px 5px var(--background)",
        boxShadow: "0px 11px 30px 5px var(--background)",
        WebkitBorderRadius: "50px"
      }}>
        <BottomNavigation
          showLabels
          sx={{
            borderRadius: "50px",
            backgroundColor: "var(--button)"
          }}
        >
          {
            step === 0?
              <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"},  pointerEvents: "none"}} label="Previous Step" value="Previous Step" icon={<ArrowBackIcon />} />
            :
              <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}, color: "var(--navBar)"}} label="Previous Step" onClick={()=>changeStep(prevStep)} value="Previous Step" icon={<ArrowBackIcon />} />
          }
          <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}, color: "red"}} label="Stop Cooking" onClick={handleStopCooking} value="Stop Cooking" icon={<NotInterestedIcon />} />
          {
            step === totalSteps-1?
              <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}, color: "var(--navBar)"}} label="Finish Cooking" onClick={()=>changeStep(nextStep)} value="Finish Cooking" icon={<ArrowForwardIcon />} />
            :
            step === totalSteps?
            <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"},  pointerEvents: "none"}} label="Next Step" value="Next Step" icon={<ArrowForwardIcon />} />
            :
              <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}, color: "var(--navBar)"}} label="Next Step" onClick={()=>changeStep(nextStep)} value="Next Step" icon={<ArrowForwardIcon />} />
          }
          
        </BottomNavigation>
      </Box>
      {openConfirm?
          <Confirmation status={openConfirm} text={confirmationText} handleConfirmClick={handleConfirmDelete} closeModal={()=>{setOpenConfirm(false)}}/>
        :
          <></>
        }
    </div>
  )
};

export default CookingNavbar;
