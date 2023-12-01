import React, { useEffect, useState } from 'react';
import { Box, Button, Modal } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import InputField from '../InputField/InputField';
import FilledButton from '../Button/FilledButton';

interface EditAccountInfoProps {
  status: boolean;
  name: string;
  email: string;
  toggleModal: (state: boolean) => void;
  onSaveChanges: (newName: string, newEmail: string) => void;
}

const EditAccountInfo: React.FC<EditAccountInfoProps> = ({ status, name, email, toggleModal, onSaveChanges }) => {
  const [currName, setCurrName] = useState<string>(name);
  const [currEmail, setCurrEmail] = useState<string>(email);

  useEffect(() => {
    setCurrName(name);
    setCurrEmail(email)
  }, [name || email]);

  const handleEmailChange = (newEmail: string) => {
    setCurrEmail(newEmail);
  };
  const handleNameChange = (newName: string) => {
    setCurrName(newName);
  };
  const handleSaveInfo = () => {
    onSaveChanges(currName, currEmail);
  }
  const handleClose = () => {
    setCurrEmail(email);
    setCurrName(name);
    toggleModal(false);
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
                  <h1>Edit Info</h1>
              </div>
              <div className='modal_input'>
                  <InputField placeholder='Name' input={currName} onInputChange={handleNameChange} />
              </div>
              <div className='modal_input'>
                  <InputField placeholder='Email' input={currEmail} onInputChange={handleEmailChange} />
              </div>
              <div className='modal_bottom_bar'>
                  <FilledButton buttonText="Save Changes" onButtonClick={handleSaveInfo} />
              </div>
              
          </div>
        </Box>
      </Modal>
  );
};

export default EditAccountInfo