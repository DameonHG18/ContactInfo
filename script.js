"use strict";

const $ = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

    const form = $("#contact_form");
    const clearErrors = () => {
        document.querySelectorAll("span").forEach(span => span.textContent = "");
    };

    form.addEventListener("submit", e => {
        clearErrors();

        let isValid = true;
        const name = $("#name").value.trim();
        const email = $("#email").value.trim();
        const phone = $("#phone").value.trim();
        const zip = $("#zip").value.trim();
        const dob = $("#dob").value;

        //Name
        if (name === "") {
            $("#name_error").textContent = "Name is required";
            isValid = false;
        }

        //Email or phone number(at least one required)
        if (email === "" && phone === "") {
            $("#email_error").textContent = "Enter email or phone";
            $("#phone_error").textContent = "Enter phone or email";
            isValid = false;
        }

        //Email formatting
        if (email !== "" && !/^\S+@\S+\.\S+$/.test(email)) {
            $("#email_error").textContent = "Invalid email format";
            isValid = false;
        }

        //Phone formatting
        if (phone !== "" && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            $("#phone_error").textContent = "Format: 123-456-7890";
            isValid = false;
        }

        //ZIP code
        if (!/^\d{5}$/.test(zip)) {
            $("#zip_error").textContent = "ZIP must be 5 digits";
            isValid = false;
        }

        //DOB (must be in the past)
        if (dob === "") {
            $("#dob_error").textContent = "Date of birth required";
            isValid = false;
        } else {
            const dobDate = new Date(dob + "T00:00:00");
            const today = new Date();

            //Normalize times
            dobDate.setHours(0,0,0,0);
            today.setHours(0,0,0,0);

            if (dobDate >= today) {
                $("#dob_error").textContent = "Must be a past date";
                isValid = false;
            }
        }

        //Final checks
        if (!isValid) {
            e.preventDefault(); //stop navigation
        }
    });

    //Reset button clears errors
    $("#reset").addEventListener("click", () => {
        clearErrors();
    });

    //autofocus
    $("#name").focus();
});