"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Sirad Ahmed
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];
// Historiken kommer att sparas i localStorage under nyckeln "studentcardHistory".
const localStorageKey = "studentcardHistory";
/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Kontrollera formulärets obligatoriska fält
    errors = [];
    if (!fullnameInput.value.trim()) {
        errors.push("Fullständigt namn är obligatoriskt.");
    }
    if (!emailInput.value.trim()) {
        errors.push("E-postadress är obligatoriskt.");
    }
    if (!phoneInput.value.trim()) {
        errors.push("Telefonnummer är obligatoriskt.");
    }
    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.textContent = "";
    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        const item = document.createElement("li");
        item.textContent = error;
        errorList.appendChild(item);
    });
}



/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const cardData = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };

    // Uppdatera studentkortet
    previewFullname.textContent = cardData.fullname;
    previewEmail.textContent = cardData.email;
    previewPhone.textContent = cardData.phone;
    previewFullname.style.fontFamily = cardData.font;
    previewEmail.style.fontFamily = cardData.font;
    previewPhone.style.fontFamily = cardData.font;


    // Lägg till studentkortet i historiken
    history.unshift(cardData);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem(localStorageKey);
    // Uppdatera history
    if (savedHistory === null) {
        history = [];
        return;
    }
    try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
            history = parsed;
        } else {
            history = [];
        }
    } catch (error) {
        console.error("Error parsing saved history:", error);
        history = [];
    }
}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
historySection.textContent = "";
    // Skriv ut innehållet i history till DOM
    history.forEach((card, index) => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("history-card");
        cardDiv.style.fontFamily = card.font;
        
        const nameElement = document.createElement("p");
        nameElement.textContent = card.fullname;
        const emailElement = document.createElement("p");
        emailElement.textContent = card.email;
        const phoneElement = document.createElement("p");
        phoneElement.textContent = card.phone;
        cardDiv.appendChild(nameElement);
        cardDiv.appendChild(emailElement);
        cardDiv.appendChild(phoneElement);
        historySection.appendChild(cardDiv);
    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik