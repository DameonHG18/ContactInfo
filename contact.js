"use strict";
import Contact from "./contactClass.js";
const getElement = selector => document.querySelector(selector);
const clearContact = () => {
    sessionStorage.removeItem("contact");
};
const saveContact = contact => {
    sessionStorage.setItem("contact", JSON.stringify(contact));
};
const getSavedContact = () => {
    const savedContact = sessionStorage.getItem("contact");
    if (savedContact) {
        return Contact.fromStorage(JSON.parse(savedContact));
    }
    return null;
};
const getContactFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const email = params.get("email");
    const phone = params.get("phone");
    const zip = params.get("zip");
    const dob = params.get("dob");
    if (name && zip && dob) {
        const contact = new Contact(name, email, phone, zip, dob);
        saveContact(contact);
        return contact;
    }
    return null;
};
const displayContact = () => {
    const contact = getSavedContact();
    if (contact) {
        getElement("#name").value = contact.name;
        getElement("#email").value = contact.email;
        getElement("#phone").value = contact.phone;
        getElement("#zip").value = contact.zip;
        getElement("#dob").value = contact.getDobForInput();
    }
};
const displayConfirmPage = () => {
    let contact = getSavedContact();
    if (!contact) {
        contact = getContactFromUrl();
    }
    if (contact) {
        getElement("#lbl_name").textContent = contact.name;
        getElement("#lbl_email").textContent = contact.email;
        getElement("#lbl_phone").textContent = contact.phone;
        getElement("#lbl_zip").textContent = contact.zip;
        getElement("#lbl_dob").textContent = contact.getDobForDisplay();
    }
};
const clearMessages = () => {
    const inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        const span = input.nextElementSibling;
        if (span) {
            span.textContent = "";
        }
        input.setCustomValidity("");
    }
    if (inputs.length > 0) {
        inputs[0].focus();
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const form = getElement("form");
    if (form) {
        form.noValidate = true;
        for (let element of form.elements) {
            element.addEventListener("invalid", evt => {
                const elem = evt.currentTarget;
                const msg = elem.title ? elem.title : elem.validationMessage;
                const span = elem.nextElementSibling;
                if (span) {
                    span.textContent = msg;
                }
            });
        }
        displayContact();
        form.addEventListener("submit", evt => {
            clearMessages();
            const name = getElement("#name");
            const email = getElement("#email");
            const phone = getElement("#phone");
            const zip = getElement("#zip");
            const dob = getElement("#dob");
            const contact = new Contact(
                name.value,
                email.value,
                phone.value,
                zip.value,
                dob.value
            );
            let msg = contact.isEmailOrPhoneEntered() ? "" : "Please enter an email or phone.";
            email.setCustomValidity(msg);
            if (!contact.isDobValid()) {
                msg = "Please enter a valid DOB.";
            } else if (!contact.isDobInPast()) {
                msg = "DOB must be in the past.";
            } else {
                msg = "";
            }
            dob.setCustomValidity(msg);
            if (!form.checkValidity()) {
                evt.preventDefault();
                return;
            }
            saveContact(contact);
        });
        form.addEventListener("reset", () => {
            clearMessages();
            clearContact();
        });
    } else {
        displayConfirmPage();
    }
});