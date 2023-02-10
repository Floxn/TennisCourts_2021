// TODO next: Check if player id is already exists in court and time slot
// TODO next: rewrite to add new player int players
// TODO next: Weekly View
// TODO next: Move every Day of the Week in one Tab
// TODO next: change eventhandler from click or touch to pointerEvents
// TODO next next :) : Include Database

const courtNumberInput = document.querySelector('#howManyCourts');

function startPlaning () {
    // location.href= location.href + "?courts=" + courtCount
    location.href = `/TennisCourts_2021/plan/index.html?courts=${courtNumberInput.value}`;
}

// Handle initial Court setup
document.querySelector('#initialCourtSetup .btn').addEventListener('click', startPlaning);


document.body.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        if (event.target !== courtNumberInput) {
            return
        }
        startPlaning();
    }
});

