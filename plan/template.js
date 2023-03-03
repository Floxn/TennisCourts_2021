// iife
/*
(function ($) {
    const setAttributes = (element, attributes) => {}
    const buildCourtHTML = (courtNumber, facility) => { setAttributes() }

    return {
        buildCourtHTML
    }
})(jQuery)*/




// Helper functions
const setAttributes = (element, attributes) => {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

export const buildCourtHTML = (courtNumber, facility) => {
    const courtNumberClass = `court-${courtNumber}`;

    // Build Court Wrapper
    const newCourt = document.createElement('div');
    newCourt.classList.add('court', courtNumberClass);
    newCourt.setAttribute('data-court', courtNumber);
    newCourt.id = courtNumberClass;

    // Build Court Headline
    const courtHeadline = document.createElement('h2');
    courtHeadline.textContent = `Court-No: ${courtNumber}`;

    // Build Timeslots Wrapper
    const courtTimeSlots = document.createElement('div');
    courtTimeSlots.classList.add('court-slots');

    facility.appendChild(newCourt);
    newCourt.appendChild(courtHeadline);
    newCourt.appendChild(courtTimeSlots);
}

const buildSlotHTML = (courtNumber, slotNumber, beginTime, endTime) => {
    const container = document.querySelector(`[data-court="${courtNumber}"]`)
    const theSlot = container.querySelector('.court-slots');

    const slotNumberClass = `time-slot-${slotNumber}`;

    const newSlot = document.createElement('div');
    newSlot.classList.add('time-slot', slotNumberClass);
    newSlot.setAttribute('data-time-slot', slotNumber);

    // Build Slot Time
    const slotTime = document.createElement('div');
    slotTime.classList.add('time-slot-time');

    const slotTimeBegin = document.createElement('span');
    slotTimeBegin.classList.add('time-slot-time-begin');
    slotTimeBegin.textContent = beginTime;
    slotTime.appendChild(slotTimeBegin);

    const slotTimeEnd = document.createElement('span');
    slotTimeEnd.classList.add('time-slot-time-end');
    slotTimeEnd.textContent = endTime;
    slotTime.appendChild(slotTimeEnd);

    // Build Player Wrapper
    const slotPlayer = document.createElement('div');
    slotPlayer.classList.add('time-slot-players');

    // Build add Player Button
    const addPlayerButton = document.createElement('button');
    addPlayerButton.classList.add('add-player', 'btn', 'btn-sm', 'btn-outline-success', `add-player-${slotNumberClass}`);
    setAttributes(addPlayerButton, {'data-bs-toggle': 'modal', 'data-bs-target': '#staticBackdrop'});
    addPlayerButton.textContent = 'add new Player';

    theSlot.appendChild(newSlot);
    newSlot.appendChild(slotTime);
    newSlot.appendChild(slotPlayer);
    newSlot.appendChild(addPlayerButton);
}

export const addSlotsToCourt = (tennisFacility, courtNumber) => {
    // Court()
    // Function declaration
    function Court(courtNumber) {
        this.courtNumber = courtNumber;
        this.timeSlots = {};
    }

    let currentCourt = Object.keys(tennisFacility).length + 1;
    let newCourt = new Court(currentCourt);

    // add the timeslots to the court
    let firstTimeOfTimeslot = 7;
    for (let timeSlots = 1; timeSlots <= 14; timeSlots++) {
        let slot = `timeSlot-${timeSlots}`;
        let beginTime = `${firstTimeOfTimeslot}:00 Uhr`;
        let endTime = `${firstTimeOfTimeslot + 1}:00 Uhr`;
        newCourt.timeSlots[slot] = {
            'time': `${beginTime} - ${endTime}`,
            'players': {}
        };
        firstTimeOfTimeslot += 1;
        buildSlotHTML(courtNumber, timeSlots, beginTime, endTime);
    }
    tennisFacility[`court-${currentCourt}`] = newCourt;
    //tennisFacility.push(newCourt);
}

export const buildPlayerHTML = (playerFirstname, playerLastname, playerNumber, globalClickedTimeSlot) => {
    // build new players element and append it
    const newPlayerElement = document.createElement('div');
    newPlayerElement.classList.add('player', 'bg-success', 'bg-opacity-50');
    newPlayerElement.setAttribute('data-player', playerNumber);
    newPlayerElement.textContent = `${playerFirstname} ${playerLastname}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-player', 'btn', 'btn-danger');
    removeButton.textContent = 'x';
    newPlayerElement.appendChild(removeButton);

    globalClickedTimeSlot.previousElementSibling.appendChild(newPlayerElement);

}

/*

function f(tag, options = {}) {
    const newEl = document.createElement(tag);

    return newEl;
}*/
