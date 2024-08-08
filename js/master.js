// Start Settings

// Setting Click Function
let settingPanel = document.getElementById("settings");
let settingsIcon = document.getElementById("settings-icon");

settingsIcon.onclick = function () {
  settingPanel.classList.toggle("closed");
};

// Set initial state
if (!settingPanel.classList.contains("closed")) {
  settingPanel.classList.add("closed");
}

// The Colors Option :
let storedColor = localStorage.getItem("chosenColor");
const colors = document.querySelectorAll(".colors-menu li");

colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    const newColor = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", newColor);
    localStorage.setItem("chosenColor", newColor);
    document.querySelector(".colors-menu .active").classList.remove("active");
    e.target.classList.add("active");
  });
});

if (storedColor !== null) {
  console.log("Stored color found:", storedColor);
  document.documentElement.style.setProperty("--main-color", storedColor);
  colors.forEach((e) => {
    if (storedColor === e.dataset.color) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }
  });
}
// The Automated Background
let intervalId;
let backgroundBool = true;
let optionSelected = localStorage.getItem("backgroundOption");
const options = document.querySelectorAll(
  "#settings .backgrounds .auto-change div span"
);

options.forEach((span) => {
  span.addEventListener("click", (e) => {
    const option = e.target.dataset.background;
    document
      .querySelector("#settings .backgrounds .auto-change div .active")
      .classList.remove("active");
    e.target.classList.add("active");
    if (option === "enabled") {
      backgroundBool = true;
      autoBack();
      localStorage.setItem("backgroundOption", "true");
    } else {
      backgroundBool = false;
      clearInterval(intervalId);
      localStorage.setItem("backgroundOption", "false");
    }
  });
});

if (optionSelected !== null) {
  if (optionSelected === "true") {
    backgroundBool = true;
  } else {
    backgroundBool = false;
  }
  options.forEach((e) => e.classList.remove("active"));

  if (backgroundBool) {
    document
      .querySelector(
        "#settings .backgrounds .auto-change div [data-background='enabled']"
      )
      .classList.add("active");
    autoBack(); // Call autoBack if backgroundBool is true
  } else {
    document
      .querySelector(
        "#settings .backgrounds .auto-change div [data-background='disabled']"
      )
      .classList.add("active");
  }
}
// Navigation Bullets Option :
let bulletSpans = document.querySelectorAll(
  "#settings .bullets-option div span"
);
let navBullets = document.querySelector(".nav-bullets");

// Function to set the active class based on local storage value
function setActiveBulletOption() {
  let savedState = localStorage.getItem("navBulletsState");
  if (savedState === "disabled") {
    bulletSpans.forEach((el) => el.classList.remove("active"));
    document.querySelector("[data-navbul='disabled']").classList.add("active");
    navBullets.style.display = "none";
  } else {
    bulletSpans.forEach((el) => el.classList.remove("active"));
    document.querySelector("[data-navbul='enabled']").classList.add("active");
    navBullets.style.display = "block";
  }
}

// Set the initial state based on local storage
setActiveBulletOption();

// Add event listeners to spans
bulletSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    bulletSpans.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");

    // Save the state to local storage
    let navBulletsState = e.target.dataset.navbul;
    localStorage.setItem("navBulletsState", navBulletsState);

    // Update the display of the navigation bullets
    if (navBulletsState === "disabled") {
      navBullets.style.display = "none";
    } else {
      navBullets.style.display = "block";
    }
  });
});
// reset Option 
let resetButton = document.querySelector("#settings .reset-option span");
resetButton.addEventListener("click", e => {
  localStorage.clear();
  window.location.reload();
})
/////
// add backgrounds selector
// add the full view of the picture option;
// rigli settings raja3ha chaba;
// End Settings
// Select The Landing Page
let landing = document.querySelector(".landing-page");

let images = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg"];
let i = 0;

function autoBack() {
  if (backgroundBool === true) {
    clearInterval(intervalId); // Clear any existing intervals before setting a new one
    intervalId = setInterval(() => {
      landing.style.backgroundImage = `url("images/${images[i]}")`;
      i++;
      if (i > images.length - 1) {
        i = 0;
      }
    }, 7000);
  }
}

// Skills Animation
let skills = document.querySelector(".skills");
window.addEventListener("scroll", function () {
  let skillsOffsetTop = skills.offsetTop;
  let skillsOffsetHeight = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let windowScrollTop = window.scrollY;
  if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    let allSkills = this.document.querySelectorAll(
      ".skills .container .skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// Gallery Pop Up

let galleryImgs = document.querySelectorAll(".gallery .images img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let popupHeading = document.createElement("h3");
      popupHeading.innerHTML = img.alt;
      popupBox.appendChild(popupHeading);
    }
    document.body.appendChild(popupBox);
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    popupOverlay.addEventListener("click", (e) => {
      popupBox.style.display = "none";
      popupOverlay.style.display = "none";
    });
  });
});

// Navigation Bullets

let bullets = document.querySelectorAll(".nav-bullets .bullet");
bullets.forEach((bullet) => {
  bullet.addEventListener("click", function (e) {
    document.querySelector(bullet.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
let navs = document.querySelectorAll(".heading a");
navs.forEach((nav) => {
  nav.addEventListener("click", function (e) {
    document.querySelector(nav.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
