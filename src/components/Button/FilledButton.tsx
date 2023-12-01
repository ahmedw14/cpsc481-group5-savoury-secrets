
import { Button } from '@mui/material'

interface ButtonProps {
  buttonText: string;
  onButtonClick: () => void;
}

const FilledButton: React.FC<ButtonProps> = ({ buttonText, onButtonClick }) => {
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
      fontFamily: 'var(--fontFamily)',
      border: "2px solid var(--inputBorder)",
      '&:hover': {
        backgroundColor: 'var(--button)',
        color: 'white',
      }
    }}
    onClick={handleClick}
    >{buttonText}</Button>
  );
};

export default FilledButton