"use strict";

///////////////////////////////////////
const header = document.querySelector(".header");
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

// cookie message
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
    "We use cookie for improved functionality and analytics <button class='btn btn--close-cookie'>Got it !</button>";
header.after(message);

// remove the cookie message while clicking the button
document
    .querySelector(".btn--close-cookie")
    .addEventListener("click", function () {
        // remove the element
        message.remove();
    });

// scroll to section

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
btnScrollTo.addEventListener("click", () =>
    section1.scrollIntoView({ behavior: "smooth" })
);
