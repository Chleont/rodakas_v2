import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { Route, useNavigate, Routes } from 'react-router-dom';
import '../Styles/App.scss';
import Greek from '../Lang/el.json';
import English from '../Lang/en.json';
import logo from './home_logo.png';
import NavbarBrowserMenu from './NavbarBrowserMenu.jsx';
import NavbarMobileMenu from './NavbarMobileMenu.jsx';
import Contact from './Contact.jsx';
import Archive from './Archive.jsx';
import Footer from './Footer.jsx';
import Workshops from './Workshops.jsx';
import Multimedia from './Multimedia.jsx';
import About from './About.jsx';
import Map from './Map.jsx';


function App() {


    const [locale, setLocale] = useState('el');
    const [messages, setMessages] = useState(Greek);
    const [isMobile, setWidth] = useState(window.innerWidth < 1000);
    const frogOptions = {
        size: 4,
        units: 'em',
        fontSize: 20,
        startingPosition: {
            x: 0,
            y: 0
        },
        timeToOpenMouth: 2000,
        timeToAttack: 1000,
        navbarHeight: 84
    };

    let navigate = useNavigate();

    function handleWindowSizeChange() {
        setWidth(window.innerWidth < 1000);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);


    function routeChange(path) {
        return (
            navigate(path)
        );
    }

    return (
        <div className="App">
            <IntlProvider locale={locale} defaultLocale='el' messages={messages}>
                <div id='navbar' className='Navbar'>
                    {isMobile ? <NavbarMobileMenu /> : <NavbarBrowserMenu />}
                    <button className="noOutlineButton navbarButton" id="pick-language-button" onClick={
                        function () {
                            if (messages === Greek) {
                                setMessages(English);
                                setLocale('en');
                            } else {
                                setMessages(Greek);
                                setLocale('el');
                            }
                        }
                    }>
                        <span id='pick-language-icon'></span>
                        <span id="pick-language-text">
                            <FormattedMessage id="language" />
                        </span>
                    </button>
                </div>
                <Routes>
                    <Route path='/' element={
                        <div className="homescreen">
                            <img src={logo} className="app-logo" alt="logo" />
                            <p className='app-title'>
                                <FormattedMessage id="homescreen-title" />
                            </p>
                            <div className='footer'>
                                <Footer />
                            </div>
                        </div>
                    } />
                    <Route path='/about' element={
                        <About />
                    } />
                    <Route path='/activity' element={
                        <Workshops url={''} />
                    } />
                    <Route path='/activity/stoneworkshop' element={
                        <Workshops url={'/stoneworkshop'} />
                    } />
                    <Route path='/activity/loomworkshop' element={
                        <Workshops url={'/loomworkshop'} />
                    } />
                    {/* <Route path='/activity/stonecarving' element={
                        <Workshops url={'/stonecarving'}/>
                    }/> */}
                    {/* <Route path='/activity/feast23' element={
                        <Workshops url={'/feast23'}/>
                    }/> */}
                    <Route path='/archive' element={
                        <Archive />
                    } />
                    <Route path='/multimedia' element={
                        <Multimedia />
                    } />
                    <Route path='/multimedia/family-islands' element={
                        <Map />
                    } />
                    <Route path='/contact' element={
                        <Contact />
                    } />
                </Routes>
            </IntlProvider>
        </div>
    );
}

export default App;
