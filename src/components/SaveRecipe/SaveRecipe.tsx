import { AlertColor, Box, Checkbox, InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import FilledButton from "../Button/FilledButton";
import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


import './SaveRecipe.css'
import CustomAlert from "../Alert/CustomAlert";

interface SaveRecipeProps {
  status: boolean;
  closeModal: () => void;
  savedRecipe: () => void;
}
interface userFavourites {
  [category: string]: string[];
}

const SaveRecipe: React.FC<SaveRecipeProps> = ({ status, closeModal, savedRecipe }) => {
  const { recipeName } = useParams<{ recipeName: string }>();
  const [checked, setChecked] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [userFavouritesList, setUserFavouritesList] = useState<userFavourites>();

  const handleClose = () => {
    closeModal();
  }
  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleToggle = (selectedList: string) => {
    const currentIndex = checked.indexOf(selectedList);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(selectedList);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSaveRecipe = () => {
    const updatedFavourites = { ...userFavouritesList };

    for (const category in updatedFavourites) {
      updatedFavourites[category] = updatedFavourites[category].filter(
          (name:string) => name !== recipeName
      );
    }
    if(recipeName){
      checked.forEach(category => {
        if (!updatedFavourites[category].includes(recipeName)) {
          updatedFavourites[category].push(recipeName);
        }
      });
    }

    setUserFavouritesList(updatedFavourites);

    const local = localStorage.getItem('loggedInUser');
    if (local) {
          // Parse the JSON string into an object
          const parsedLocal = JSON.parse(local);

          parsedLocal.favourites = updatedFavourites
          localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
      }
    handleClose();
    savedRecipe();
  };

  useEffect(() => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
        const parsedLocal = JSON.parse(local);
        setUserFavouritesList(parsedLocal.favourites);
        const newChecked = Object.keys(parsedLocal.favourites).filter(category =>
            parsedLocal.favourites[category].includes(recipeName)
          );
        setChecked(newChecked);
        console.log(newChecked)
    }
  }, []);

  var filteredList = userFavouritesList?Object.keys(userFavouritesList).filter((category) => (category.toLowerCase().includes(searchText))): [];
  
  return(
    <Modal
        open={status}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"85%", height:"85%", margin: "auto"}}
    >
        <Box sx={{ backgroundColor: "var(--cardBackground)",
            border: "2px solid var(--stroke)",
            borderRadius: "20px",
            position: "absolute",
            width: "100%",
            height: "100%",
            margin: "auto",
            outline: "none"
        }}>
            <div className='modal_top_bar'>
                <CancelIcon sx={{color: "var(--button)"}} fontSize="large" onClick={handleClose}/>
            </div>
            <div className='modal_content'>
                <div className='modal_title'>
                    <h1>Select List</h1>
                </div>
                <SearchBar searchText = {searchText} placeholder='Search for favourite list' onSearchTextChange={handleSearchChange}/>
                <div className='modal_input_list'>
                    {filteredList.map((list)=>{
                        return(
                        <ListItem
                            key={list}
                            disablePadding
                        >
                        <ListItemButton role={undefined} dense onClick={()=>handleToggle(list)}>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(list) !== -1}
                                tabIndex={-1}
                                disableRipple
                                sx={{color: "var(--background)", '&.Mui-checked': {color: 'var(--background)'}}}
                                />
                            </ListItemIcon>
                            <ListItemText primary={list} sx={{color: "black"}}/>
                        </ListItemButton>
                    </ListItem>)
                    })}
                </div>
                <div className='modal_bottom_bar'>
                    <FilledButton buttonText="Save" onButtonClick={handleSaveRecipe}/>
                </div>
            </div>
        </Box>
    </Modal>
  );
};
export default SaveRecipe;