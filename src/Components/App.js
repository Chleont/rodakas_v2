import React, {useState} from 'react'
import logo from './home_logo.png';
import '../Styles/App.scss';
import Navbar from'./Navbar.js'
import {IntlProvider} from 'react-intl';
import Greek from '../Lang/el.json';
import English from '../Lang/en.json';
import {FormattedMessage} from 'react-intl';




function App() {
  const [locale, setLocale] = useState('el');
  const [messages, setMessages] = useState(Greek);
  return (
    <div className="App">
      <IntlProvider locale={locale} defaultLocale = 'el' messages={messages}>
        <div className='Navbar'>
          <img src={logo} alt=""/>
          <button onClick={function(){
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
            <FormattedMessage id = "language"/>     
          </button>
          <FormattedMessage id = "check"/>           
        </div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </IntlProvider>
    </div>
  );
}

export default App;
