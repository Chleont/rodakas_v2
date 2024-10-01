import React, { useEffect, useState } from "react";
import '../Styles/Stonecarvingworkshop.scss';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { useIntl } from 'react-intl';
import Alefantinos from '../Images/Instructors/Alefantinos.jpg';
import Vergianos from '../Images/Instructors/Vergianos.jpg';


export default function StoneworkshopPage() {

    var lang = useIntl();
    var locale = lang.locale;
    const [workshop, setWorkshop] = useState(langfileGreek.stonecarvingworkshop);

    useEffect(() => {
        if (locale === 'el') {
            setWorkshop(langfileGreek.stonecarvingworkshop);
        } else {
            setWorkshop(langfileEnglish.stonecarvingworkshop);
        }
    }, [locale]);

    return (
        <div id='scw-container'>
            <div id='scw-header'>
                <span>{workshop.title1}</span>
                <span>{workshop.dates1}</span>
            </div>
            <div id='scw-info'>
                <span>{workshop.introtext1}</span>
                <span>{workshop.info1}</span>
            </div>
            <div id='scw-header'>
                <span>{workshop.title2}</span>
                <span>{workshop.dates2}</span>
            </div>
            <div id='scw-info'>
                <span>{workshop.introtext2}</span>
                <span>{workshop.info2}</span>
                <span className="scw-subtitle">{workshop.Programtitle}</span>
                <span className="scw-activity-date">{workshop.program}</span>
                {/* <span className="scw-activity-date">{workshop.program1.date}</span>
                <span className="scw-activity">11:00 - 13:00: {workshop.program1.morning}</span>
                <span className="scw-activity">18:30 - 20:30: {workshop.program1.evening}</span>
                <span className="scw-activity-date">{workshop.program2.date}</span>
                <span className="scw-activity">20:30 - 21:30: {workshop.program2.evening}</span>
                <span className="scw-activity-date">{workshop.program3.date}</span>
                <span className="scw-activity">20:30 - 21:30: {workshop.program3.evening}</span>
                <span className="scw-activity-date">{workshop.program4.date}</span>
                <span className="scw-activity">17:00 - 19:00: {workshop.program4.evening}</span>
                <span className="scw-activity-date">{workshop.program5.date}</span>
                <span className="scw-activity">20:00 - 21:00: {workshop.program5.evening}</span>
                <span className="scw-activity-date">{workshop.program5.date}</span>
                <span className="scw-activity">09:30 - 14:00: {workshop.program6.morning}</span>
                <span className="scw-activity">18:30 - 20:30: {workshop.program6.evening}</span> */}

                {/* Accommodation */}
                <span className="sw-subtitle">{workshop.accommodation}</span>
                {workshop.accommodationInfo.map(each =>
                    <p className='accomodation-text paragraph' id={workshop.accommodationInfo.indexOf(each) == 0 ? 'accomodation-free' : ''} key={workshop.accommodationInfo.indexOf(each)}>{each}</p>
                )}
                <div id='scw-inscription'>
                    <span className="scw-subtitle">{workshop.costAndRegistration}</span>
                    <span>{workshop.cost}</span>
                    <a href={workshop.formlink} target='_blank'>{workshop.registration}</a>
                </div>
            </div>

            {/* <div id='scw-instructors'>
                <span className="scw-subtitle">{workshop.instructorTitle}</span>
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
            </div> */}
        </div>
    );
}