
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import './FavouriteList.css'
import { Box, Chip, Divider, Modal } from '@mui/material';
import InputField from '../InputField/InputField';
import FilledButton from '../Button/FilledButton';
import { useState } from 'react';

interface FavouriteListProps {
  list: string[];
  onFavouriteListClick: (selectedList: string) => void;
  onFavouriteListDelete: (selectedList: string) => void;
  onSaveList: (oldTitle: string, newTitle: string) => void;
}

const FavouriteList: React.FC<FavouriteListProps> = ({ list, onFavouriteListClick,  onFavouriteListDelete, onSaveList}) => {
  const [oldListTitle, setOldListTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  const [editModal, setEditModal] = useState<boolean>(false)

  const handleOpenEdit = () => setEditModal(true);
  const handleCloseEdit = () => setEditModal(false);

  const handleListClick = (list: string) => {
    onFavouriteListClick(list);
  };
  const handleDeleteList = (event: React.MouseEvent<HTMLDivElement>, listName: string) => {
    event.stopPropagation();
    onFavouriteListDelete(listName);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLDivElement>, listName: string) => {
    event.stopPropagation();
    setOldListTitle(listName);
    setNewTitle(listName);
    handleOpenEdit();
  };

  const handleSaveList = () => {
    handleCloseEdit();
    onSaveList(oldListTitle, newTitle);
  };

  const handleNewTitleChange = (newValue: string) => {
    setNewTitle(newValue);
  };
  return(
    <div>
      {list
        .map((listName) => (
          <div className='favourite_list_card' key={listName} onClick={() => handleListClick(listName)}>
            <h2>{listName}</h2>
            <div className='action_items'>
              <div className='edit' onClick={(e)=>handleEditClick(e, listName)}>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  variant="outlined"
                  color='info'
                  sx={{width:'100%'}}
                />
              </div>
              <div className='delete' onClick={(e)=>handleDeleteList(e, listName)}>
              <Chip
                label="Delete"
                icon={<DeleteIcon />}
                variant="outlined"
                color='error'
                sx={{width:'100%'}}
              />
              </div>
            </div>
          </div>
        ))}
        <Modal
          open={editModal}
          onClose={handleCloseEdit}
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
                <CancelIcon sx={{marginRight: "1rem", color: 'var(--button)', cursor: 'pointer'}} fontSize="large" onClick={handleCloseEdit}/>
              </div>
              <div className='modal_content'>
                  <div className='modal_title'>
                      <h1>Edit List</h1>
                  </div>
                  <div className='modal_input'>
                      <InputField placeholder='Title' input={newTitle} onInputChange={handleNewTitleChange} />
                  </div>
                  <div className='modal_bottom_bar'>
                      <FilledButton buttonText="Save Changes" onButtonClick={handleSaveList} />
                  </div>
                  
              </div>
            </Box>
         </Modal>
    </div>
  );
};

export default FavouriteList