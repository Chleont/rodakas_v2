import React, { useEffect, useState } from "react";
import '../Styles/Stoneworkshop.scss';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { useIntl } from 'react-intl';


export default function LoomChildrenworkshopPage() {

    var lang = useIntl();
    var locale = lang.locale;
    const [workshop, setWorkshop] = useState(langfileGreek.loomchildren);

    function importAll(r) {
        return r.keys().map(r);
    }

    const instImages = importAll(require.context('../Images/Instructors', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {

        if (locale === 'el') {
            setWorkshop(langfileGreek.loomchildren);
        } else {
            setWorkshop(langfileEnglish.loomchildren);
        }
    }, [locale]);

    return (
        <div id='sw-container'>
            <div id='sw-header'>
                <span>{workshop.title}</span>
                <span>{workshop.dates}</span>
                <span className="text-start">{workshop.introtext}</span>
            </div>
            <div className="w-full flex flex-col align-start text-start">
                <span className="mb-4">{workshop.Programtitle}</span>
                {workshop.programText.map(t => <p className="mb-2">{t}</p>)}
            </div>
            <div id='loom-inscription' className="w-full flex flex-col align-start">
                <span className="mt-10 mx-auto text-lg font-bold cursor-default">
                    {workshop.registration}
                    <a className="underline" href={`tel:${workshop.phone}`} >{workshop.phone}</a>
                </span>
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