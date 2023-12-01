import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import CancelIcon from '@mui/icons-material/Cancel';

import './LanguageScreen.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import LanguageList from '../../components/LanguageList/LanguageList';

const Language = ( ) => {
  const [searchText, setSearchText] = useState('');
  const [selectedLanguage, setLanguage] = useState<String>();

  const navigate = useNavigate();

  const exitClick = () => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
      // Parse the JSON string into an object
      const parsedLocal = JSON.parse(local);
      parsedLocal.language = selectedLanguage;
      // Save the updated language back to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(parsedLocal));
    }
    navigate(-1)
  }

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    const local = localStorage.getItem('loggedInUser');
    if (local) {
      const parsedLocal = JSON.parse(local);
      if (parsedLocal.language) {
          setLanguage(parsedLocal.language);
        }
    }else{
      setLanguage("english")
    }
  }, []);

  return (
    <div className='language_screen'>
       <div className='top_leanguage_bar'>
            <CancelIcon sx={{marginRight: "1rem", color: 'var(--button)'}} fontSize="large" onClick={exitClick}/>
            <SearchBar searchText={searchText} placeholder='Search for language' onSearchTextChange={handleSearchTextChange}/>
       </div>
       <div className='language_container'>
            <LanguageList 
              searchText={searchText}
              selectedLanguage={selectedLanguage? selectedLanguage.toString(): ''}
              onLanguageChange={handleLanguageChange} 
            />
       </div>
    </div>
  );
};

export default Language;
