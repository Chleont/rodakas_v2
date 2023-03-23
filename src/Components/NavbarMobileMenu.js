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
    function showOptions(){
        let menu = document.getElementById('dropdown-menu') 
        if(menu.style.display ==='flex'){
            menu.style.display = 'none'
        }else{
            menu.style.display = 'flex'
        }
    }

    return (
        <div id="mobile-menu-container">
            <button className="noOutlineButton navbarButton" id="burger-menu-button" onClick={()=>{showOptions()}}>
                <span/>
            </button>
            <div id="dropdown-menu">
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/')}}>
                    <FormattedMessage id = "homepage"/>  
                </button>
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/about')}}>
                    <FormattedMessage id = "rodakas"/>  
                </button>
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/activity')}}>
                    <FormattedMessage id = "activities"/>  
                </button>
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/archive')}}>
                    <FormattedMessage id = "archive"/>  
                </button>
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/multimedia')}}>
                    <FormattedMessage id = "multimedia"/>  
                </button>
                <button className="noOutlineButton navbarButton" onClick={()=>{showOptions();routeChange('/contact')}}>
                    <FormattedMessage id = "communication"/>  
                </button>
            </div>
        </div>
    )
}
export default NavbarMobileMenu