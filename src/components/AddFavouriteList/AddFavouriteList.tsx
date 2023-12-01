
import CancelIcon from '@mui/icons-material/Cancel';

import { Alert, AlertColor, Box, Modal, Snackbar } from '@mui/material';
import InputField from '../InputField/InputField';
import FilledButton from '../Button/FilledButton';
import { useState } from 'react';

import './AddFavouriteList.css';

  interface AddFavouriteListProps {
    status: boolean;
    addList: (listTitle: string) => void;
    closeModal: () => void;
  }

const AddFavouriteList: React.FC<AddFavouriteListProps> = ({ status, addList, closeModal }) => {
  const [newListTitle, setNewListTitle] = useState('');
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleTitleChange = (newTitle: string) => {
    setNewListTitle(newTitle);
  };
  
  const handleAddList = () => {
    const local = localStorage.getItem('loggedInUser');

    if (local) {
      const parsedLocal = JSON.parse(local);
      const newFavourites = { ...parsedLocal.favourites};
      if(newListTitle.length<1){
        setMessageSeverity("error")
        setMessageOpen(true)
        setMessage("Please Input a List Name")
      }else if (!newFavourites[newListTitle]) {
          newFavourites[newListTitle] = [];

          parsedLocal.favourites = newFavourites
          // Save the updated object back to localStorage
          localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
          handleClose();
          addList(newListTitle);
      }else{
          // category exists
          setMessageSeverity("error")
          setMessageOpen(true)
          setMessage("List already exists. Please use another list Name")
      }
    }
  } 
  const handleClose = () => {
    closeModal();
  }
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
              <CancelIcon sx={{marginRight: "1rem", color: 'var(--button)', cursor: 'pointer'}} fontSize="large" onClick={handleClose}/>
            </div>
            <div className='modal_content'>
                <div className='modal_title'>
                    <h1>Create List</h1>
                </div>
                <div className='modal_input'>
                    <InputField placeholder='Title' input={newListTitle} onInputChange={handleTitleChange} />
                </div>
                <div className='modal_bottom_bar'>
                    <FilledButton buttonText="Create List" onButtonClick={handleAddList} />
                </div>
                <Snackbar
                    open={messageOpen}
                    autoHideDuration={3000}
                    onClose={() => setMessageOpen(false)}
                    >
                    <Alert severity={messageSeverity} sx={{ width: "100%" }}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </Box>
    </Modal>
  );
};

export default AddFavouriteList