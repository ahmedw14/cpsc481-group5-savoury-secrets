import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


interface SearchBarProps {
  searchText: string;
  placeholder: string;
  onSearchTextChange: (newSearchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, placeholder, onSearchTextChange }) => {
  const handleChange = (e: any) => {
    searchText = e.target.value.toLowerCase();
    onSearchTextChange(searchText);
  };

  return(
    <TextField
      className="search_bar"
      onChange={handleChange}
      focused
      id="search-text"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{color: 'var(--inputText)'}}/>
          </InputAdornment>
        ),
      }}
      placeholder = {'Search'}
      sx={{
          input: {
              color: 'var(--inputText)',
              "&::placeholder": {
                opacity: 0.8,
              },
          },
          bgcolor: 'var(--inputBackground)',
          width: "100%",
          "& fieldset": { border: 'none' },
          borderRadius: "10px",
          border: "2px solid var(--inputBorder)"
      }}
    />
  );
};
export default SearchBar;