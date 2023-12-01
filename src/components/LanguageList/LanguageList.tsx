
import { List, ListItem, ListItemText } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import Languages from '../../data/Languages.json'

interface LanguageListProps {
  selectedLanguage: string;
  searchText: string;
  onLanguageChange: (newLanguage: string) => void;
}

const LanguageList: React.FC<LanguageListProps> = ({ selectedLanguage, searchText, onLanguageChange }) => {
  const handleLanguageChange = (language: string) => {
    selectedLanguage = language;
    onLanguageChange(language);
  };
  return(
    <List>
      {Languages
      .filter((language) => (language.name.toLocaleLowerCase().includes(searchText) || language.nativeName.toLocaleLowerCase().includes(searchText)))
      .map((language)=>(
        <ListItem secondaryAction={language.name.toLocaleLowerCase() === selectedLanguage?<CheckIcon sx={{color: 'black'}}/>:null}>
          <ListItemText 
            primary={language.name}
            secondary={language.nativeName}
            onClick={() => handleLanguageChange(language.name.toLocaleLowerCase())}
            />
        </ListItem>
          
      ))}
    </List>
  );
};

export default LanguageList