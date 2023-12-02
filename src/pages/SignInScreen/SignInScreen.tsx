import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';
import burger_image from '../../images/burger-isometric-1@2x.png'
import taco_image from '../../images/taco-1@2x.png'
import language_image from '../../images/language.png'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { AlertColor } from "@mui/material";

import Users from '../../data/users.json'

import './SignInScreen.css';
import InputField from "../../components/InputField/InputField";
import FilledButton from "../../components/Button/FilledButton";
import CustomAlert from "../../components/Alert/CustomAlert";

const SignInScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSeverity, setMessageSeverity] = useState<AlertColor>("success");

  const handleNameChange = (newName: string) => {
    setName(newName)
  }
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const languageClick:  React.MouseEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    navigate('/language');
  }
  const handleSignInClick = () => {
    const foundUser = Users.find(user => user.email === email && user.password === password);
    if(foundUser){
       navigate("/home")
       localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
    }else{
      setMessageSeverity("error")
      setMessageOpen(true)
      setMessage("User Not Found. Please Check Email and Password")
    }
   
  }
  const handleSignUpClick = () => {
    if(email && name && password && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      Users.push({name: name, email: email, password: password, language: "english", allergies: [], favourites: {}, reviewed: {}})
      setMessageSeverity("success")
      setMessageOpen(true)
      setMessage("Welcome " + name + " to Savoury Secrets! Your account has been successfully created.")
    }else{
      console.log(email)
      setMessageSeverity("error")
      setMessageOpen(true)
      setMessage("User Could Not Be Created. Please Check Name, Email, and Password Fields")
    }
   
  }
  const handleForgotPassword = () => {
    setMessage("Email has been sent. Please follow the instructions on there!");
    setMessageOpen(true);
    setMessageSeverity("success");
  }
  
  return (
    <div className='sign_in_up'>
      <div className='top-layer'>
        <img className="burger" alt="Burger isometric" src={(burger_image)}/>
        <img className="taco" alt="Burger isometric" src={(taco_image)}/>
      </div>
      <div className='input-container'>
        <Tabs value={tabValue} 
          onChange={handleTabChange} 
          aria-label="icon label tabs example"
          TabIndicatorProps={{
            style: { display: 'none' }
          }}
          sx={{
            borderRadius: "50px", 
            backgroundColor: "transparent", 
            width: "80%", 
            border: "2px solid var(--inputBorder)", 
            margin: "1rem auto",
            color: "var(--inputText)",
            marginBottom: "2rem"
          }}
            variant="fullWidth"
          >
          <Tab label="Sign In" sx={{width: "100%",color: "var(--inputText)", margin: "auto", border: "0", fontFamily: 'var(--fontFamily)', borderRadius: "50px", '&.Mui-selected': {background: 'var(--inputText)', color: "white", fontWeight: "bold"}}}/>
          <Tab label="Sign Up" sx={{width: "100%",color: "var(--inputText)", margin: "auto", border: "0", fontFamily: 'var(--fontFamily)', borderRadius: "50px", '&.Mui-selected': {background: 'var(--inputText)', color: "white", fontWeight: "bold"}}}/>
        </Tabs>
        {
        tabValue == 0?
          <>
            <div className="sign-in-form">
              <div className="form-fields">
                  <InputField placeholder="Email" input={email} onInputChange={handleEmailChange}/>
                  
                  <InputField placeholder="Password" input={password} onInputChange={handlePasswordChange}/>
                  <p onClick={handleForgotPassword}>Forgot Password?</p>
                </div>
              </div>
              <div className="bottom-component">
                <div className="language-component">
                  <img className="language-icon" alt="Language isometric" src={(language_image)} onClick={languageClick}/>
                </div>
                <div className="button-component">
                  <FilledButton buttonText="Sign In" onButtonClick={handleSignInClick}/>
                </div>
            </div>
          </>   
          :
          <>
            <div className="sign-in-form">
              <div className="form-fields">
                  <InputField placeholder="Name" input={name} onInputChange={handleNameChange}/>
                  
                  <InputField placeholder="Email" input={email} onInputChange={handleEmailChange}/>
                  
                  <InputField placeholder="Password" input={password} onInputChange={handlePasswordChange}/>
                </div>
              </div>
              <div className="bottom-component">
                <div className="language-component">
                  <img className="language-icon" alt="Language isometric" src={(language_image)} onClick={languageClick}/>
                </div>
                <div className="button-component">
                  <FilledButton buttonText="Sign Up" onButtonClick={handleSignUpClick} />
                </div>
               
            </div>
          </>
        }
       </div>
       <CustomAlert message={message} messageSeverity={messageSeverity} status={messageOpen} onClose={()=>setMessageOpen(false)}/>
    </div>
  );
};

export default SignInScreen;