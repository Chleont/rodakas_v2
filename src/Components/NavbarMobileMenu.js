import React from 'react';
import '../Styles/App.scss';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';


function NavbarMobileMenu(){

    function routeChange(path){
        return(
        navigate(path)
        )
    }
    let navigate = useNavigate();

    return (
        <div id="mobile-menu-container">
            <button className="noOutlineButton navbarButton" id="burger-menu-button">
                <span/>
            </button>
            {/* <button className="noOutlineButton navbarButton" onClick={()=>{routeChange('/about')}}>
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
            </button> */}
        </div>
    )
}
export default NavbarMobileMenu