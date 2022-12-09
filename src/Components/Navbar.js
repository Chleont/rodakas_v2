import React from 'react';
import '../Styles/App.scss';
import {Component} from 'react';
import logo from './home_logo.png';
import {FormattedMessage} from 'react-intl';

class Navbar extends Component{
    render(){
    return <div className='Navbar'>
        <img src={logo} alt=""/>
        <FormattedMessage id = "check"/>
        <button></button>
        <button></button>
    </div>
    }
}
export default Navbar