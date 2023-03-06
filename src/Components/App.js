import React, {useEffect, useState} from 'react'
import {IntlProvider} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import {Route, useNavigate,Routes} from 'react-router-dom';
import '../Styles/App.scss';
import Greek from '../Lang/el.json';
import English from '../Lang/en.json';
import logo from './home_logo.png';
import NavbarBrowserMenu from './NavbarBrowserMenu.js';
import NavbarMobileMenu from './NavbarMobileMenu.js';
import Footer from './Footer.js'
import Workshops from './Workshops';
import FrogTroll from './FrogTroll/FrogTroll';


function App() {

  const [locale, setLocale] = useState('el');
  const [messages, setMessages] = useState(Greek);
  const [isMobile, setWidth] = useState(window.innerWidth < 1000);
  const frogOptions = {
    size:2, 
    startingPosition:{
      x:0,
      y:0
    }, 
    units:'em',
    timeToOpenMouth:2000,
    timeToAttack:1000
  }
  let navigate = useNavigate();

  function handleWindowSizeChange() {
    console.log('setting mobile')
    setWidth(window.innerWidth < 1000);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);


  function routeChange(path){
    return(
      navigate(path)
    )
  }

  return (
    <div className="App">
      <IntlProvider locale={locale} defaultLocale = 'el' messages={messages}>
        <div className='Navbar'>
          {isMobile ? <NavbarMobileMenu/>:<NavbarBrowserMenu/>}
          <button className="noOutlineButton navbarButton" id="pick-language-button" onClick={
            function(){
              if(messages === Greek){
                setMessages(English)
                setLocale('en')
              }else{
                setMessages(Greek)
                setLocale('el')
              }
            }
          }>
            <span id='pick-language-icon'></span>
            <span id="pick-language-text">
              <FormattedMessage id = "language"/>     
            </span>         
          </button>
        </div>
        <Routes>
          <Route path='/' element={
            <div className="homescreen">
              <img src={logo} className="app-logo" alt="logo" />
              <p className='app-title'>
                <FormattedMessage id = "homescreen-title"/>     
              </p>
              <div className='footer'>
                <Footer/>
              </div>
            </div>
          }/>
          <Route path='/about' element={
            // options:{
            //   units:string 'em' or 'px' (default 'em')
            //   startingPosition:{ calculated from center of screen
            //     x:integer,
            //     y:integer
            //   },
            //   timeToOpenMouth:ms
            //   timeToAttack:ms
            //   size:{number}
            // }
              <FrogTroll options={frogOptions}/>
          }/>
          <Route path='/activities' element={
            <Workshops/>
          }/>
          <Route path='/archive' element={
            <div>
              Archive
            </div>
          }/>
          <Route path='/multimedia' element={
            <div>
              Multimedia
            </div>
          }/>
          <Route path='/communication' element={
            <div>
              Communication
              <div className='footer'>
                <Footer/>
              </div>
            </div>
          }/>
        </Routes>
      </IntlProvider>
    </div>
  );
}

export default App;
