import {addPlayerToSlot} from "./player.js";


export const modal = (tennisFacility, globalCourtData, globalSlotData, globalClickedTimeSlot) => {

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
}

const newModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

export const closeModal = () => {
    document.querySelector('[data-player-firstname]').value = '';
    document.querySelector('[data-player-lastname]').value = '';
    newModal.hide();
}

export const modalSetFocusToFirstnameOnOpen = () => {
    // set the focus to the firstname on show.bs.modal event
    const theModal = document.getElementById('staticBackdrop');
    theModal.addEventListener('show.bs.modal', event => {
        const firstnameInput = theModal.querySelector('[data-player-firstname]');
        // timeout is needed to begin after the fade in of the modal
        setTimeout( () => {
            firstnameInput.focus();
        }, 1)
    })
}