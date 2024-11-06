import React, { useEffect, useRef, useState } from "react";
import '../Styles/Map.scss';
import ImageMapper from 'react-img-mapper';
import json from './MapData/mapdata.json';
import langfileGreek from '../Lang/el.json';
import langfileEnglish from '../Lang/en.json';
import { useIntl } from 'react-intl';

/** Map data */
import json_hover from './MapData/mapdata.json';
import mapMetadata from './MapData/map_metadata.json';
import json_families from './MapData/mapdata_families.json';

/** Maps */
import satellite from '../Images/map/Basemap_simple.jpg';
import symbols from '../Images/map/Map_symbols.png';
import simple from '../Images/map/Map_simple.png';
import satellite_symbols from '../Images/map/Basemap_symbols.jpg';
import islands from '../Images/map/Map_islands.png';
import islands_symbols from '../Images/map/Map_islands_symbols.png';

export default function Map() {

    var lang = useIntl();
    var locale = lang.locale;
    var hoverTimeout = null;
    const [langFile, setlangfile] = useState(langfileGreek.map);
    const infoBoxPosition = useRef({ x: 0, y: 0 });
    const [modalContent, setModalContent] = useState(null);
    const metadata = useRef(mapMetadata.gr);
    const [displayedMap, setDisplayedMap] = useState(simple);
    const [width, setWidth] = useState(null);
    const [overflow, setOverflow] = useState(0);
    const [checkboxValues, setCheckboxValues] = useState({
        option1: false,
        option2: false,
        option3: false,
        json: json_hover
    });

    /* Coordinates input code */
    const [inputMode, setInputMode] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [houses, setHouses] = useState([]);
    var realCoords = useRef([]);
    var waitingForHotkey = useRef(false);

    // Add event listeners for tracking mouse position and keys combinations pressed
    useEffect(() => {
        document.getElementById('mapper-container').addEventListener('mousemove', handleMouseMove);
        document.addEventListener('keydown', handleKeynDown);
        return () => {
            document.getElementById('mapper-container').removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('keydown', handleKeynDown);
        };
    }, []);

    useEffect(() => {
        if (locale === 'el') {
            setlangfile(langfileGreek.map);
            metadata.current = mapMetadata.gr;
        } else {
            setlangfile(langfileEnglish.map);
            metadata.current = mapMetadata.en;
        }
    }, [locale]);

    useEffect(() => {

        if (checkboxValues.option1) {
            if (checkboxValues.option2) {
                setDisplayedMap(islands_symbols);
            }
            if (checkboxValues.option3) {
                setDisplayedMap(satellite_symbols);
            } else {
                setDisplayedMap(symbols);
            }
        } else {
            if (checkboxValues.option3) {
                setDisplayedMap(satellite);
            } else if (checkboxValues.option2) {
                setDisplayedMap(islands);
            } else {
                setDisplayedMap(simple);
            }
        }

    }, [checkboxValues]);

    useEffect(() => {
        if (modalContent) {

            let parentClassList = ['flex', 'flex-col', 'items-start', 'justify-center'];
            let childCLasslist = ['flex', 'flex-col', 'items-start', 'justify-center', 'w-full', 'bg-[#f8fff3]', 'mb-1.5'];

            //Building container
            let parent = document.createElement('div');
            parentClassList.map(each => { parent.classList.add(each); });

            modalContent.map(each => {
                // Building different periods of usage & ownership
                let child = document.createElement('div');
                childCLasslist.map(each => { child.classList.add(each); });

                // Building usage
                let usage = document.createElement('div');
                if (each.usage != '') {
                    usage.innerText = each.usage;
                } else {
                    usage.innerText = "Κατοικία";
                }
                usage.classList.add('font-medium', 'w-full', 'text-start', 'px-0.5', 'bg-[#e5fbd4]');
                child.append(usage);

                //Building owners
                each.owners.map(owner => {
                    let ownerElement = document.createElement('div');
                    ownerElement.classList.add('px-0.5');
                    ownerElement.innerText = owner;
                    child.append(ownerElement);
                });

                // //Add line between periods
                // if (modalContent.indexOf(each) < modalContent.length - 1) {
                //     let line = document.createElement('div');
                //     line.classList.add('border-b-[1px]', 'border-slate-500', 'border-dotted', 'w-3/12', 'mx-auto', 'mt-2', 'mb-1');
                //     child.append(line);
                // }
                parent.append(child);
            });

            let navbarHeight = document.getElementById('navbar').offsetHeight;
            document.getElementById('hover-data-content').append(parent);

            // Position modal box next to cursor
            document.getElementById('hover-data-box').style.left = `${infoBoxPosition.current.x + 5}px`;
            document.getElementById('hover-data-box').style.top = `${infoBoxPosition.current.y - navbarHeight - document.getElementById('hover-data-box').offsetHeight}px`;

            // Make sure the entire modal box is inside screen
            if (document.getElementById('hover-data-box').offsetTop < 0) {
                document.getElementById('hover-data-box').style.top = `${infoBoxPosition.current.y - navbarHeight}px`;
            }
        }
    }, [modalContent]);

    useEffect(() => {
        if (inputMode) {
            setWidth(2921);
            waitingForHotkey.current = false;
            document.getElementById('mapper-container').style.width = width;
        } else {
            setWidth(document.getElementById('mapper-container').offsetWidth - 10);
            document.getElementById('mapper-container').style.width = width;
        }
    }, [inputMode]);

    const handleMouseMove = event => {
        infoBoxPosition.current = {
            x: event.clientX - document.getElementById('mapper-container').offsetLeft,
            y: event.clientY - document.getElementById('mapper-container').offsetTop,
        };
        if (inputMode) { setCoords({ x: event.clientX, y: event.clientY }); };
    };

    const handleKeynDown = event => {
        if (event.key === "Shift") {
            waitingForHotkey.current = true;
            document.addEventListener('keyup', handleKeyUp);
        } else if (waitingForHotkey.current && (event.key === 'I' || event.key === 'i' || event.key === 'ι' || event.key === 'Ι')) {
            waitingForHotkey.current = false;
            setInputMode(true);
        }
    };

    const handleKeyUp = event => {
        if (event.key === "Shift") {
            waitingForHotkey.current = false;
            document.removeEventListener('keyup', handleKeyUp);
        }
    };

    /* Data input code */

    const passCoords = React.useCallback((e) => {
        console.log('pass');
        e.stopPropagation();
        e.preventDefault();
        realCoords.current = [...realCoords.current, parseInt(infoBoxPosition.current.x) + document.getElementById('mapper-container').scrollLeft + 58 /** Offset between first maping coordinates and current method*/];
        realCoords.current = [...realCoords.current, parseInt(infoBoxPosition.current.y) + document.getElementById('mapper-container').scrollTop - document.getElementById('navbar').offsetHeight];
        console.log(parseInt(infoBoxPosition.current.x) + document.getElementById('mapper-container').scrollLeft, parseInt(infoBoxPosition.current.y) + document.getElementById('mapper-container').scrollTop - document.getElementById('navbar').offsetHeight);
    });

    function startRec() {
        setHouses([]);
        document.getElementById('start-recording-button').classList.remove('hover:bg-yellow-100');
        document.getElementById('start-recording-button').classList.add('bg-red-500');
        document.getElementById('start-recording-button').classList.add('text-white');
        document.getElementById('mapper-container').addEventListener('click', passCoords);
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            let houseis = houses;

            houseis.push({
                id: e.target.value,
                name: e.target.value,
                shape: "poly",
                fillColor: "#eab54d4d",
                title: "",
                strokeColor: "transparent",
                coords: realCoords.current
            });
            setHouses(houseis);
            realCoords.current = [];
            console.log(houses, houseis);
        }
    }

    function completeRec() {
        document.getElementById('start-recording-button').classList.add('hover:bg-yellow-100');
        document.getElementById('start-recording-button').classList.remove('bg-red-500');
        document.getElementById('start-recording-button').classList.remove('text-white');
        document.getElementById('mapper-container').removeEventListener('click', passCoords);
        const element = document.createElement("a");
        const textFile = new Blob([JSON.stringify(houses)], { type: 'text/plain' });

        element.href = URL.createObjectURL(textFile);
        element.download = "userFile.txt";
        document.body.appendChild(element);
        element.click();
    }
    /* End of data input code */

    /* Map */
    function handleClick(area) {
        console.log(area);
    }

    function zoom(type) {
        if (type == 'in') {
            setOverflow(prev => { return prev + 1; });
            setWidth(prev => { return prev + 150; });
        } else {
            setOverflow(prev => { return prev - 1; });
            setWidth(prev => { return prev - 150; });
        }
        if (overflow > 0 && document.getElementById('map-container').style.overflowY == 'hidden') {
            document.getElementById('map-container').style.overflowY = 'visible';
        } else if (document.getElementById('map-container').style.overflowY == 'visible') {
            document.getElementById('map-container').style.overflowY = 'hidden';
        }
    }

    /* Controls */

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        if (name == 'option2' && checked && checkboxValues.option3) {
            setCheckboxValues({
                option1: checkboxValues.option1,
                option2: checked,
                option3: false,
                json: json_hover
            });
        } else if (name == 'option3' && checked && checkboxValues.option2) {
            setCheckboxValues({
                option1: checkboxValues.option1,
                option2: false,
                option3: checked,
                json: json_hover
            });
        } else {
            setCheckboxValues((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        }
    };

    /* Legend */

    function hideLegend() {
        document.getElementById('legend').style.display = 'none';
        document.getElementById('toggle-legend').style.display = 'flex';
    }

    function showLegend() {
        document.getElementById('legend').style.display = 'flex';
        document.getElementById('toggle-legend').style.display = 'none';
    }

    return (
        <div id="map-page-container" className="relative" onMouseMove={handleMouseMove}>

            {/* Polygon input component - click start, click on all edges of polygon, fill the name field and hit enter, continue with next polygon */}

            {inputMode && <span className="absolute pl-2 pt-2 top-0 left-0 z-10 flex flex-row gap-x-2">
                <button id="cursor-pointer start-recording-button" className="px-2 rounded border border-1 border-slate-400 hover:bg-yellow-100" onClick={() => { startRec(); }}>Start</button>
                <button className="cursor-pointer px-2 rounded border border-1 border-slate-400 hover:bg-yellow-100" onClick={() => { completeRec(); }}>Completed</button>
                <input className="px-2 rounded border border-1 border-slate-400 focus-visible:outline-none" id="houseInput"
                    onKeyDown={(e) => { handleEnter(e); }}
                />
                <a className="font-bold hover:text-red-500 cursor-pointer" onClick={() => { setInputMode(false); }}>X</a>
            </span>}

            <div id='map-container'>
                <span id='hover-data-box' className="flex flex-col items-center justify-center absolute z-10 w-fit h-fit overflow-visible">
                    {modalContent && <span id='hover-data-content' className="text-[0.9em] overflow-hidden min-w-40 w-fit rounded-lg border border-1 border-[rgb(196, 177, 177)] bg-white min-h-30 h-fit" />}
                </span>
                <div id='mapper-container'>
                    <ImageMapper
                        src={displayedMap}
                        map={checkboxValues.option2 ? { name: 'Families', areas: checkboxValues.json } : { name: 'Margarites', areas: checkboxValues.json }}
                        responsive
                        parentWidth={width}
                        onMouseEnter={(area) => {
                            hoverTimeout = window.setTimeout(function () {
                                setModalContent(metadata.current[area.id].data);
                            }, 1204);
                        }}
                        onMouseLeave={() => {
                            window.clearTimeout(hoverTimeout);
                            setModalContent(null);
                        }}
                        onClick={area => { handleClick(area); }}
                    />
                </div>
                <div id='right-box'>
                    <div id='infobox-scroll-container'>
                        <div id='infobox'>
                            Δημιουργήθηκε το 2017 από μια ομάδα κατοίκων του χωριού Μαργαρίτες Ρεθύμνου. Στόχος ήταν η καταγραφή Ιστορικών ζωής των πιο μεγάλων σε ηλικία κατοίκων της Κοινότητας.Κίνητρο για τη δημιουργία αυτού του αρχείου, ήταν η συνειδητοποίηση ότι με το τέλος της γενιάς των ανθρώπων που το 2017 είναι από 80 ετών και επάνω, χάνεται η ζωντανή μνήμη ιστορικών γεγονότων που ξεκινούν από το Β’ Παγκόσμιο Πόλεμο, την Κατοχή, τον εμφύλιο και προχωρουν ως τις μέρες μας. Χάνεται επίσης η ζωντανή μνήμη κοινωνικών γεγονότων και σχέσεων κατά τη διάρκεια μιας περιόδου που οι Μαργαρίτες και οι γύρω κοινότητες ήταν πολυπληθέστερες, ο βιοπορισμός βασιζόταν στη γεωργική παραγωγή και την αγγειοπλαστική και οι συναλλαγές γινόταν ως επι το πλείστον με ανταλλαγή προϊόντων. Επιλέον με τη γενιά αυτή τελειώνει και η ζωντανή μνήμη επαγγελματων, και πρακτικών καθημερινής ζωής όπως και η μνήμη της μορφής του οικισμού, πριν τα μέσα του 20ου αιώνα.Ισχυρό κίνητρο επίσης ήταν η ανάγκη αποτύπωσης του λόγου των ανθρώπων, που αφηγούνται. Λόγου ανεπηρρέαστου συνήθως από την εγκύκλια παιδεία και που όσο αφορά το περιεχόμενο, το λεκτικό και την προσωδία του, απηχεί την εποχή της Προφορικότητας, εποχή που η γνώση, η πληροφορία, η δράση, το συναίσθημα αλλά και κάθε είδους σχέση αναδύονταν και αποτυπώνονταν μέσα από την ζωντανη και συνεχή προφορική αφήγηση στην Κοινότητα.
                        </div>
                    </div>
                    <div id="controls">
                        <div className="dropdown-menu">
                            <form>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option1"
                                        checked={checkboxValues.option1}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.buildings}
                                    </span>
                                </label>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option2"
                                        checked={checkboxValues.option2}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.families}
                                    </span>
                                </label>
                                <label>
                                    <input
                                        className="checkbox"
                                        type="checkbox"
                                        name="option3"
                                        checked={checkboxValues.option3}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>
                                        {langFile.basemap}
                                    </span>
                                </label>
                            </form>
                        </div>
                        <div id='buttons-container'>
                            <button onClick={() => { zoom('in'); }}></button>
                            <button onClick={() => { zoom('out'); }}></button>
                        </div>
                    </div>
                </div>
                <div id='legend'>
                    <div id='hide-legend' onClick={() => { hideLegend(); }}>
                        <span />
                    </div>
                    <div id='legend-contents'>
                        {langFile.legend}
                    </div>
                </div>
                <div id='toggle-legend' onClick={() => { showLegend(); }}>
                    <span>
                        <span>
                            {langFile.legend}&nbsp;&nbsp;
                        </span>
                        <span className="rot180"></span>
                    </span>
                </div>
            </div>
        </div>
    );
}