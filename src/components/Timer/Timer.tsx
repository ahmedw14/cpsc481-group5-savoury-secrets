import React, { useState, useEffect } from 'react';
import { Button, Modal, TextField, InputAdornment, Chip, ListItem, Paper, Typography, Divider, AlertColor, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './Timer.css'
import FilledButton from '../Button/FilledButton';
import CustomAlert from '../Alert/CustomAlert';
interface TimerProps {
  initialTime: number;
  onTimerExpired: () => void;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const CountdownTimer: React.FC<TimerProps> = ({ initialTime, onTimerExpired }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        onTimerExpired(); // Notify the parent component that the timer has expired
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime, onTimerExpired]);

  return <div>{formatTime(remainingTime)}</div>;
};

const Timer: React.FC = () => {
  const [timers, setTimers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currMinutes, setCurrMinutes] = useState<number>(5);
  const [currSeconds, setCurrSeconds] = useState<number>(30);

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  const [timerEndedWarning, setTimerEndedWarning] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddTimer = () => {
    openModal();
  };

  const handleConfirmTimer = () => {
    if((currMinutes === 0 && currSeconds === 0) || currMinutes < 0 || currSeconds < 0 || currSeconds > 59 || currMinutes > 59){
      setMessage("Please input a valid timer");
      setMessageOpen(true);
      setMessageSeverity("error");
      setTimerEndedWarning(false);
    }else{
      setTimers([...timers, (currMinutes * 60) + currSeconds]);
      closeModal();
      setMessage("Timer has been added");
      setMessageOpen(true);
      setMessageSeverity("success");
      setTimerEndedWarning(false);
    }
  };

  const handleDelete = (indexToDelete: number ) => () => {
    setTimers((prevTimers) => {
      const updatedTimers = [...prevTimers];
      updatedTimers.splice(indexToDelete, 1);
      return updatedTimers;
    });
  };

  const handleTimerExpired = (expiredTimer: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer !== expiredTimer));
    setMessage("Timer has Finished!");
    setMessageSeverity("warning");
    setTimerEndedWarning(true);
    setMessageOpen(false);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        backgroundColor: 'var(--cardBackground)',
        overflowX: "scroll",
        p: 0.5,
        marginTop: "1rem",
        position: "absolute",
        bottom: "12%",
        left: "5%",
        right: "5%",
      }}
      component="ul"
    >
      {timers.map((data, index) => {
        return (
          <ListItem key={index} sx={{width: "fit-content"}}>
            <Chip
              label={<CountdownTimer key={index} initialTime={data} onTimerExpired={() => handleTimerExpired(data)}/>}
              onDelete={handleDelete(index)}
            />
          </ListItem>
        );
      })}
      <ListItem sx={{width: "fit-content"}}>
        <Chip
          sx={{backgroundColor: "var(--button)", '&:hover':{backgroundColor: "var(--navBar)"}}}
          label={"Add Timer"}
          onClick={handleAddTimer}
        />
      </ListItem>
      <Modal open={isModalOpen} onClose={closeModal} >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h5" fontWeight={'bold'} noWrap color="var(--cardHeading)" fontFamily="var(--fontFamily)"
              sx={{
                marginBottom: "1rem",
                '@media (max-width: 600px)': {
                    fontSize: '20px', // Adjust the font size for smaller screens
                },
                '@media (min-width: 601px) and (max-width: 1024px)': {
                    fontSize: '24px', // Adjust the font size for medium screens
                },
                '@media (min-width: 1025px)': {
                    fontSize: '30px', // Default font size for larger screens
                },}}>Pick a Timer Duration
          </Typography>
          <div className='time_input'>
            <div className='minutes_input'>
              <label>Minutes</label>
              <input type='number' min={0} max={59} value={currMinutes} onChange={(e) => setCurrMinutes(parseInt(e.target.value, 10))}></input>
            </div>
            <Divider />
            <div className='seconds_input'>
              <label>Seconds</label>
              <input type='number' min={0} max={59} value={currSeconds} onChange={(e) => setCurrSeconds(parseInt(e.target.value, 10))}></input>
            </div>
          </div>
          <div className="timer_buttons">
            <Button variant="contained"
                  onClick={closeModal}
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
                  },
                  '.without_ampm::-webkit-datetime-edit-ampm-field': {
                    display: "none"
                  }
                  }}
              >
                Cancel
              </Button>
              <div className="apply_filter_button">
                <FilledButton buttonText='Add' onButtonClick={handleConfirmTimer}/>
              </div>
          </div>
        </div>
      </Modal>
      {
        timerEndedWarning?
        <Snackbar open={timerEndedWarning} sx={{ width: "100%" }}>
          <Alert severity={messageSeverity} sx={{ width: "80%" , margin: "auto"}}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setTimerEndedWarning(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Snackbar>
        :<></>

      }
      <Snackbar open={messageOpen} autoHideDuration={3000} onClose={()=>setMessageOpen(false)} sx={{ width: '100%' }}>
        <Alert severity={messageSeverity} sx={{ width: '80%', margin: "auto" }}>
          {message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Timer;
