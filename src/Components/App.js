import React, {useEffect, useState} from 'react'
import logo from './home_logo.png';
import '../Styles/App.scss';
import {IntlProvider} from 'react-intl';
import Greek from '../Lang/el.json';
import English from '../Lang/en.json';
import NavbarBrowserMenu from './NavbarBrowserMenu.js';
import NavbarMobileMenu from './NavbarMobileMenu.js';
import {FormattedMessage} from 'react-intl';
import {Route, useNavigate,Routes} from 'react-router-dom';
import Footer from './Footer.js'
import Workshops from './Workshops';


function App() {

  const [locale, setLocale] = useState('el');
  const [messages, setMessages] = useState(Greek);
  const [isMobile, setWidth] = useState(window.innerWidth < 1000);
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
            <div>
              About
            </div>
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
