import React, { useEffect, useState } from "react";
import '../Styles/Stoneworkshop.scss';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { useIntl } from 'react-intl';


export default function StoneworkshopPage() {

    var lang = useIntl();
    var locale = lang.locale;
    const [workshop, setWorkshop] = useState(langfileGreek.loomworkshop);

    function importAll(r) {
        return r.keys().map(r);
    }

    const instImages = importAll(require.context('../Images/Instructors', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {

        if (locale === 'el') {
            setWorkshop(langfileGreek.loomworkshop);
        } else {
            setWorkshop(langfileEnglish.loomworkshop);
        }
    }, [locale]);

    return (
        <div id='sw-container'>
            <div id='sw-header'>
                <span>{workshop.title}</span>
                <span>{workshop.dates}</span>
                <span><i>{workshop.text_slogan}</i></span>
            </div>
            <div id='sw-info'>
                {workshop.introtext.map(each => <p style={{ marginBottom: '.3em' }} key={workshop.introtext.indexOf(each)} dangerouslySetInnerHTML={{ __html: each }}></p>)}
                <span id="info-title" className="sw-subtitle">{workshop.Programtitle}</span>
                {/* <span className="mb-4 flex flex-col">{workshop.programText.map(each => <p>{each}</p>)}</span> */}
                {/* Program */}
                <div style={{ marginTop: '1em' }}>
                    {workshop.program.map(each =>
                        <span className='program-element' key={workshop.program.indexOf(each)}>
                            <p>{each.date}</p>
                            {each.activities.map(text => <p className='program-text paragraph' key={each.activities.indexOf(text)}>{text}</p>)}
                        </span>
                    )}
                </div>

                {/* Accommodation */}
                <span className="sw-subtitle">{workshop.accommodation}</span>
                <span>{workshop.accommodationInfo1}</span>
                <span className="sw-subtitle">{workshop.accommodationHouses}</span>
                <div>{workshop.accommodationHouses2}</div>
                <div>{workshop.accommodationHouses3}</div>
                <div>{workshop.accommodationHouses4}</div>
                <div>{workshop.accommodationHouses5}</div>
                <div>{workshop.accommodationHouses1}</div>
            </div>
            <div id='sw-inscription' className="w-full flex flex-col align-start">
                <span className="sw-subtitle">{workshop.costAndRegistration}</span>
                <span>{workshop.cost}</span>
                <a href={workshop.formlink} target='_blank'>{workshop.registration}</a>
            </div>
            {/* Instructors */}
            <div id='sw-instructors'>
                <span className="sw-subtitle">{workshop.instructorTitle}</span>
                {workshop.instructors.map(each => {
                    if (each.image) {
                        var imgFile = '';
                        instImages.map(img => {
                            if (img.includes(each.image)) {
                                imgFile = img;
                            }
                        });
                    }
                    return (
                        <div key={workshop.instructors.indexOf(each)} className='instructor'>
                            <p className="instructor-name">{each.name}</p>
                            <span key={workshop.instructors.indexOf(each)} className="instructor-text">
                                <img src={imgFile} />
                                {each.bio.map(bio => {
                                    if (bio.includes('\n')) {
                                        return (
                                            <p className='bio-special' key={each.bio.indexOf(bio)}>{bio}</p>
                                        );
                                    } else return (
                                        <p key={each.bio.indexOf(bio)}>{bio}</p>
                                    );
                                })}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}