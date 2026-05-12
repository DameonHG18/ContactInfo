"use strict";
import Dob from "./dob.js";
export default class Contact {
    constructor(name, email, phone, zip, dob) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.zip = zip;
        this.dob = new Dob(dob);
    }
    isEmailOrPhoneEntered() {
        return this.email !== "" || this.phone !== "";
    }
    isDobValid() {
        return this.dob.isValid();
    }
    isDobInPast() {
        return this.dob.isPastDate();
    }
    getDobForInput() {
        return this.dob.getFormattedDate();
    }
    getDobForDisplay() {
        return this.dob.getDisplayDate();
    }
    toJSON() {
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,
            zip: this.zip,
            dob: this.dob.getFormattedDate()
        };
    }
    static fromStorage(savedContact) {
        return new Contact(
            savedContact.name,
            savedContact.email,
            savedContact.phone,
            savedContact.zip,
            savedContact.dob
        );
    }
}