import React from 'react';
import { Button } from '@mui/material'

interface IconButtonProps {
  buttonText: string;
  icon: React.ReactElement;
  onButtonClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ buttonText, icon: Icon, onButtonClick }) => {
  const handleClick = () => {
    onButtonClick();
  };
  return(
    <Button variant="contained"
    sx={{
      margin: "auto",
      width: "100%",
      height: "100%",
      backgroundColor: 'var(--button)',
      color: 'var(--buttonText)',
      borderRadius: "10px",
      fontSize: "18px",
      fontFamily: 'var(--fontFamily)',
      border: "2px solid var(--inputBorder)",
      '&:hover': {
        backgroundColor: 'var(--button)',
        color: 'white',
      }
    }}
    onClick={handleClick}
    >
      {Icon}
      {buttonText}
    </Button>
  );
};

export default IconButton