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
                <span>{workshop.title1}</span>
                <span>{workshop.title2}</span>
                <span>{workshop.dates}</span>
            </div>
            <div id='sw-info'>
                <span className="mb-2">{workshop.introtext}</span>
                <span className="mb-2">{workshop.introtext2}</span>
                <span className="mb-2">{workshop.info1}</span>
                <span className="mb-2">{workshop.info2}</span>
                <span className="mb-2">{workshop.info3}</span>
                <span className="mb-2">{workshop.info4}</span>
                <span className="mb-2">{workshop.program0}</span>
                <span>{workshop.freeParticipationNotice.normal}<b>{workshop.freeParticipationNotice.bold}</b></span>
                <span className="sw-subtitle">{workshop.programTempTitle}</span>
                <span className="mb-2"><i>{workshop.programParallel}</i></span>
                {/* <span className="sw-subtitle">{workshop.Programtitle}</span> */}
                <span className="sw-activity-date">{workshop.program1.date}</span>
                <span className="sw-activity-list">
                    <div >09:00 - 14:30: {workshop.program1.arrival}</div>
                    {/* <div >11:00 - 13:00: {workshop.program1.morning}</div>
                    <div >13:00 - 15:00: {workshop.program1.midday}</div>
                    <div >19:00 - 20:30: {workshop.program1.evening}</div> */}
                </span>
                <span className="sw-activity-date">{workshop.program2.date}</span>
                <div className="sw-activity-list">
                    <div>8:00 - 14:30: {workshop.program2.morning}</div>
                </div>
                <span className="sw-activity-date">{workshop.program3.date}</span>
                <div className="sw-activity-list">
                    <div>8:00 - 14:30: {workshop.program3.morning1}</div>
                    <div>9:00 - 11:00: {workshop.program3.arrival}</div>
                    <div>11:00 - 12:00: {workshop.program3.morning2}</div>
                </div>
                <div className="sw-activity-date">{workshop.program4.date}</div>
                <div className="sw-activity-list">
                    <div >8:00 - 14:30: {workshop.program4.morning}</div>
                    <div >{workshop.program4.eveningTranslation}: {workshop.program4.evening}</div>
                    {/* <li className="sw-activity-tab">{workshop.program4.evening1}</li>
                    <li className="sw-activity-tab">{workshop.program4.evening2}</li> */}
                </div>
                <div className="sw-activity-date">{workshop.program5.date}</div>
                <div className="sw-activity-list">
                    <div>8:00 - 13:00: {workshop.program5.morning}</div>
                    <div>13:30 - 14:30: {workshop.program5.midday}</div>
                    <div>21:00: {workshop.program5.evening}</div>
                </div>
                {/* <div className="mb-2">
                    <div className="sw-activity-date">{workshop.program6.date}</div>
                    <div className="sw-activity-list">
                        <div >{workshop.program6.evening}</div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="sw-activity-date">{workshop.program7.date}</div>
                    <div className="sw-activity-list">
                        <div >20:00 - 22:30: {workshop.program7.evening}</div>
                        <li className="sw-activity-tab">{workshop.program7.evening1}</li>
                        <li className="sw-activity-tab">{workshop.program7.evening2}</li>
                        <li className="sw-activity-tab">{workshop.program7.evening3}</li>
                    </div>
                </div>
                <div>
                    <div className="sw-activity-date">{workshop.program8.date}</div>
                    <div className="sw-activity-list">
                        <div >8:00 - 14:30: {workshop.program8.morning}</div>
                        <div >21:00: {workshop.program8.evening}</div>
                    </div>
                </div> */}
                <span className="sw-subtitle">{workshop.accommodation}</span>
                <span className="mb-2">{workshop.accommodationInfo1}</span>
                <span>{workshop.accommodationInfo2}</span>
                {/* <span>{workshop.accommodationInfo2}</span> */}
                <span className="sw-subtitle">{workshop.accommodationHouses}</span>
                <div>{workshop.accommodationHouses1}</div>
                <div>{workshop.accommodationHouses2}</div>
                <div>{workshop.accommodationHouses3}</div>
                <div>{workshop.accommodationHouses4}</div>
                <div>{workshop.accommodationHouses5}</div>
                <div>{workshop.accommodationHouses6}</div>
            </div>
            <div id='sw-inscription'>
                <span className="sw-subtitle">{workshop.costAndRegistration}</span>
                <span><b>{workshop.cost.title1}: </b>{workshop.cost.cost} <b>{workshop.cost1.price}</b> {workshop.cost.euro} {workshop.cost.prepaid} <b>{workshop.cost1.prepaid}</b>.</span>
                <span><b>{workshop.cost.title2}</b> {workshop.cost.or} <b>{workshop.cost.title3}: </b>{workshop.cost.cost} <b>{workshop.cost2.price}</b> {workshop.cost.euro} {workshop.cost.prepaid} <b>{workshop.cost2.prepaid}</b> {workshop.cost.euro}.</span>
                <span><b>{workshop.cost.title1}</b> {workshop.cost.and} <b>{workshop.cost.title2}</b> {workshop.cost.or} <b>{workshop.cost.title3}: </b>{workshop.cost.cost} <b>{workshop.cost3.price}</b> {workshop.cost.euro} {workshop.cost.prepaid} <b>{workshop.cost3.prepaid}</b> {workshop.cost.euro}.</span>
                <span className="my-2">{workshop.cost4}</span>
                <span>{workshop.formPrompt}</span>
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