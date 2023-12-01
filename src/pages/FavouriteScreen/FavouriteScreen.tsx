import Button from '@mui/material/Button';
import QueueIcon from '@mui/icons-material/Queue';
import React, { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

import './FavouriteScreen.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import FavouriteList from '../../components/FavouriteList/FavouriteList';
import NoResultsFoundCard from '../../components/NoResultsFoundCard/NoResultsFoundCard';
import AddFavouriteList from '../../components/AddFavouriteList/AddFavouriteList';
import Confirmation from '../../components/Confirmation/Confirmation';
import { AlertColor } from '@mui/material';
import CustomAlert from '../../components/Alert/CustomAlert';


  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const FavouriteScreen: React.FC = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [userFavouritesList, setUserFavouritesList] = useState<string[]>([]);
    const [openAddList, setOpenAddList] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [deleteListName, setDeleteListName] = useState('');

    const [message, setMessage] = useState("");
    const [messageOpen, setMessageOpen] = useState(false);
    const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

    const handleSearchChange = (newSearchText: string) => {
      setSearchText(newSearchText);
    };
    
    const handleListClick = (category: String) => {
        navigate(`/favouritesList/${category}/`);
    };

    const handleOpenAddListClick = () => {
      setOpenAddList(true)
    };
    const handleCloseAddListClick = () => {
      setOpenAddList(false)
    };

    const handleAddList = (listName: string) => {
      setUserFavouritesList((prevList) => [...prevList, listName]);
      setMessage(`\'${listName}\' list has been created`);
      setMessageOpen(true);
      setMessageSeverity("success");
    };

    const handleSaveList = (oldName: string, newName: string) => {
      if(oldName === newName){
        setMessage(`No change in the title`);
        setMessageOpen(true);
        setMessageSeverity("error");
      }
      else{
        const local = localStorage.getItem('loggedInUser');
        if (local) {
          const parsedLocal = JSON.parse(local);
          const updatedFavourites = { ...parsedLocal.favourites };

          if(newName.length<1){
            setMessageSeverity("error")
            setMessageOpen(true)
            setMessage("Please Input a List Name")
          }else if (updatedFavourites[newName]) {
              // category exists
              setMessageSeverity("error")
              setMessageOpen(true)
              setMessage("List already exists. Please use another list Name")
          }else{
            updatedFavourites[newName] = parsedLocal.favourites[oldName];
            delete updatedFavourites[oldName];
            parsedLocal.favourites = updatedFavourites;
  
            localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
            setUserFavouritesList(Object.keys(parsedLocal.favourites));

            setMessage(`\'${oldName}\' title has been changed to \'${newName}\'`);
            setMessageOpen(true);
            setMessageSeverity("success");
          }

        }
      }
    };
    const handleConfirmDelete = () => {
      const local = localStorage.getItem('loggedInUser');
      if (local) {
        // Parse the JSON string into an object
        const parsedLocal = JSON.parse(local);

        const favourites = { ...parsedLocal.favourites };

        // Check if the category already exists
        if (favourites[deleteListName]) {
            delete favourites[deleteListName];

            parsedLocal.favourites = favourites
            setUserFavouritesList(Object.keys(parsedLocal.favourites));
            // Save the updated object back to localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
        }
      }
      setOpenConfirm(false);
      setMessage(`\'${deleteListName}\' list has been deleted`);
      setMessageOpen(true);
      setMessageSeverity("success");
    };
    const handleListDelete = (listName: string) => {
      setConfirmationText(`Are you sure you want to delete the \'${listName}\' list?`);
      setDeleteListName(listName);
      setOpenConfirm(true);
    }

    useEffect(() => {
      const local = localStorage.getItem('loggedInUser');
      if (local) {
          const parsedLocal = JSON.parse(local);
          setUserFavouritesList(Object.keys(parsedLocal.favourites));
      }
    }, []);

    const filteredFavouriteList = userFavouritesList?.filter((listName) => listName.toLowerCase().includes(searchText.toLowerCase()))
   return (
    <div className='favourite_screen'>
      <div className="top_bar">
        <div className="home_search_bar">
          <SearchBar searchText={searchText} placeholder='Search for favourite list' onSearchTextChange={handleSearchChange}/>
        </div>
        <Button variant="contained"
            onClick={handleOpenAddListClick}
            sx={{
            width: "20%",
            display: 'flex',
            backgroundColor: "var(--secondary)",
            color: "var(--buttonText)",
            minWidth: "160px",
            borderRadius: "10px",
            border: "2px solid var(--inputBorder)",
            '&:hover': {
                backgroundColor: 'var(--button)',
                color: 'white'
            }
            }}
            >
                <QueueIcon />
                Create List
          </Button>
      </div>
        <div className="favourites_content">
          {
            filteredFavouriteList && filteredFavouriteList.length>0?
              <FavouriteList list={filteredFavouriteList} onFavouriteListClick={handleListClick} onFavouriteListDelete={handleListDelete} onSaveList={handleSaveList}/>
            : <NoResultsFoundCard />
          }
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
        {
          openAddList?
            <AddFavouriteList status={openAddList} closeModal={handleCloseAddListClick} addList={handleAddList}/>
          :<></>
        }
        {openConfirm?
          <Confirmation status={openConfirm} text={confirmationText} handleConfirmClick={handleConfirmDelete} closeModal={()=>{setOpenConfirm(false)}}/>
        :
          <></>
        }
        <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
        <Navbar active={"favourites"}/>
    </div>
  );
};

export default FavouriteScreen;