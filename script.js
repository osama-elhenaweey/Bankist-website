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
// page navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.classList.contains("nav__link")) {
        let id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

// tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const tabsContainer = document.querySelector(".operations__tab-container");

tabsContainer.addEventListener("click", function (e) {
    // if you clicked in anywhere in the button
    const clicked = e.target.closest(".operations__tab");
    // you clicked outside the button so it will be false and return and break out the scope
    if (!clicked) return;
    // remove all the active class form all button RESET
    tabs.forEach((e) => e.classList.remove("operations__tab--active"));
    // add the active to the button clicked
    clicked.classList.add("operations__tab--active");

    // content

    // remove all the content
    tabsContent.forEach((c) =>
        c.classList.remove("operations__content--active")
    );

    // select the content with the same button data set number and show its content
    const o = clicked.dataset.tab;
    document
        .querySelector(`.operations__content--${o}`)
        .classList.add("operations__content--active");
});

// nav  fading animation

const navfun = function (e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector(".nav__logo");
        siblings.forEach((el) => {
            if (el != link) {
                el.style.opacity = opacity;
            }
        });
        logo.style.opacity = opacity;
    }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
    // if (e.target.classList.contains("nav__link")) {
    //     const link = e.target;
    //     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    //     const logo = link.closest(".nav").querySelector(".nav__logo");
    //     siblings.forEach((el) => {
    //         if (el != link) {
    //             el.style.opacity = "0.5";
    //         }
    //     });
    //     logo.style.opacity = "0.5";
    // }
    navfun(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
    // if (e.target.classList.contains("nav__link")) {
    //     const link = e.target;
    //     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    //     const logo = link.closest(".nav").querySelector(".nav__logo");
    //     siblings.forEach((el) => {
    //         if (el != link) {
    //             el.style.opacity = "1";
    //         }
    //     });
    //     logo.style.opacity = "1";
    // }
    navfun(e, 1);
});

// sticky navbar

// easy way ## my way
// window.addEventListener("scroll", function () {
//     nav.classList.remove("sticky");
//     if (window.scrollY > 410) {
//         nav.classList.add("sticky");
//     }
// });

// hard way

const initialCoords = section1.getBoundingClientRect();

window.addEventListener("scroll", function () {
    nav.classList.remove("sticky");
    if (window.scrollY > initialCoords.top) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});

// use intersection and show the hidden sections
const sections = document.querySelectorAll(".section");

const revealSections = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
    root: null,
    threshold: 0.15,
});
sections.forEach(function (section) {
    sectionObserver.observe(section);
    // section.classList.add("section--hidden");
});

// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    // replace the src with data src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
// slider buttons
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
let maxSlide = slides.length;
slider.addEventListener("click", function (e) {
    const clicks = e.target.classList.contains("slider__btn");

    if (!clicks) return;
    if (clicks) {
    }
});
slides.forEach((el, i) => {
    el.style.transform = `translateX(${100 * i}%)`;
});
const goToSlide = function (slide) {
    slides.forEach((el, i) => {
        el.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
};
goToSlide(0);

const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
};
const prevSlide = function () {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
};
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
    if (e.key == "ArrowLeft") prevSlide();
    if (e.key == "ArrowRight") nextSlide();
});

// slider dots
const dotsContainer = document.querySelector(".dots");

const createDots = function () {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>
        `
        );
    });
};
createDots();
dotsContainer.addEventListener("click", function (e) {
    // console.log(e.target);
    const slide = e.target.dataset.slide;
    if (!e.target.classList.contains("dots__dot")) return;
    if (e.target.classList.contains("dots__dot")) {
        goToSlide(slide);
        activeDot(slide);
    }
});

const activeDot = function (slide) {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((s) => s.classList.remove("dots__dot--active"));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
};

// before close or load the page
window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    // Google Chrome requires returnValue to be set.
    return (e.returnValue = "");
});
