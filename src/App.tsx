import './App.css';
import Account from './pages/Account/Account';
import CookingScreen from './pages/CookingScreen/CookingScreen';
import FavouriteRecipesScreen from './pages/FavouriteRecipesScreen/FavouriteRecipesScreen';
import FavouriteScreen from './pages/FavouriteScreen/FavouriteScreen';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import Language from './pages/LanguageScreen/LanguageScreen';
import RecipeScreen from './pages/RecipeScreen/RecipeScreen';
import SignInScreen from './pages/SignInScreen/SignInScreen';
import WelcomeScreen from './pages/WelcomeScreen/WelcomeScreen';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/language" element={<Language />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/favourites" element={<FavouriteScreen />} />
          <Route path="/favouritesList/:listName" element={<FavouriteRecipesScreen />} />
          <Route path="/recipe/:recipeName" element={<RecipeScreen />} />
          <Route path="/cooking/:recipeName/:stepNumber" element={<CookingScreen />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
