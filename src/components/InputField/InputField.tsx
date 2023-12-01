import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

interface InputFieldProps {
  placeholder: string;
  input: string;
  onInputChange: (newSearchText: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, input, onInputChange }) => {
  const handleInputChange = (e: any) => {
    input = e.target.value;
    onInputChange(input);
  };

  return(
    <TextField
      value={input}
      className="input_field"
      onChange={handleInputChange}
      id="outlined-basic"
      label={placeholder}
      variant="outlined"
      type={placeholder === 'Password' ? 'password' : ''}
      InputLabelProps={{
        sx: {
          color: 'var(--inputText)',
          opacity: 0.8,
          [`&.${inputLabelClasses.shrink}`]: {
            color: 'var(--cardTagBackground)',
          },
        },
      }}
      sx={{
        input: {
          color: 'var(--inputText)',
          fontFamily: 'var(--fontFamily)',
          "&::placeholder": {
            opacity: 0.8,
          },
        },
        width: '100%',
        padding: '0',
        marginBottom: '1rem',
        "& fieldset": {
          border: '2px solid var(--inputBorder)',
          borderRadius: '10px',
        },
        '&:hover fieldset': {
          borderColor: 'var(--inputBorder)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--cardTagBackground)',
        },
      }}
    />
  );
};
export default InputField;