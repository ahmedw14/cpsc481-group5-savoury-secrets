import React, { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import language_image from '../../images/language.png'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';


import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";

import './Account.css';
import { AlertColor, Button, Chip, Divider, Typography } from "@mui/material";
import FilledButton from "../../components/Button/FilledButton";
import SavedFilter from "../../components/SavedFilter/SavedFilter";
import EditAccountInfo from "../../components/EditAccountInfo/EditAccountInfo";
import Confirmation from "../../components/Confirmation/Confirmation";
import CustomAlert from "../../components/Alert/CustomAlert";

interface UserInfo {
    name: string;
    email: string;
    password: string;
    language: string;
    allergies: [];
  }
  

const allergies = ['Vegan', 'Vegetarian', 'Halal', 'Nut Free', 'Gluten Free', 'Dairy Free'];

const Account: React.FC = () => {
  const navigate = useNavigate();

  const [filterState, setFilterState] = useState<boolean>(false);
  const [editModalState, setEditModalState] = useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");
  
  var list: number[] = []
  const [user, setUser] = useState<UserInfo>({
      name: "",
      email: "",
      password: "",
      language: "",
      allergies: []
    });

    useEffect(() => {
      const local = localStorage.getItem('loggedInUser');
      if (local) {
        const parsedLocal = JSON.parse(local);
        const matchingIndices: number[] = allergies.reduce((indices: number[], element: string, index: number) => {
          if (parsedLocal.allergies.includes(element)) {
            indices.push(index);
          }
          return indices;
        }, []);
        setUser(parsedLocal);
      }
    }, []);


    const handleLogOut = () => {
      setConfirmationText(`Are you sure you want to logout?`);
      setOpenConfirm(true);
    }
    const handleConfirmLogout = () => {
        localStorage.clear();
        navigate("/")
    }
    const handleSaveInfo = (newName: string, newEmail: string) => {
        if(newName.trim().length === 0){
            setMessage("Please input a name");
            setMessageOpen(true);
            setMessageSeverity("error");
        }else if(newEmail.trim().length === 0){
            setMessage("Please input an email");
            setMessageOpen(true);
            setMessageSeverity("error");
        }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(newEmail)){
            setMessage("Please input a valid email");
            setMessageOpen(true);
            setMessageSeverity("error");
        }
        else{
            const local = localStorage.getItem('loggedInUser');
            if (local) {
            const parsedLocal = JSON.parse(local);
            parsedLocal.name = newName;
            parsedLocal.email = newEmail;
            localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
            user.name = newName;
            user.email = newEmail;
            }
            setEditModalState(false);
            setMessage("Account Info has been updated");
            setMessageOpen(true);
            setMessageSeverity("success");
        }
    };
    const handleSaveFilter = (newFilter: number[]) => {
      const local = localStorage.getItem('loggedInUser');
      if (local) {
        const parsedLocal = JSON.parse(local);
        const newCheckedList = newFilter.map(check => allergies[check]);
        parsedLocal.allergies = newCheckedList;
        localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
      }
      setFilterState(false)
      setMessage("Dietary Restrictions have been updated. This will be your saved filter.");
      setMessageOpen(true);
      setMessageSeverity("success");
    };
  return (
    <div className='account_screen'>
        <div className='account_content'>
            <div className='user_info'>
                <div>
                    <Typography variant="h2" fontWeight={'bold'} noWrap color="var(--cardHeading)" fontFamily="var(--fontFamily)"
                        sx={{
                        '@media (max-width: 600px)': {
                            fontSize: '20px', // Adjust the font size for smaller screens
                        },
                        '@media (min-width: 601px) and (max-width: 1024px)': {
                            fontSize: '24px', // Adjust the font size for medium screens
                        },
                        '@media (min-width: 1025px)': {
                            fontSize: '36px', // Default font size for larger screens
                        },}}>{user.name}
                    </Typography>
                    <Typography variant="body1" noWrap color="var(--cardHeading)" fontFamily="var(--fontFamily)"
                        sx={{
                        '@media (max-width: 600px)': {
                            fontSize: '12px', // Adjust the font size for smaller screens
                        },
                        '@media (min-width: 601px) and (max-width: 1024px)': {
                            fontSize: '16px', // Adjust the font size for medium screens
                        },
                        '@media (min-width: 1025px)': {
                            fontSize: '24px', // Default font size for larger screens
                        },}}>{user.email}
                    </Typography>
                </div>
                <Chip
                  onClick={()=>{setEditModalState(true)}}
                  label="Edit Info"
                  icon={<EditIcon />}
                  variant="outlined"
                  color='info'
                  sx={{width:'80%'}}
                />
            </div>
            <div className="account_menu">
                <div className="account_menu_button">
                    <FilledButton buttonText="Set Dietary Restriction" onButtonClick={()=>{setFilterState(true)}} />
                </div>
                <div className="account_menu_button">
                    <FilledButton buttonText="Change Language" onButtonClick={()=>{navigate('/language')}} />
                </div>
                <div className="account_menu_button">
                    <FilledButton buttonText="Logout" onButtonClick={handleLogOut} />
                </div>
            </div>
        </div>
        {openConfirm?
          <Confirmation status={openConfirm} text={confirmationText} handleConfirmClick={handleConfirmLogout} closeModal={()=>{setOpenConfirm(false)}}/>
        :
          <></>
        }
        <SavedFilter state={filterState} toggleFilter={()=>setFilterState(false)} onSaveChangesClick={handleSaveFilter}/>
        <EditAccountInfo status={editModalState} name={user.name} email={user.email} onSaveChanges={handleSaveInfo} toggleModal={setEditModalState}/>
        <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
        <Navbar active={"account"}/>
    </div>
  );
};

export default Account;