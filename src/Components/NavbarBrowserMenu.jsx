import React from 'react';
import '../Styles/App.scss';
import logo from './home_logo.png';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';


function NavbarBrowserMenu() {

    function routeChange(path) {
        return (
            navigate(path)
        );
    }
    let navigate = useNavigate();

    return (
        <div id="browser-menu-container">
            <img src={logo} alt="" onClick={() => { routeChange('/'); }} />
            <button className="noOutlineButton navbarButton" onClick={() => { routeChange('/about'); }}>
                <FormattedMessage id="rodakas" />
            </button>
            <button className="noOutlineButton navbarButton" onClick={() => { routeChange('/activity'); }}>
                <FormattedMessage id="activities" />
            </button>
            <button className="noOutlineButton navbarButton" onClick={() => { routeChange('/archive'); }}>
                <FormattedMessage id="archive" />
            </button>
            <button className="noOutlineButton navbarButton" onClick={() => { routeChange('/multimedia'); }}>
                <FormattedMessage id="multimedia" />
            </button>
            <button className="noOutlineButton navbarButton" onClick={() => { routeChange('/contact'); }}>
                <FormattedMessage id="communication" />
            </button>
        </div>
    );
}
export default NavbarBrowserMenu;