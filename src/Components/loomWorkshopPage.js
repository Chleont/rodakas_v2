import React, {useEffect, useState} from "react"
import '../Styles/Stoneworkshop.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl'
// import Somaki from '../Images/Instructors/Somaki.jpg'


export default function StoneworkshopPage(){

    var lang = useIntl()
    var locale = lang.locale
    const[workshop, setWorkshop] = useState(langfileGreek.loomworkshop)

    function importAll(r) {
        return r.keys().map(r)
    }
      
    const instImages = importAll(require.context('../Images/Instructors', false, /\.(png|jpe?g|svg)$/))

    useEffect(()=>{

        if(locale === 'el')
        {
            setWorkshop(langfileGreek.loomworkshop)
        }else{
            setWorkshop(langfileEnglish.loomworkshop)
        }
    },[locale])

    return(
        <div id='sw-container'>
            <div id='sw-header'>
                <span>{workshop.title}</span>
                <span>{workshop.dates}</span>
                <span><i>{workshop.text_slogan}</i></span>
            </div>
            <div id='sw-info'>
                {workshop.introtext.map(each => <p className='introtext' key={workshop.introtext.indexOf(each)}>{each}</p>)}
                <span id="info-title" className="sw-subtitle">{workshop.Programtitle}</span>
                {/* Program */}
                {workshop.program.map(each => 
                    <span className='program-element' key={workshop.program.indexOf(each)}>
                        <p>{each.date}</p>
                        {each.activities.map(text => <p className='program-text paragraph' key={each.activities.indexOf(text)}>{text}</p>)}
                    </span>
                )}
                {/* Accommodation */}
                <span className="sw-subtitle">{workshop.accommodation}</span>
                {workshop.accommodationInfo.map(each => 
                    <p className='accomodation-text paragraph' id={workshop.accommodationInfo.indexOf(each)==0?'accomodation-free':''} key={workshop.accommodationInfo.indexOf(each)}>{each}</p>
                )}
            </div>
            <div id='sw-inscription'>
                <span className="sw-subtitle">{workshop.costAndRegistration}</span>
                <span className="paragraph">{workshop.cost}</span>
                <a href={workshop.formlink} target='_blank'>{workshop.registration}</a>
            </div>

            {/* Instructors */}
            <div id='sw-instructors'>
                <span className="sw-subtitle">{workshop.instructorTitle}</span>
                {workshop.instructors.map(each => { 
                    if(each.image){
                        var imgFile = ''

                        instImages.map(img =>{
                            if(img.default.includes(each.image)){
                                imgFile = img.default
                            }
                        })
                    }
                    return(
                        <div key={workshop.instructors.indexOf(each)} className='instructor'>
                            <p className="instructor-name">{each.name}</p>
                            <span key={workshop.instructors.indexOf(each)}className="instructor-text">
                                <img src={imgFile}/>
                                {each.bio.map(bio =>{
                                    if(bio.includes('\n')){
                                        return(
                                            <p className='bio-special' key={each.bio.indexOf(bio)}>{bio}</p>
                                        )
                                    }else return(
                                        <p key={each.bio.indexOf(bio)}>{bio}</p>
                                    )
                                })}
                            </span>
                        </div>
                    )
                })}
                <span className="instructor-name">{workshop.instructorName1}</span>
                <span className="instructor-text">
                    <span>{workshop.instructorBio1}</span>
                    <br/>
                    <span>{workshop.instructorBio11}</span>
                </span>
                <span className="instructor-name">{workshop.instructorName2}</span>
                <span className="instructor-text">
                    <span>{workshop.instructorBio2}</span>
                </span>
            </div>
        </div>
    )
}