
import CancelIcon from '@mui/icons-material/Cancel';

import { Box, Button, Modal, Typography } from '@mui/material';
import FilledButton from '../Button/FilledButton';

  interface ConfirmationProps {
    status: boolean;
    text: String;
    handleConfirmClick: () => void;
    closeModal: () => void;
  }

const Confirmation: React.FC<ConfirmationProps> = ({ status, text, handleConfirmClick, closeModal }) => {
  
  const handleClose = () => {
    closeModal();
  }
  return(
    <Modal
        open={status}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{width:"50%", height:"50%", margin: "auto"}}
    >
        <Box sx={{ backgroundColor: "var(--cardBackground)",
            border: "2px solid var(--stroke)",
            borderRadius: "20px",
            position: "absolute",
            width: "100%",
            margin: "auto",
            outline: "none",
            padding: "1rem",
        }}>
            <div className='modal_content'>
              <Typography variant="h5" color="var(--cardHeading)" fontFamily="var(--fontFamily)"
                  sx={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                  '@media (max-width: 600px)': {
                      fontSize: '16px', // Adjust the font size for smaller screens
                  },
                  '@media (min-width: 601px) and (max-width: 1024px)': {
                      fontSize: '24px', // Adjust the font size for medium screens
                  },
                  '@media (min-width: 1025px)': {
                      fontSize: '32px', // Default font size for larger screens
                  },}}>{text}
                </Typography>
                <div className="bottom_buttons">
                    <Button variant="contained"
                      onClick={handleClose}
                      sx={{
                      width: "45%",
                      height: "100%",
                      backgroundColor: "var(--secondary)",
                      color: "var(--buttonText)",
                      borderRadius: "10px",
                      border: "2px solid var(--inputBorder)",
                      '&:hover': {
                          backgroundColor: 'var(--button)',
                          color: 'white'
                      }
                      }}
                  >
                    No
                  </Button>
                  <div className="apply_filter_button">
                    <FilledButton buttonText='Yes' onButtonClick={handleConfirmClick}/>
                  </div>
              </div>
              <br></br>
            </div>
        </Box>
    </Modal>
  );
};

export default Confirmation