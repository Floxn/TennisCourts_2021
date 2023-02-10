const courtNumberInput = document.querySelector('#howManyCourts');

function startPlaning() {
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