"use strict";
export default class Dob extends Date {
    constructor(dobValue) {
        super(dobValue + "T00:00:00");
    }
    isValid() {
        return this.toString() !== "Invalid Date";
    }
    isPastDate() {
        const today = new Date();
        const currentDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        return this < currentDate;
    }
    getFormattedDate() {
        const month = String(this.getMonth() + 1).padStart(2, "0");
        const day = String(this.getDate()).padStart(2, "0");
        const year = this.getFullYear();
        return `${year}-${month}-${day}`;
    }
    getDisplayDate() {
        return this.toDateString();
    }
}