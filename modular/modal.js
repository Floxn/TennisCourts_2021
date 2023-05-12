// TODO rewrite as a class

// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
//const modalOpen = document.getElementById("modal-open");

// Get the <span> element that closes the modal
const modalClose = document.getElementsByClassName("modal-close")[0];

// When the user clicks on the button, open the modal
/*modalOpen.onclick = function () {
    modal.style.display = "block";
}*/

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
