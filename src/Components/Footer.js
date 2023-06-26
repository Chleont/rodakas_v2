import React from 'react'
import '../Styles/App.scss'
import fb from './footer_fb.png'
import yt from './footer_yt.png'


function Footer(){
    return(
        <div id='footer'>
            <a className='footer-button' href="https://www.facebook.com/%CE%A1%CF%8C%CE%B4%CE%B1%CE%BA%CE%B1%CF%82-%CE%9C%CE%B1%CF%81%CE%B3%CE%B1%CF%81%CE%AF%CF%84%CE%B5%CF%82-%CE%9C%CF%85%CE%BB%CE%BF%CF%80%CE%BF%CF%84%CE%AC%CE%BC%CE%BF%CF%85-107517978163857/?ref=page_internal">
                <img src={fb} alt='facebook'/>
            </a>
            <a className='footer-button' href="https://www.youtube.com/channel/UCFZ2PZdULV6otQCx3BsWSAQ">
                <img src={yt} alt='youtube'/>
            </a>
            <p>
                © 2023 Copyright: <a href="https://rodakas.org"><u>rodakas.org</u></a> 
            </p>
        </div>
    )
}
export default Footer