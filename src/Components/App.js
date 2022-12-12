import React, {useState} from 'react'
import logo from './home_logo.png';
import '../Styles/App.scss';
import {IntlProvider} from 'react-intl';
import Greek from '../Lang/el.json';
import English from '../Lang/en.json';
import {FormattedMessage} from 'react-intl';
import {Route, useNavigate,Routes} from 'react-router-dom';



function App() {
  let navigate = useNavigate();

  function routeChange(path){
    return(
      navigate(path)
    )
  }

  const [locale, setLocale] = useState('el');
  const [messages, setMessages] = useState(Greek);
  return (
    <div className="App">
      <IntlProvider locale={locale} defaultLocale = 'el' messages={messages}>
        <div className='Navbar'>
          <img src={logo} alt="" onClick={()=>{routeChange('/')}}/>
          <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/about')}}>
            <FormattedMessage id = "rodakas"/>  
          </button>
          <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/activities')}}>
            <FormattedMessage id = "activities"/>  
          </button>
          <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/archive')}}>
            <FormattedMessage id = "archive"/>  
          </button>
          <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/multimedia')}}>
            <FormattedMessage id = "multimedia"/>  
          </button>
          <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/communication')}}>
            <FormattedMessage id = "communication"/>  
          </button>
          <button className="noOutlineButton navbarButton" id="pick-language-button" onClick={function(){
            console.log('click')
              if(messages === Greek){
                setMessages(English)
                setLocale('en')
              }else{
                setMessages(Greek)
                setLocale('el')
              }
              console.log(messages,locale)
            }}>
            <span id='pick-language-icon'></span>         
            <FormattedMessage id = "language"/>     
          </button>
        </div>
        <Routes>
          <Route path='/' element={
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
          }/>
          <Route path='/about' element={
            <div>
              asdasdasdasd
            </div>
          }/>
        </Routes>
      </IntlProvider>
    </div>
  );
}

export default App;
