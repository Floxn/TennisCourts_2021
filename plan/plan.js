// TODO mentoring: Move Function confirmPlayerButton and below from here to modal.js, how can i handle with the function call addPlayerToSlot in the modal.js

// TODO next: Check if player id is already exists in court and time slot
// TODO next: rewrite to add new player into players
// TODO next: Weekly View
// TODO next: Move every Day of the Week in one Tab
// TODO next: change eventhandler from click or touch to pointerEvents
// TODO next next :) : Include Database
import {buildCourtHTML, addSlotsToCourt} from "./template.js";
import {modalSetFocusToFirstnameOnOpen} from "./modal.js";
import {getNextSevenDates} from "./date.js"; // not used yet
import {addPlayerToSlot} from "./player.js";

let tennisFacility = {};
let {globalCourtData, globalSlotData, globalClickedTimeSlot} = '';

// global element selector
const facility = document.getElementById("tennisFacility");

//// BUILD OBJECTS
////
// Object to build a Player

// Function expression
const init = () => {
    let params = (new URL(location)).searchParams;
    let numberOfCourts = parseInt(params.get('courts'));

    if (numberOfCourts <= 1 || numberOfCourts >= 21) {
        return
    }
    addNewCourt(numberOfCourts);
    modalSetFocusToFirstnameOnOpen();

/*
    // not yet in use but need for Weekly View
    getNextSevenDates(tennisFacility);
*/
}

// add the Courts to the facility
const addNewCourt = (numberOfCourts) => {
    for (let courtNumber = 1; courtNumber <= numberOfCourts; courtNumber++) {
        buildCourtHTML(courtNumber, facility);
        let currentCourt = Object.keys(tennisFacility).length + 1;
        addSlotsToCourt(tennisFacility, courtNumber, currentCourt)
    }

    addPlayerButtonEventListener();
}

function getGlobalData () {
    // write data to global variables
    globalClickedTimeSlot = this;
    globalSlotData = parseInt(this.parentElement.getAttribute('data-time-slot'));
    globalCourtData = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data-court'));
}

const addPlayerButtonEventListener = () => {
    let addPlayerButtons = document.querySelectorAll('.add-player');

    for (let i = 0; i < addPlayerButtons.length; i++) {
        addPlayerButtons[i].addEventListener('click', getGlobalData);
    }
}

// Handle the Modal input
const confirmPlayerButton = document.querySelector('[data-confirm-player]');
confirmPlayerButton.addEventListener('click', () => {
    addPlayerToSlot(tennisFacility, globalCourtData, globalSlotData, globalClickedTimeSlot)
});

// Make input submit with the enter key
const playerFirstnameInput = document.querySelector('[data-player-firstname]');
const playerLastnameInput = document.querySelector('[data-player-lastname]');
document.body.addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        if (event.target !== playerFirstnameInput && event.target !== playerLastnameInput) {
            return
        }
        if (event.target === playerLastnameInput && playerFirstnameInput.value === '') {
            playerFirstnameInput.focus();
            return
        }
        if (event.target === playerFirstnameInput && playerLastnameInput.value === '') {
            playerLastnameInput.focus();
            return
        }
        addPlayerToSlot(tennisFacility, globalCourtData, globalSlotData, globalClickedTimeSlot);
    }
})

// Save to local Storage
const saveButton = document.querySelector('#saveData');
saveButton.addEventListener('click', () => {
    localStorage.setItem('tennisFacility', JSON.stringify(tennisFacility));
})

// Load data from local Storage
const loadButton = document.querySelector('#loadData');
loadButton.addEventListener('click', () => {
    tennisFacility = localStorage.getItem('tennisFacility');
    console.log(JSON.parse(tennisFacility));
})

init();