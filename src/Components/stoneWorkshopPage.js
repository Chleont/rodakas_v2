import React, {useEffect, useState} from "react"
import '../Styles/Stoneworkshop.scss'
import langfileGreek from '../Lang/el.json'
import langfileEnglish from '../Lang/en.json'
import { useIntl} from 'react-intl'
import Alefantinos from '../Images/Instructors/Alefantinos.jpg'
import Vergianos from '../Images/Instructors/Vergianos.jpg'


export default function StoneworkshopPage(){

    var lang = useIntl()
    var locale = lang.locale
    const[workshop, setWorkshop] = useState(langfileGreek.stoneworkshop)

    useEffect(()=>{
        if(locale === 'el')
        {
            setWorkshop(langfileGreek.stoneworkshop)
        }else{
            setWorkshop(langfileEnglish.stoneworkshop)
        }
    },[locale])

    return(
        <div id='sw-container'>
            <div id='sw-header'>
                <span>{workshop.title}</span>
                <span>{workshop.dates}</span>
            </div>
            <div id='sw-info'>
                <span>{workshop.introtext}</span>
                <span>{workshop.info1}</span>
                <span>{workshop.info2}</span>
                <span className="sw-subtitle">{workshop.Programtitle}</span>
                <span className="sw-activity-date">{workshop.program0}</span>
                <span className="sw-activity-date">{workshop.program1.date}</span>
                <span className="sw-activity">11:00 - 13:00: {workshop.program1.morning}</span>
                <span className="sw-activity">18:30 - 20:30: {workshop.program1.evening}</span>
                <span className="sw-activity-date">{workshop.program2.date}</span>
                <span className="sw-activity">20:30 - 21:30: {workshop.program2.evening}</span>
                <span className="sw-activity-date">{workshop.program3.date}</span>
                <span className="sw-activity">20:30 - 21:30: {workshop.program3.evening}</span>
                <span className="sw-activity-date">{workshop.program4.date}</span>
                <span className="sw-activity">17:00 - 19:00: {workshop.program4.evening}</span>
                <span className="sw-activity-date">{workshop.program5.date}</span>
                <span className="sw-activity">20:00 - 21:00: {workshop.program5.evening}</span>
                <span className="sw-activity-date">{workshop.program5.date}</span>
                <span className="sw-activity">09:30 - 14:00: {workshop.program6.morning}</span>
                <span className="sw-activity">18:30 - 20:30: {workshop.program6.evening}</span>
                <span className="sw-subtitle">{workshop.accommodation}</span>
                <span>{workshop.accommodationInfo1}</span>
                <span>{workshop.accommodationInfo2}</span>
                <span className="sw-subtitle">{workshop.accommodationHouses}</span>
                <span>{workshop.accommodationHouses1}</span>
                <span>{workshop.accommodationHouses2}</span>
                <span>{workshop.accommodationHouses3}</span>
            </div>
            <div id='sw-inscription'>
                <span className="sw-subtitle">{workshop.costAndRegistration}</span>
                <span>{workshop.cost}</span>
                <a href={workshop.formlink} target='_blank'>{workshop.registration}</a>
            </div>
            <div id='sw-instructors'>
                <span className="sw-subtitle">{workshop.instructorTitle}</span>
                <span className="instructor-name">{workshop.instructorName1}</span>
                <span className="instructor-text">
                    <img src={Alefantinos}/>
                    <span>{workshop.instructorBio1}</span>
                </span>
                <span className="instructor-name">{workshop.instructorName2}</span>
                <span className="instructor-text">
                    <img src={Vergianos}/>
                    <span>{workshop.instructorBio2}</span>
                </span>
            </div>
        </div>
    )
}