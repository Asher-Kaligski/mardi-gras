const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const messageBox = document.getElementById('message');



const userParamArr = [firstName, lastName, email, password];

for (let i = 0; i < userParamArr.length; i++) {

    let label = userParamArr[i].labels[0];

    if (label.offsetParent === null) {
        userParamArr[i].placeholder = label.innerHTML;
    }
}

function validateMessage() {

    if (checkIfEmpty(messageBox) && validateLength(messageBox, 2, 6000)) {
        messageBox.nextElementSibling.innerHTML = "";
        return true;
    } else {
        return false;
    }
}

function validateFirstName() {

    if (checkIfEmpty(firstName) && validateLength(firstName, 2, 30)) {
        firstName.nextElementSibling.innerHTML = "";
        return true;
    } else {
        return false;
    }
}

function validateLastName() {

    if (checkIfEmpty(lastName) && validateLength(lastName, 2, 30)) {
        lastName.nextElementSibling.innerHTML = "";
        return true;
    } else {
        return false;
    }
}

function validateEmail() {

    if (checkIfEmpty(email) && isEmailValid(email) && validateLength(email, 5, 40)) {
        email.nextElementSibling.innerHTML = "";
        return true;
    } else {
        return false;
    }
}

function validatePassword() {

    if (checkIfEmpty(password) && validateLength(password, 6, 13)) {
        password.nextElementSibling.innerHTML = "";
        return true;
    } else {
        return false;
    }
}

function isEmailValid(element) {
    if (element.value.indexOf("@") == -1 || element.value.indexOf(".") == -1) {
        element.nextElementSibling.innerHTML = " " + element.labels[0].innerHTML + " is not valid.";
        return false;
    } else {
        return true;
    }

}

function validateLength(element, minLenght, maxLenght) {

    if (element.value.length >= minLenght && element.value.length <= maxLenght) {
        return true;
    } else {
        element.nextElementSibling.innerHTML = ` ${element.labels[0].innerHTML} doesn't meet length.</br> ${element.labels[0].innerHTML} must be from ${minLenght} to ${maxLenght} characters.`;
        return false;
    }
}

function checkIfEmpty(element) {

    if (element.value == "") {

        element.nextElementSibling.innerHTML = element.labels[0].innerHTML + " must not be empty";

        return false;
    } else {
        return true;
    }

}

document.getElementById("send-form").addEventListener('click', function (e) {

    e.preventDefault();

    if (validateMessage() && validateFirstName() && validateLastName() && validateEmail() && validatePassword()) {
        document.getElementById("message-text").innerText = "Posted your message successfully!";
    } else {
        document.getElementById("message-text").innerText = "Sorry there was an error sending your form.";
    }

    document.getElementById("message-box").style.display = "block";

});