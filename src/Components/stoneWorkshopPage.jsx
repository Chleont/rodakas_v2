import React, { useEffect, useState } from "react";
import '../Styles/Stoneworkshop.scss';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { useIntl } from 'react-intl';
import Alefantinos from '../Images/Instructors/Alefantinos.jpg';
import Vergianos from '../Images/Instructors/Vergianos.jpg';


export default function StoneworkshopPage() {

    var lang = useIntl();
    var locale = lang.locale;
    const [workshop, setWorkshop] = useState(langfileGreek.stoneworkshop);

    useEffect(() => {
        if (locale === 'el') {
            setWorkshop(langfileGreek.stoneworkshop);
        } else {
            setWorkshop(langfileEnglish.stoneworkshop);
        }
    }, [locale]);

    return (
        <div id='sw-container'>
            <div id='sw-header'>
                <span>{workshop.title}</span>
                <span>{workshop.dates}</span>
            </div>
            <div id='sw-info'>
                <span className="mb-2">{workshop.introtext}</span>
                <span className="mb-2">{workshop.info1}</span>
                <span>{workshop.info2}</span>
                <span className="sw-subtitle">{workshop.Programtitle}</span>
                <span className="mb-2">{workshop.program0}</span>
                <span>{workshop.freeParticipationNotice.normal}<b>{workshop.freeParticipationNotice.bold}</b></span>
                <div className="sw-list-container">
                    <span className="sw-activity-date">{workshop.program1.date}</span>
                    <span className="sw-activity-list">
                        <div >08:30 - 11:00: {workshop.program1.arrival}</div>
                        <div >11:00 - 13:00: {workshop.program1.morning}</div>
                        <div >13:00 - 15:00: {workshop.program1.midday}</div>
                        <div >19:00 - 20:30: {workshop.program1.evening}</div>
                    </span>
                    <span className="sw-activity-date">{workshop.program2.date}</span>
                    <div className="sw-activity-list">
                        <div>8:30 - 14:00: {workshop.program1.morning}</div>
                        <div>17:30 - 20:00: {workshop.program2.evening}</div>
                    </div>
                    <span className="sw-activity-date">{workshop.program3.date}</span>
                    <div className="sw-activity-list">
                        <div>20:00 - 22:00: {workshop.program3.evening}</div>
                    </div>
                    <div className="mb-2">
                        <div className="sw-activity-date">{workshop.program4.date}</div>
                        <div className="sw-activity-list">
                            <div >18:30 - 20:30: {workshop.program4.evening}</div>
                            {/* <li className="sw-activity-tab">{workshop.program4.evening1}</li>
                            <li className="sw-activity-tab">{workshop.program4.evening2}</li>
                            <li className="sw-activity-tab">{workshop.program4.evening3}</li> */}
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="sw-activity-date">{workshop.program5.date}</div>
                        <div className="sw-activity-list">
                            <div>{workshop.program5.evening}</div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="sw-activity-date">{workshop.program6.date}</div>
                        <div className="sw-activity-list">
                            <div >17:30 - 21:00: {workshop.program6.evening}</div>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="sw-activity-date">{workshop.program7.date}</div>
                        <div className="sw-activity-list">
                            <div >20:30 - 22:30: {workshop.program7.evening}</div>
                        </div>
                    </div>
                    <div>
                        <div className="sw-activity-date">{workshop.program8.date}</div>
                        <div className="sw-activity-list">
                            <div >13:00: {workshop.program8.midday}</div>
                            <div >21:00: {workshop.program8.evening}</div>
                        </div>
                    </div>
                </div>
                <span className="sw-subtitle">{workshop.accommodation}</span>
                <span>{workshop.accommodationInfo1}</span>
                <span>{workshop.accommodationInfo2}</span>
                <span className="sw-subtitle">{workshop.accommodationHouses}</span>
                <div>{workshop.accommodationHouses1}</div>
                <div>{workshop.accommodationHouses2}</div>
                <div>{workshop.accommodationHouses3}</div>
            </div>
            <div id='sw-inscription'>
                <span className="sw-subtitle">{workshop.costAndRegistration}</span>
                <span>{workshop.cost}</span>
                <a href={workshop.formlink} target='_blank'>{workshop.registration}</a>
            </div>
            <div id='sw-instructors'>
                <div className="sw-subtitle">{workshop.instructorTitle}</div>
                <div className="sw-instructor">
                    <span className="instructor-text">
                        <img src={Alefantinos} />
                        <span><div className="instructor-name">{workshop.instructorName1}</div>{workshop.instructorBio1}</span>
                    </span>
                </div>
                <div className="sw-instructor">
                    <span className="instructor-text">
                        <img src={Vergianos} />
                        <span><div className="instructor-name">{workshop.instructorName2}</div>{workshop.instructorBio2}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}