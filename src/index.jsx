import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import './Styles/App.scss'
import './Styles/styles.css'
import './tailwind.css'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import App from './Components/App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBNGAD_blYO15lwma5Qqv4vbuS_rdPxbuw",
    authDomain: "rodakas-website.firebaseapp.com",
    projectId: "rodakas-website",
    storageBucket: "rodakas-website.appspot.com",
    messagingSenderId: "607038602821",
    appId: "1:607038602821:web:ea4177f6db3854aef42d2c",
    measurementId: "G-VEJL7EMBSH"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
