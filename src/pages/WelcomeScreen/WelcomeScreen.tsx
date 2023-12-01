import burger_image from '../../images/burger-isometric-1@2x.png'
import sushi_image from '../../images/sushi-caviar-1@2x.png'
import taco_image from '../../images/taco-1@2x.png'
import language_image from '../../images/language.png'

import { useNavigate } from 'react-router-dom';

import './WelcomeScreen.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const languageClick:  React.MouseEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    navigate('/language');
  }
  const tapClick = () => {
    navigate('/signin');
  }  
  return (
    <div className='welcome_screen' onClick={tapClick}>
        <div className="overlap-group">
          <div className="text-wrapper">Savoury Secrets</div>
          <div className="text-wrapper-2">Tap to get started</div>
        </div>
        <div className="images">
            <img className="language" alt="Language isometric" src={(language_image)} onClick={languageClick}/>
            <img className="burger" alt="Burger isometric" src={(burger_image)}/>
            <img className="sushi" alt="Burger isometric" src={(sushi_image)}/>
            <img className="taco" alt="Burger isometric" src={(taco_image)}/>
        </div>
    </div>
  );
};

export default Welcome;