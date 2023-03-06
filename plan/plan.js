/*
## Aufbau soll sein:
1 Wochenansicht von X Plätzen. Jeder Platz hat Zeitslots zwischen 7:00 Uhr und 21:00 Uhr a 1 Stunde. Jedem Zeitslot können X Spieler hinzugefügt werden.
Am nächsten Tag fliegt der vorherige Tag heraus und ein weiterer wird nachgerückt. Das soll automatisch passieren.
Eine Person kann immer nur ein einziges mal in einem Zeitslot stehen.

Eine initiale Konfiguration soll vorhanden sein für:
- Anzahl der Plätze
- Anzahl der Timeslots
- Zeitspanne der Zeitslots
- Anzahl der maximalen Spieler
*/

// TODO next: Check if player id is already exists in court and time slot
// TODO next: rewrite to add new player into players
// TODO next: Weekly View
// TODO next: Move every Day of the Week in one Tab
// TODO next: change eventhandler from click or touch to pointerEvents
// TODO next next :) : Include Database

import {buildCourtHTML, addSlotsToCourt} from "./template.js";
import {modal, modalSetFocusToFirstnameOnOpen} from "./modal.js";
import {getNextSevenDates} from "./date.js"; // not used yet

let state = {
    tennisFacility: {},
    globalCourtData: undefined,
    globalSlotData: undefined,
    globalClickedTimeSlot: ''
}

// global element selector
const facility = document.getElementById("tennisFacility");

// Function expression
const init = () => {
    let params = (new URL(location)).searchParams;
    let numberOfCourts = parseInt(params.get('courts'));

    if (numberOfCourts <= 0 || numberOfCourts >= 21) {
        return
    }
    addNewCourt(numberOfCourts);
    modalSetFocusToFirstnameOnOpen();
    modal(state);

/*
    // not yet in use but need for Weekly View
    getNextSevenDates(tennisFacility);
*/
}

// add the Courts to the facility
const addNewCourt = (numberOfCourts) => {
    for (let courtNumber = 1; courtNumber <= numberOfCourts; courtNumber++) {
        buildCourtHTML(courtNumber, facility);
        const tennisFacility = state.tennisFacility;
        let currentCourt = Object.keys(tennisFacility).length + 1;
        addSlotsToCourt(tennisFacility, courtNumber, currentCourt)
    }

    addPlayerButtonEventListener();
}

function getGlobalData () {
    // write data to global variables
    state.globalClickedTimeSlot = this;
    state.globalSlotData = parseInt(this.parentElement.getAttribute('data-time-slot'));
    state.globalCourtData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-court'));
}

const addPlayerButtonEventListener = () => {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', getGlobalData);
    }
}

// Save to local Storage
const saveButton = document.querySelector('#saveData');
saveButton.addEventListener('click', () => {
    localStorage.setItem('tennisFacility', JSON.stringify(state.tennisFacility));
})

// Load data from local Storage
const loadButton = document.querySelector('#loadData');
loadButton.addEventListener('click', () => {
    state.tennisFacility = localStorage.getItem('tennisFacility');
})

init();
