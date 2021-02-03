"use strict";

function buttonHideShow(elem) {
    let x = document.getElementById("hide-show");
    if (x.style.display === "none") {
        x.style.display = "block";
        elem.innerText = "Hide"
    } else {
        x.style.display = "none";
        elem.innerText = "Show"
    }
}