import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  active: String;
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  const navigate = useNavigate();
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
          value={active}
          sx={{
            borderRadius: "50px",
            backgroundColor: "var(--button)"
          }}
        >
          <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}}} label="Favourites" value="favourites" onClick={()=>navigate(`/favourites`)} icon={<FavoriteIcon />} />
          <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}}} label="All Recipes" value="home" onClick={()=>navigate(`/home`)} icon={<FoodBankIcon />} />
          <BottomNavigationAction sx={{'&.Mui-selected': {color: "var(--navBar)"}}} label="Account" value="account" onClick={()=>navigate(`/account`)} icon={<PersonIcon />} />
        </BottomNavigation>
      </Box>
    </div>
  )
};

export default Navbar;
